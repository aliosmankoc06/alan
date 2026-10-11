const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const ExcelJS = require("exceljs");
const { parsePlanWorkbook } = require("./xlsx-plan-parser");
const { parseEnvanterWorkbook } = require("./xlsx-envanter-parser");
const { parsePerformansWorkbook } = require("./xlsx-performans-parser");
const pdfParse = require("pdf-parse");
const { parseOgrenciPdf } = require("./pdf-ogrenci-parser");
const mammoth = require("mammoth");
const WordExtractor = require("word-extractor");

let mainWindow;

/* Portable .exe'nin aynı anda iki kez açılmasını engelliyoruz — iki
   pencere aynı localStorage'a bağımsız yazarsa, biri diğerinin daha
   yeni kaydettiği değişiklikleri (ör. bir sınıfın silinmesi) fark
   etmeden üzerine yazıp "geri getirebilir". İkinci açılışta yeni
   pencere oluşturmak yerine var olan pencereyi öne getiriyoruz. */
const tekAcilisKilitAlindi = app.requestSingleInstanceLock();
if (!tekAcilisKilitAlindi) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function backupFileFilters() {
  return [{ name: "Yedek Dosyası (JSON)", extensions: ["json"] }];
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: "#EDEBE2",
    icon: path.join(__dirname, "..", "build", "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenu(buildMenu());
  mainWindow.loadFile(path.join(__dirname, "..", "src", "index.html"));
}

function buildMenu() {
  const template = [
    {
      label: "Dosya",
      submenu: [
        { label: "Verilerimi Dışa Aktar (Yedek Al)", click: () => mainWindow.webContents.send("menu:export-backup") },
        { label: "Yedek Dosyasından Yükle", click: () => mainWindow.webContents.send("menu:import-backup") },
        { label: "Kayıtlı Programlarım", click: () => mainWindow.webContents.send("menu:saved-programs") },
        { type: "separator" },
        { label: "Okulun Ders Havuzu/Öğretmen Listesiyle Başla (Sıfırla)", click: () => mainWindow.webContents.send("menu:restore-defaults") },
        { type: "separator" },
        { label: "Yazdır", click: () => mainWindow.webContents.print() },
        { type: "separator" },
        { role: "quit", label: "Çıkış" }
      ]
    },
    {
      label: "Görünüm",
      submenu: [
        { role: "reload", label: "Yenile" },
        { role: "toggleDevTools", label: "Geliştirici Araçları" },
        { type: "separator" },
        { role: "resetZoom", label: "Yakınlaştırmayı Sıfırla" },
        { role: "zoomIn", label: "Yakınlaştır" },
        { role: "zoomOut", label: "Uzaklaştır" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Tam Ekran" }
      ]
    }
  ];
  return Menu.buildFromTemplate(template);
}

ipcMain.handle("dialog:save-backup", async (evt, defaultName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Yedeği Kaydet",
    defaultPath: defaultName,
    filters: backupFileFilters()
  });
  return result.canceled ? null : result.filePath;
});

ipcMain.handle("dialog:open-backup", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Yedek Dosyasını Seç",
    properties: ["openFile"],
    filters: backupFileFilters()
  });
  return result.canceled || result.filePaths.length === 0 ? null : result.filePaths[0];
});

ipcMain.handle("fs:write-file", async (evt, filePath, content) => {
  fs.writeFileSync(filePath, content, "utf-8");
  return true;
});

ipcMain.handle("fs:read-file", async (evt, filePath) => {
  return fs.readFileSync(filePath, "utf-8");
});

/* ============ Bilgisayarlar Arası Otomatik Senkronizasyon ============
   Veriler normalde sadece bu bilgisayara özel (localStorage) saklanır.
   Kullanıcı OneDrive kullanıyorsa (Windows'ta kurulu/giriş yapılmışsa
   OneDrive/OneDriveConsumer/OneDriveCommercial ortam değişkenlerinden
   biri hep ayarlı olur), aynı veriyi ek olarak OneDrive'daki senkronize
   bir klasöre de yazıyoruz. Böylece başka bir bilgisayarda program
   açıldığında (OneDrive o dosyayı indirmiş olacağından) en güncel veri
   otomatik olarak bulunup yükleniyor — elle yedek alıp yüklemeye gerek
   kalmıyor. OneDrive yoksa bu özellik sessizce devre dışı kalır, uygulama
   eskisi gibi sadece yerel olarak çalışmaya devam eder. */
function oneDriveSenkronDosyasi() {
  const kok = process.env.OneDrive || process.env.OneDriveConsumer || process.env.OneDriveCommercial;
  if (!kok) return null;
  return path.join(kok, "Alan Yönetim Sistemi", "veri-senkron.json");
}

ipcMain.handle("sync:read", async () => {
  const dosya = oneDriveSenkronDosyasi();
  if (!dosya || !fs.existsSync(dosya)) return null;
  try { return fs.readFileSync(dosya, "utf-8"); } catch (e) { return null; }
});

ipcMain.handle("sync:write", async (evt, content) => {
  const dosya = oneDriveSenkronDosyasi();
  if (!dosya) return false;
  try {
    fs.mkdirSync(path.dirname(dosya), { recursive: true });
    fs.writeFileSync(dosya, content, "utf-8");
    return true;
  } catch (e) { return false; }
});

ipcMain.handle("sync:available", async () => !!oneDriveSenkronDosyasi());

ipcMain.handle("dialog:open-xlsx", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Excel Dosyası Seç",
    properties: ["openFile"],
    filters: [{ name: "Excel Dosyası", extensions: ["xlsx", "xls"] }]
  });
  return result.canceled || result.filePaths.length === 0 ? null : result.filePaths[0];
});

ipcMain.handle("import:plan-xlsx", async (evt, filePath) => {
  return parsePlanWorkbook(filePath, XLSX);
});

ipcMain.handle("import:envanter-xlsx", async (evt, filePath) => {
  return parseEnvanterWorkbook(filePath, XLSX);
});

ipcMain.handle("import:performans-xlsx", async (evt, filePath) => {
  return parsePerformansWorkbook(filePath, XLSX);
});

ipcMain.handle("import:not-ortalama-xlsx", async (evt, filePath) => {
  const wb = XLSX.readFile(filePath);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
  let okulNoCol = 0, notCol = 1, basladi = 0;
  for (let r = 0; r < Math.min(rows.length, 5); r++) {
    const row = rows[r].map(c => String(c).trim().toLocaleLowerCase("tr-TR"));
    const oIdx = row.findIndex(c => c.includes("okul") && c.includes("no"));
    const nIdx = row.findIndex(c => c.includes("not") || c.includes("ortalama") || c.includes("puan"));
    if (oIdx >= 0 && nIdx >= 0) { okulNoCol = oIdx; notCol = nIdx; basladi = r + 1; break; }
  }
  const kayitlar = [];
  for (let r = basladi; r < rows.length; r++) {
    const okulNo = String(rows[r][okulNoCol] !== undefined ? rows[r][okulNoCol] : "").trim();
    const not_ = String(rows[r][notCol] !== undefined ? rows[r][notCol] : "").trim();
    if (!okulNo) continue;
    kayitlar.push({ okulNo, not: not_ });
  }
  return { kayitlar };
});

ipcMain.handle("dialog:open-pdf", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Sınıf Listesi PDF Seç",
    properties: ["openFile"],
    filters: [{ name: "PDF Dosyası", extensions: ["pdf"] }]
  });
  return result.canceled || result.filePaths.length === 0 ? null : result.filePaths[0];
});

ipcMain.handle("import:ogrenci-pdf", async (evt, filePath) => {
  return parseOgrenciPdf(filePath, pdfParse);
});

ipcMain.handle("dialog:open-word", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Word Dosyası Seç",
    properties: ["openFile"],
    filters: [{ name: "Word Belgesi", extensions: ["doc", "docx"] }]
  });
  return result.canceled || result.filePaths.length === 0 ? null : result.filePaths[0];
});

function cleanCellText(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

function htmlTableRows(html) {
  const rows = [];
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trM;
  while ((trM = trRe.exec(html))) {
    const cellRe = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    const cells = [];
    let cM;
    while ((cM = cellRe.exec(trM[1]))) {
      cells.push(cleanCellText(cM[1]));
    }
    if (cells.length) rows.push(cells);
  }
  return rows;
}

/* Belgeyi baştan sona tarar; tablo satırlarını hücrelere, tablo dışındaki
   paragrafları tek hücreli satırlara çevirir — böylece tablonun üstündeki
   başlık paragrafı (örn. e-Okul Sınıf Listesi'nin "AMP - 10. Sınıf / A
   Şubesi (...)" satırı) da tablo satırlarıyla aynı sırada yakalanır. */
function htmlToRows(html) {
  const rows = [];
  const blockRe = /<table[^>]*>[\s\S]*?<\/table>|<p[^>]*>[\s\S]*?<\/p>/gi;
  let m;
  while ((m = blockRe.exec(html))) {
    const block = m[0];
    if (/^<table/i.test(block)) {
      htmlTableRows(block).forEach(r => rows.push(r));
    } else {
      const text = cleanCellText(block);
      if (text) rows.push([text]);
    }
  }
  return rows;
}

async function extractWordRows(filePath) {
  if (/\.docx$/i.test(filePath)) {
    const { value: html } = await mammoth.convertToHtml({ path: filePath });
    const rows = htmlToRows(html);
    if (rows.length) return rows;
    const { value: text } = await mammoth.extractRawText({ path: filePath });
    return text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => l.split(/\t+/));
  }
  const doc = await new WordExtractor().extract(filePath);
  const body = doc.getBody() || "";
  return body.split(/\r?\n/).map(l => l.replace(/\t+$/, "")).filter(l => l.trim()).map(l => l.split("\t"));
}

function rowsToTabText(rows) {
  return rows.map(r => r.join("\t")).join("\n");
}

ipcMain.handle("import:word-table", async (evt, filePath) => {
  const rows = await extractWordRows(filePath);
  return { text: rowsToTabText(rows) };
});

const BASLIK_REGEX_WORD = /(AMP|MESEM)\s*-\s*(\d{1,2})\.\s*Sınıf\s*\/\s*([A-ZÇĞİÖŞÜ])\s*Şubesi\s*\(([^)]*)\)/i;

/* Word'de gerçek hücre sınırları bilindiği için (PDF'teki gibi x/y konumu
   tahmin etmeye gerek yok) sütunları başlık satırındaki metinlerden
   (Öğrenci No / Adı / Soyadı / Cinsiyeti / Pansiyon Durum) eşleştiriyoruz. */
function parseOgrenciWordRows(rows) {
  const sonuclar = [];
  let mevcut = null;
  let colIdx = null;
  rows.forEach(cells => {
    const joined = cells.join(" ");
    const baslikM = BASLIK_REGEX_WORD.exec(joined);
    if (baslikM) {
      if (mevcut && mevcut.ogrenciler.length) sonuclar.push(mevcut);
      const program = baslikM[1].toUpperCase();
      const grade = Number(baslikM[2]);
      const sube = baslikM[3].toUpperCase();
      const alanAdi = baslikM[4].trim();
      mevcut = { program, sinif: grade + "-" + sube, grade, sube, alanAdi, ogrenciler: [] };
      colIdx = null;
      return;
    }
    if (!mevcut) return;
    const norm = cells.map(c => c.toLocaleLowerCase("tr-TR").replace(/[.\s]+/g, ""));
    const oIdx = norm.findIndex(c => c.includes("öğrenci") && c.includes("no"));
    const adIdx = norm.findIndex(c => c === "adı" || c === "adi" || c === "ad");
    if (oIdx >= 0 && adIdx >= 0) {
      colIdx = {
        okulNo: oIdx,
        ad: adIdx,
        soyad: norm.findIndex(c => c.includes("soyad")),
        cinsiyet: norm.findIndex(c => c.includes("cinsiyet")),
        pansiyon: norm.findIndex(c => c.includes("pansiyon"))
      };
      return;
    }
    if (!colIdx) return;
    const okulNo = (cells[colIdx.okulNo] || "").trim();
    if (!/^\d+$/.test(okulNo)) return;
    const ad = (cells[colIdx.ad] || "").trim();
    const soyad = colIdx.soyad >= 0 ? (cells[colIdx.soyad] || "").trim() : "";
    if (!ad && !soyad) return;
    let cinsiyet = colIdx.cinsiyet >= 0 ? (cells[colIdx.cinsiyet] || "").trim() : "";
    cinsiyet = /^(Erkek|Kız)$/i.test(cinsiyet) ? cinsiyet[0].toUpperCase() + cinsiyet.slice(1).toLowerCase() : "";
    const pansiyon = colIdx.pansiyon >= 0 ? (cells[colIdx.pansiyon] || "").trim() : "";
    mevcut.ogrenciler.push({ okulNo, ad, soyad, cinsiyet, pansiyon });
  });
  if (mevcut && mevcut.ogrenciler.length) sonuclar.push(mevcut);
  return { siniflar: sonuclar };
}

ipcMain.handle("import:ogrenci-word", async (evt, filePath) => {
  const rows = await extractWordRows(filePath);
  return parseOgrenciWordRows(rows);
});

ipcMain.handle("export:excel", async (evt, defaultName, sheets) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Excel Olarak Kaydet",
    defaultPath: defaultName,
    filters: [{ name: "Excel Dosyası", extensions: ["xlsx"] }]
  });
  if (result.canceled || !result.filePath) return null;
  const wb = XLSX.utils.book_new();
  sheets.forEach((sheet, i) => {
    const ws = XLSX.utils.aoa_to_sheet(sheet.rows);
    if (sheet.colWidths) ws["!cols"] = sheet.colWidths.map(wch => ({ wch }));
    const name = (sheet.name || ("Sayfa" + (i + 1))).slice(0, 31).replace(/[\\/*?:[\]]/g, " ");
    XLSX.utils.book_append_sheet(wb, ws, name || ("Sayfa" + (i + 1)));
  });
  XLSX.writeFile(wb, result.filePath);
  return result.filePath;
});

// Programlar (öğretmen ders programı) Excel'i — sınıf/ders renklerini ve
// hücre çerçevelerini gerçekten taşıyabilmek için "xlsx" kütüphanesinin
// ücretsiz sürümü stil yazamıyor, bu yüzden burada exceljs kullanılıyor.
ipcMain.handle("export:schedule-excel", async (evt, defaultName, teacherBlocks) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Excel Olarak Kaydet",
    defaultPath: defaultName,
    filters: [{ name: "Excel Dosyası", extensions: ["xlsx"] }]
  });
  if (result.canceled || !result.filePath) return null;

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Programlar");
  const dayHeaders = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
  const thin = { style: "thin", color: { argb: "FF999999" } };
  const borderAll = { top: thin, bottom: thin, left: thin, right: thin };

  // Not: exceljs bu sürümde 3+ farklı sütun genişliği grubu verildiğinde
  // ortadaki grubu sessizce siliyor (kütüphanenin kendi hatası, doğrulandı).
  // Bu yüzden tek bir açık genişlik (kenar boşluğu sütunu) + sayfa geneli
  // varsayılan genişlik (Saat + gün sütunları, hepsi eşit) kullanıyoruz.
  ws.properties.defaultColWidth = 16;
  ws.getColumn(1).width = 3;
  const baseFontSize = 9;

  let r = 1;
  (teacherBlocks || []).forEach((block, bi) => {
    if (bi > 0) r += 2;
    r += 1;
    const titleCell = ws.getRow(r).getCell(2);
    titleCell.value = block.name;
    titleCell.font = { bold: true, size: 12 };
    r += 1;

    const headerRow = ws.getRow(r);
    headerRow.getCell(2).value = "Saat";
    dayHeaders.forEach((d, i) => { headerRow.getCell(3 + i).value = d; });
    for (let c = 2; c <= 7; c++) {
      const cell = headerRow.getCell(c);
      cell.font = { bold: true, size: baseFontSize };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF4F6FA" } };
      cell.border = borderAll;
      cell.alignment = { vertical: "middle", horizontal: "left" };
    }
    headerRow.height = 16;
    r += 1;

    (block.rows || []).forEach(rowData => {
      const excelRow = ws.getRow(r);
      const hourCell = excelRow.getCell(2);
      hourCell.value = rowData.hour;
      hourCell.font = { size: baseFontSize };
      hourCell.alignment = { vertical: "middle", horizontal: "center" };
      hourCell.border = borderAll;
      (rowData.cells || []).forEach((cellData, i) => {
        const cell = excelRow.getCell(3 + i);
        cell.value = cellData.text || "";
        cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
        cell.border = borderAll;
        cell.font = { size: baseFontSize, color: cellData.ink ? { argb: "FF" + cellData.ink } : undefined };
        if (cellData.bg) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + cellData.bg } };
      });
      excelRow.height = 24;
      r += 1;
    });
  });

  await wb.xlsx.writeFile(result.filePath);
  return result.filePath;
});

/* Yıllık Plan'ın Excel çıktısı — kullanıcının kendi YILLIK_PLANLAR.xlsx
   dosyasındaki görünüme (iki logo, başlık, bilgi tablosu, sınav tarihleri,
   önemli gün ve haftalar, işgünü takvimi, hafta hafta kazanım/konu/yöntem/
   araç/değerlendirme, imza bloğu) yakın, gerçek biçimlendirmeli tek sayfa
   üretir. Veri (payload) tarayıcı tarafında S üzerinden derlenip buraya
   gönderiliyor (bkz. views.js extractYillikPlanForExcel). */
ipcMain.handle("export:yillik-plan-excel", async (evt, defaultName, payload) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Excel Olarak Kaydet",
    defaultPath: defaultName,
    filters: [{ name: "Excel Dosyası", extensions: ["xlsx"] }]
  });
  if (result.canceled || !result.filePath) return null;

  // Öncelik: kullanıcının kendi orijinal YILLIK_PLANLAR.xlsx dosyasını
  // şablon olarak kullan — biçimlendirmeye hiç dokunmadan sadece değişen
  // hücreleri (takvim, ders bilgileri, haftalık içerik, imza) güncelle.
  // Böylece indirilen dosya, orijinaliyle piksel piksel aynı kalır.
  const templatePath = path.join(__dirname, "templates", "YILLIK_PLANLAR.xlsx");
  if (payload.kaynakSayfaAdi && fs.existsSync(templatePath)) {
    try {
      const twb = new ExcelJS.Workbook();
      await twb.xlsx.readFile(templatePath);
      const takvimWs = twb.getWorksheet("TAKVİM");
      const dersWs = twb.getWorksheet(payload.kaynakSayfaAdi);
      if (takvimWs && dersWs) {
        twb.calcProperties.fullCalcOnLoad = true;
        twb.worksheets.slice().forEach(sh => {
          if (sh !== takvimWs && sh !== dersWs) twb.removeWorksheet(sh.id);
        });
        fillYillikPlanTakvimSayfasi(takvimWs, payload);
        fillYillikPlanDersSayfasi(dersWs, payload);
        await twb.xlsx.writeFile(result.filePath);
        return result.filePath;
      }
    } catch (e) {
      console.error("Şablon tabanlı Yıllık Plan exportu başarısız, sıfırdan üretime düşülüyor:", e);
    }
  }

  return buildYillikPlanFromScratch(result.filePath, payload);
});

// Şablon dosyasında bu ders için sayfa bulunamazsa (ör. sonradan elle
// eklenmiş, orijinal 19 sayfada olmayan bir ders) devreye giren yedek:
// biçimlendirmeyi sıfırdan, hücre hücre çiziyor — eskiden tek yöntem
// buydu, artık sadece kurtarma senaryosu.
async function buildYillikPlanFromScratch(filePath, payload) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Yıllık Plan");
  // Kullanıcının kendi YILLIK_PLANLAR.xlsx dosyasıyla BİREBİR aynı sütun
  // sayısı ve aynı birleştirme (merge) sınırları — A'dan AE'ye (31 sütun).
  // Aşağıdaki bütün sütun aralıkları o dosyadan hücre hücre okunarak
  // belirlendi, tahmini/orantılı bir bölüştürme DEĞİL.
  const COLS = 31; // A..AE
  // Orijinal dosyanın <cols> tanımı ham XML'den okundu: A sütunu (1) width=9,
  // B'den AE'ye (2-31) HEPSİ width=4.3 — "geri kalanı varsayılan genişlikte"
  // sanmak yanlıştı, bütün dosyada bu iki grup dışında sütun yok.
  // NOT: exceljs'in kendi iç sabiti DEFAULT_COLUMN_WIDTH=9 olduğu için, tam
  // 9.0 yazılırsa "özel genişlik değil" sanıp satırı sessizce siliyor
  // (bilinen exceljs hatası) — görsel olarak fark etmeyecek kadar küçük bir
  // ofsetle bu hatayı atlatıyoruz.
  ws.getColumn(1).width = 9.001; // orijinal dosyada A sütunu (9.0)
  for (let c = 2; c <= COLS; c++) ws.getColumn(c).width = 4.3; // orijinal dosyada B..AE
  // Orijinal dosyanın kenar boşlukları (Sayfa Düzeni > Kenar Boşlukları) ve
  // yatay/tek sayfaya sığdır ayarı — inç cinsinden, dosyadan birebir okundu.
  ws.pageSetup = {
    orientation: "landscape",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    scale: 96,
    margins: { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4, header: 0.511811023622047, footer: 0.511811023622047 }
  };
  const thin = { style: "thin", color: { argb: "FF999999" } };
  const border = { top: thin, bottom: thin, left: thin, right: thin };
  const headerFill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF4F6FA" } };
  const tatilFill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFEDE3F5" } };

  function mergeSet(r1, c1, r2, c2, value, opts) {
    opts = opts || {};
    if (r1 !== r2 || c1 !== c2) ws.mergeCells(r1, c1, r2, c2);
    const cell = ws.getCell(r1, c1);
    cell.value = value === undefined ? "" : value;
    cell.font = Object.assign({ size: 10 }, opts.font || {});
    cell.alignment = Object.assign({ vertical: "middle", horizontal: "left", wrapText: true }, opts.alignment || {});
    if (opts.border !== false) cell.border = border;
    if (opts.fill) cell.fill = opts.fill;
    return cell;
  }
  // Bilgi tablosu / sınav tarihleri / önemli gün ve haftalar satırları —
  // orijinal dosyadaki A:F(etiket) G:O(değer) P:T(etiket) U:AE(değer)
  // birleştirmesiyle birebir aynı.
  function labelValueRow(r, pairs, rowHeight) {
    mergeSet(r, 1, r, 6, pairs[0][0], { font: { bold: true } });
    mergeSet(r, 7, r, 15, pairs[0][1] || "-");
    if (pairs[1]) {
      mergeSet(r, 16, r, 20, pairs[1][0], { font: { bold: true } });
      mergeSet(r, 21, r, 31, pairs[1][1] || "-");
    }
    ws.getRow(r).height = rowHeight || 15;
  }

  let r = 1;
  // Logolar + başlık — orijinal dosyada tek satır (row 1, yükseklik 75),
  // MEB logosu A sütununda (col 0), okul logosu AC sütununda (col 28),
  // başlık H1:X1 birleşimi. Sonra bir boş satır (row 2, yükseklik 15),
  // bilgi tablosu 3. satırdan başlıyor — birebir orijinal dosyadan.
  if (payload.logos && payload.logos.meb) {
    const m = /^data:image\/(\w+);base64,/.exec(payload.logos.meb);
    if (m) {
      const imgId = wb.addImage({ base64: payload.logos.meb, extension: m[1] === "jpeg" ? "jpeg" : m[1] });
      ws.addImage(imgId, { tl: { col: 0, row: r - 1 }, ext: { width: 85, height: 85 } });
    }
  }
  if (payload.logos && payload.logos.okul) {
    const m = /^data:image\/(\w+);base64,/.exec(payload.logos.okul);
    if (m) {
      const imgId = wb.addImage({ base64: payload.logos.okul, extension: m[1] === "jpeg" ? "jpeg" : m[1] });
      ws.addImage(imgId, { tl: { col: 28, row: r - 1 }, ext: { width: 85, height: 85 } });
    }
  }
  mergeSet(r, 8, r, 24, "YILLIK DERS PLANI", {
    font: { bold: true, size: 16 }, alignment: { vertical: "middle", horizontal: "center" }, border: false
  });
  ws.getRow(r).height = 75;
  r += 1;
  ws.getRow(r).height = 15;
  r += 1;

  // Bilgi tablosu
  const meta = payload.meta || {};
  labelValueRow(r++, [["EĞİTİM-ÖĞRETİM YILI", meta.ogretimYili], ["OKUL", meta.okulAdi]]);
  labelValueRow(r++, [["DERS", meta.ders], ["ALAN/DAL", meta.alanDal]]);
  labelValueRow(r++, [["DERS SAATİ", meta.dersSaati], ["SINIF", meta.sinif]]);
  r += 1;

  // Sınav tarihleri
  const sinav = payload.sinav || {};
  mergeSet(r, 1, r, 15, "1.DÖNEM SINAV TARİHLERİ", { font: { bold: true }, alignment: { horizontal: "center" }, fill: headerFill });
  mergeSet(r, 16, r, 31, "2.DÖNEM SINAV TARİHLERİ", { font: { bold: true }, alignment: { horizontal: "center" }, fill: headerFill });
  r += 1;
  labelValueRow(r++, [["1.Dönem 1.Sınav Tarihi", sinav.d1s1], ["2.Dönem 1.Sınav Tarihi", sinav.d2s1]]);
  labelValueRow(r++, [["1.Dönem 2.Sınav Tarihi", sinav.d1s2], ["2.Dönem 2.Sınav Tarihi", sinav.d2s2]]);
  r += 1;

  // Önemli gün ve haftalar
  mergeSet(r, 1, r, 15, "1.DÖNEM ÖNEMLİ GÜN VE HAFTALAR", { font: { bold: true }, alignment: { horizontal: "center" }, fill: headerFill });
  mergeSet(r, 16, r, 31, "2.DÖNEM ÖNEMLİ GÜN VE HAFTALAR", { font: { bold: true }, alignment: { horizontal: "center" }, fill: headerFill });
  r += 1;
  const d1 = (payload.onemliGunler && payload.onemliGunler.d1) || [];
  const d2 = (payload.onemliGunler && payload.onemliGunler.d2) || [];
  for (let i = 0; i < 6; i++) {
    labelValueRow(r++, [[(d1[i] || {}).label || "", (d1[i] || {}).value || ""], [(d2[i] || {}).label || "", (d2[i] || {}).value || ""]]);
  }
  r += 1;

  // İşgünü takvimi — orijinal dosyada her ay 6 ayrı sütun (o ayda o güne denk
  // gelen tarihler tek tek, virgülle değil ayrı hücrelerde), 5 ay bir satırda,
  // 10 ay 2 satıra bölünmüş — TAM sayfa genişliği kullanılıyor. Önceki
  // sürümde her ay tek dar sütundu, bu da sayfanın sağ yarısını boş
  // bırakıyordu (kullanıcı ekran görüntüsüyle gösterdi).
  const takvim = payload.isguluTakvimi;
  if (takvim) {
    mergeSet(r, 1, r, COLS, (meta.ogretimYili || "") + " EĞİTİM-ÖĞRETİM YILI İŞGÜNÜ TAKVİMİ", { font: { bold: true }, alignment: { horizontal: "center" }, fill: headerFill });
    r += 1;
    const AYLAR_PER_ROW = 5;
    const AY_COL_SPAN = 6;
    for (let grup = 0; grup < takvim.aylar.length; grup += AYLAR_PER_ROW) {
      const ayGrubu = takvim.aylar.slice(grup, grup + AYLAR_PER_ROW);
      mergeSet(r, 1, r, 1, "Günler", { font: { bold: true }, fill: headerFill });
      ayGrubu.forEach((a, i) => {
        const c1 = 2 + i * AY_COL_SPAN;
        mergeSet(r, c1, r, c1 + AY_COL_SPAN - 1, a.ad + " " + a.yil, { font: { bold: true }, alignment: { horizontal: "center" }, fill: headerFill });
      });
      r += 1;
      takvim.gunler.forEach((gun, gunIdx) => {
        mergeSet(r, 1, r, 1, gun, { font: { bold: true } });
        ayGrubu.forEach((a, i) => {
          const ayIdx = grup + i;
          const gunNumaralari = takvim.grid[gunIdx][ayIdx] || [];
          const c1 = 2 + i * AY_COL_SPAN;
          for (let k = 0; k < AY_COL_SPAN; k++) {
            mergeSet(r, c1 + k, r, c1 + k, gunNumaralari[k] || "", { alignment: { horizontal: "center" } });
          }
        });
        r += 1;
      });
    }
    r += 1;
  }

  // Haftalık plan tablosu — orijinal dosyayla birebir aynı sütun genişliği:
  // TARİH(A:C,3) + KAZANIMLAR(D:K,8) + KONULAR(L:Q,6) + YÖNTEM(R:V,5) +
  // ARAÇ(W:AC,7) + DEĞERLENDİRME(AD:AE,2) = 31 sütun.
  const haftaColSpans = [["TARİH", 3], ["KAZANIMLAR", 8], ["KONULAR", 6],
    ["ÖĞRENME-ÖĞRETME YÖNTEM VE TEKNİKLERİ", 5], ["KULLANILAN EĞİTİM TEKNOLOJİLERİ, ARAÇ VE GEREÇLER", 7], ["DEĞERLENDİRME", 2]];
  const headerRow = r;
  let hc = 1;
  const haftaColStarts = [];
  haftaColSpans.forEach(([h, span]) => {
    haftaColStarts.push(hc);
    mergeSet(headerRow, hc, headerRow, hc + span - 1, h, { font: { bold: true }, alignment: { horizontal: "center" }, fill: headerFill });
    hc += span;
  });
  r += 1;
  const haftaFields = ["tarihAraligi", "kazanimlar", "konular", "yontem", "arac", "degerlendirme"];
  (payload.haftalar || []).forEach(h => {
    if (h.tatilMi) {
      mergeSet(r, haftaColStarts[0], r, haftaColStarts[0] + haftaColSpans[0][1] - 1, h.tarihAraligi);
      mergeSet(r, haftaColStarts[1], r, COLS, h.tatilAdi, { font: { bold: true }, alignment: { horizontal: "center" }, fill: tatilFill });
    } else {
      haftaColSpans.forEach(([, span], i) => {
        mergeSet(r, haftaColStarts[i], r, haftaColStarts[i] + span - 1, h[haftaFields[i]]);
      });
    }
    // Yükseklik özellikle sabitlenmiyor — orijinal dosyada olduğu gibi Excel,
    // metin uzunluğuna göre satırı kendisi otomatik sığdırıyor (wrapText açık).
    r += 1;
  });
  r += 1;

  // İmza bloğu — orijinal dosyayla aynı: A:J(10) / L:T(9, K boşluk) /
  // V:AE(10, U boşluk) — 3 kişi/satır.
  const imzaKolonlari = [[1, 10], [12, 20], [22, 31]];
  const teachers = payload.teachers || [];
  for (let i = 0; i < teachers.length; i += 3) {
    const grup = teachers.slice(i, i + 3);
    grup.forEach((t, gi) => {
      const [c1, c2] = imzaKolonlari[gi];
      mergeSet(r, c1, r, c2, t.ad, { font: { bold: true }, alignment: { horizontal: "center" }, border: false });
      mergeSet(r + 1, c1, r + 1, c2, t.brans, { alignment: { horizontal: "center" }, border: false });
      mergeSet(r + 2, c1, r + 2, c2, t.unvan, { alignment: { horizontal: "center" }, border: false });
    });
    r += 4;
  }
  r += 1;
  mergeSet(r, 1, r, COLS, "…../…../..........", { alignment: { horizontal: "center" }, border: false });
  r += 1;
  mergeSet(r, 1, r, COLS, "UYGUNDUR", { font: { bold: true }, alignment: { horizontal: "center" }, border: false });
  r += 1;
  mergeSet(r, 1, r, COLS, payload.mudurAdi || "", { font: { bold: true }, alignment: { horizontal: "center" }, border: false });
  r += 1;
  mergeSet(r, 1, r, COLS, "OKUL MÜDÜRÜ", { alignment: { horizontal: "center" }, border: false });

  await wb.xlsx.writeFile(filePath);
  return filePath;
}

// TAKVİM sayfasında sadece elle girilen/hesaplanan hücreleri günceller —
// geri kalan her şey (İşgünü Takvimi ızgarası dahil) sayfanın kendi
// formülleriyle ($E$3'e bağlı) Excel'de açılınca otomatik yeniden hesaplanır.
function fillYillikPlanTakvimSayfasi(ws, payload) {
  const meta = payload.meta || {};
  const sinav = payload.sinav || {};
  ws.getCell("E3").value = meta.ogretimYili || "";
  ws.getCell("B7").value = sinav.d1s1 || "";
  ws.getCell("B8").value = sinav.d1s2 || "";
  ws.getCell("B9").value = sinav.d2s1 || "";
  ws.getCell("B10").value = sinav.d2s2 || "";

  const d1 = (payload.onemliGunler && payload.onemliGunler.d1) || [];
  const d2 = (payload.onemliGunler && payload.onemliGunler.d2) || [];
  // TAKVİM satırı -> [dönem dizisi, dizideki index] eşleşmesi, dosyadan
  // hücre hücre okunarak çıkarıldı (dönemler satırlarda iç içe geçiyor).
  const ONEMLI_GUN_SATIR_ESLESME = [
    [13, d1, 0], [14, d2, 0], [15, d1, 1], [16, d1, 3], [17, d1, 2], [18, d2, 2],
    [19, d2, 1], [20, d2, 3], [21, d1, 4], [22, d2, 4], [23, d1, 5], [24, d2, 5]
  ];
  ONEMLI_GUN_SATIR_ESLESME.forEach(([row, dizi, idx]) => {
    ws.getCell("B" + row).value = (dizi[idx] && dizi[idx].value) || "";
  });

  (payload.haftalar || []).forEach((h, i) => {
    const row = 29 + i; // TAKVİM'de 40 haftalık tablo 29. satırdan başlıyor
    ws.getCell("B" + row).value = h.tarihAraligi || "";
    ws.getCell("C" + row).value = h.tatilMi ? "EVET" : "HAYIR";
    ws.getCell("D" + row).value = h.tatilMi ? (h.tatilAdi || "") : "";
  });
}

// Ders sayfasında: bilgi tablosu (ders saati/alan-dal/sınıf), haftalık
// içerik (kazanım/konu/yöntem/araç/değerlendirme ya da tatil ise tek
// birleşik hücre) ve imza bloğu güncellenir. Satır/sütun numaraları
// orijinal dosyadan hücre hücre okunarak çıkarıldı.
function fillYillikPlanDersSayfasi(ws, payload) {
  const meta = payload.meta || {};
  ws.getCell("G4").value = ": " + (meta.ders || "");
  ws.getCell("U4").value = ": " + (meta.alanDal || "");
  ws.getCell("G5").value = ": " + (meta.dersSaati || "");
  ws.getCell("U5").value = ": " + (meta.sinif || "");

  function resetWeekRowMerges(row) {
    [[row, 4, row, 31], [row, 4, row, 11], [row, 12, row, 17], [row, 18, row, 22], [row, 23, row, 29], [row, 30, row, 31]]
      .forEach(([r1, c1, r2, c2]) => { try { ws.unMergeCells(r1, c1, r2, c2); } catch (e) { /* zaten o şekilde değildi */ } });
  }
  (payload.haftalar || []).forEach((h, i) => {
    const row = 38 + i; // haftalık tablo 38. satırdan başlıyor (37+haftaNo)
    // A:C sütunu (tarih aralığı) =TAKVİM!$B$(28+haftaNo) formülüyle zaten
    // bağlı — dokunmuyoruz, TAKVİM güncellenince kendisi değişiyor.
    resetWeekRowMerges(row);
    if (h.tatilMi) {
      ws.mergeCells(row, 4, row, 31);
      const cell = ws.getCell(row, 4);
      cell.value = h.tatilAdi || "TATİL";
      cell.alignment = { horizontal: "center", vertical: "center", wrapText: true };
    } else {
      ws.mergeCells(row, 4, row, 11);
      ws.getCell(row, 4).value = h.kazanimlar || "";
      ws.mergeCells(row, 12, row, 17);
      ws.getCell(row, 12).value = h.konular || "";
      ws.mergeCells(row, 18, row, 22);
      ws.getCell(row, 18).value = h.yontem || "";
      ws.mergeCells(row, 23, row, 29);
      ws.getCell(row, 23).value = h.arac || "";
      ws.mergeCells(row, 30, row, 31);
      ws.getCell(row, 30).value = h.degerlendirme || "";
    }
  });

  // İmza bloğu: A81/L81/V81 (1-3. kişi), A85/L85/V85 (4-6. kişi) — her
  // kişi için ad(satır0)/branş(satır1)/ünvan(satır2). Fazlası varsa
  // şablonda yer olmadığı için ilk 6 kişi gösterilir.
  const IMZA_HUCRELERI = [[81, 1], [81, 12], [81, 22], [85, 1], [85, 12], [85, 22]];
  const teachers = payload.teachers || [];
  IMZA_HUCRELERI.forEach(([row, col], i) => {
    const t = teachers[i];
    ws.getCell(row, col).value = t ? t.ad : "";
    ws.getCell(row + 1, col).value = t ? t.brans : "";
    ws.getCell(row + 2, col).value = t ? t.unvan : "";
  });
  ws.getCell("A92").value = payload.mudurAdi || "";
}

/* Günlük Plan'ın Excel çıktısı — Yıllık Plan'la birebir aynı yöntem:
   kullanıcının kendi GÜNLÜK_PLANLAR.xlsx dosyası (electron/templates/)
   şablon olarak açılıp SADECE değişen hücreler güncelleniyor. TARİH
   sütunu her zaman TAKVİM'e ve seçilen Ders Günü'ne bağlı canlı formül
   olarak kalıyor (=TAKVİM!$B$xx+(MATCH($G$5,...)-1)) — dokunulmuyor. */
ipcMain.handle("export:gunluk-plan-excel", async (evt, defaultName, payload) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Excel Olarak Kaydet",
    defaultPath: defaultName,
    filters: [{ name: "Excel Dosyası", extensions: ["xlsx"] }]
  });
  if (result.canceled || !result.filePath) return null;

  const templatePath = path.join(__dirname, "templates", "GUNLUK_PLANLAR.xlsx");
  if (payload.kaynakSayfaAdi && fs.existsSync(templatePath)) {
    try {
      const twb = new ExcelJS.Workbook();
      await twb.xlsx.readFile(templatePath);
      const takvimWs = twb.getWorksheet("TAKVİM");
      const dersWs = twb.getWorksheet(payload.kaynakSayfaAdi);
      if (takvimWs && dersWs) {
        twb.calcProperties.fullCalcOnLoad = true;
        twb.worksheets.slice().forEach(sh => {
          if (sh !== takvimWs && sh !== dersWs) twb.removeWorksheet(sh.id);
        });
        fillGunlukPlanTakvimSayfasi(takvimWs, payload);
        fillGunlukPlanDersSayfasi(dersWs, payload);
        await twb.xlsx.writeFile(result.filePath);
        return result.filePath;
      }
    } catch (e) {
      console.error("Şablon tabanlı Günlük Plan exportu başarısız:", e);
    }
  }
  throw new Error("Bu ders için şablon dosyasında karşılık gelen bir sayfa bulunamadı.");
});

function fillGunlukPlanTakvimSayfasi(ws, payload) {
  const meta = payload.meta || {};
  ws.getCell("B4").value = meta.ogretimYili || "";
  (payload.haftalar || []).forEach((h, i) => {
    const row = 10 + i; // TAKVİM'de 40 haftalık tablo 10. satırdan başlıyor
    ws.getCell("D" + row).value = h.tatilMi ? "EVET" : "HAYIR";
    ws.getCell("E" + row).value = h.tatilMi ? (h.tatilAdi || "") : "";
  });
}

function fillGunlukPlanDersSayfasi(ws, payload) {
  const meta = payload.meta || {};
  ws.getCell("B3").value = meta.ders || "";
  ws.getCell("B4").value = meta.sinif || "";
  ws.getCell("B5").value = meta.ogretmen || "";
  ws.getCell("G3").value = meta.alanDal || "";
  ws.getCell("G4").value = meta.dersSaati || "";
  ws.getCell("G5").value = meta.dersGunu || "";

  (payload.haftalar || []).forEach((h, i) => {
    const row = 8 + i; // haftalık tablo 8. satırdan başlıyor (7+haftaNo)
    try { ws.unMergeCells(row, 2, row, 9); } catch (e) { /* zaten ayrık hücrelerdi */ }
    // A sütunu (TARİH) =TAKVİM!$B$xx+(MATCH($G$5,...)-1) formülüyle zaten
    // bağlı — dokunmuyoruz, TAKVİM ve G5 güncellenince kendisi değişiyor.
    if (h.tatilMi) {
      ws.mergeCells(row, 2, row, 9);
      const cell = ws.getCell(row, 2);
      cell.value = h.tatilAdi || "TATİL";
      cell.alignment = { horizontal: "center", vertical: "center", wrapText: true };
    } else {
      ws.getCell(row, 2).value = h.konu || "";
      ws.getCell(row, 3).value = h.kazanim || "";
      ws.getCell(row, 4).value = h.giris || "";
      ws.getCell(row, 5).value = h.gelisme || "";
      ws.getCell(row, 6).value = h.sonuc || "";
      ws.getCell(row, 7).value = h.yontem || "";
      ws.getCell(row, 8).value = h.arac || "";
      ws.getCell(row, 9).value = h.olcme || "";
    }
  });

  ws.getCell("A51").value = meta.ogretmen || "";
  ws.getCell("F51").value = payload.mudurAdi || "";
}

// Norm Kadro Excel çıktısı — okulun kendi resmi MAKİNE NORM 2026_2027.xlsx
// dosyası ham XML'den hücre hücre okunarak birebir eşleştirildi: sütun
// genişlikleri (A=4, B=9, C=12, D=38.86, E=13, F=12, G=14, H=24.14),
// A4 dikey sayfa, %65 ölçek, kenar boşlukları (sol/sağ 0.75", üst/alt 1").
ipcMain.handle("export:norm-kadro-excel", async (evt, defaultName, payload) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Excel Olarak Kaydet",
    defaultPath: defaultName,
    filters: [{ name: "Excel Dosyası", extensions: ["xlsx"] }]
  });
  if (result.canceled || !result.filePath) return null;

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Norm Kadro");
  const COLS = 8; // A..H
  ws.getColumn(1).width = 4;
  // exceljs'in DEFAULT_COLUMN_WIDTH=9 sabitiyle tam eşleşen bir genişlik
  // "özel değil" sayılıp sessizce atlanıyor (bkz. Yıllık Plan export'taki
  // aynı not) — 9.001 ile bu hatayı atlatıyoruz.
  ws.getColumn(2).width = 9.001;
  ws.getColumn(3).width = 12;
  ws.getColumn(4).width = 38.85546875;
  ws.getColumn(5).width = 13;
  ws.getColumn(6).width = 12;
  ws.getColumn(7).width = 14;
  ws.getColumn(8).width = 24.140625;
  ws.pageSetup = {
    paperSize: 9, orientation: "portrait", fitToPage: false, scale: 65,
    margins: { left: 0.75, right: 0.75, top: 1, bottom: 1, header: 0.511811023622047, footer: 0.511811023622047 }
  };
  const thin = { style: "thin", color: { argb: "FF000000" } };
  const border = { top: thin, bottom: thin, left: thin, right: thin };

  function mergeSet(r1, c1, r2, c2, value, opts) {
    opts = opts || {};
    if (r1 !== r2 || c1 !== c2) ws.mergeCells(r1, c1, r2, c2);
    const cell = ws.getCell(r1, c1);
    cell.value = value === undefined ? "" : value;
    cell.font = Object.assign({ name: "Times New Roman", size: 10 }, opts.font || {});
    cell.alignment = Object.assign({ vertical: "center", horizontal: "left", wrapText: true }, opts.alignment || {});
    if (opts.border !== false) cell.border = border;
    return cell;
  }

  let r = 1;
  mergeSet(r, 1, r, COLS, payload.okulAdi || "", { font: { bold: true, size: 13 }, alignment: { horizontal: "center" }, border: false });
  ws.getRow(r).height = 21.75;
  r += 1;
  const alanBaslik = (payload.alanAdi || "").toLocaleUpperCase("tr-TR").replace(/\s*ALAN(I|İ)?\s*$/, "").trim();
  mergeSet(r, 1, r, COLS, alanBaslik + " ALANI \n" + (payload.ogretimYili || "") + " EĞİTİM-ÖĞRETİM YILI  NORM KADRO HESABI  ",
    { font: { bold: true, size: 11 }, alignment: { horizontal: "center" }, border: false });
  ws.getRow(r).height = 38.25;
  r += 1;
  ws.getRow(r).height = 26.25;
  r += 1;

  const headerRow = r;
  const basliklar = ["No", "SINIF", "ÖĞRENCİ\nSAYISI", "DERS ADI", "HAFTALIK\nSAAT", "GRUP\nSAYISI\n(Katsayı)", "TOPLAM\nDERS SAATİ", "AÇIKLAMA"];
  basliklar.forEach((b, i) => mergeSet(headerRow, i + 1, headerRow, i + 1, b, { font: { bold: true }, alignment: { horizontal: "center" } }));
  ws.getRow(headerRow).height = 43.5;
  r += 1;

  // AMP Mesleki Alan Dersleri — sınıf başına başlık satırı + ders satırları,
  // Öğrenci Sayısı sütunu o sınıfın tüm ders satırları boyunca dikey birleşik.
  (payload.siniflar || []).forEach(sinif => {
    mergeSet(r, 1, r, COLS, "  " + sinif.sinif + " Sınıfı  ", { font: { bold: true }, border: { top: thin, bottom: thin, left: thin, right: false } });
    r += 1;
    const startRow = r;
    (sinif.dersler || []).forEach(d => {
      mergeSet(r, 1, r, 1, d.no, { alignment: { horizontal: "center" } });
      mergeSet(r, 2, r, 2, sinif.sinif, { alignment: { horizontal: "center" } });
      mergeSet(r, 4, r, 4, d.ders, { font: { bold: true } });
      mergeSet(r, 5, r, 5, d.saat, { alignment: { horizontal: "center" } });
      mergeSet(r, 6, r, 6, d.grup, { alignment: { horizontal: "center" } });
      mergeSet(r, 7, r, 7, d.toplam, { font: { bold: true }, alignment: { horizontal: "center" }, border: { top: thin, bottom: thin, left: thin, right: false } });
      r += 1;
    });
    if (r > startRow) mergeSet(startRow, 3, r - 1, 3, sinif.ogrenciSayisi != null ? sinif.ogrenciSayisi : "", { font: { bold: true }, alignment: { horizontal: "center" } });
  });
  mergeSet(r, 1, r, 6, "AMP MESLEKİ ALAN DERSLERİ TOPLAMI", { font: { bold: true }, border: { top: thin, bottom: thin, left: thin, right: false } });
  mergeSet(r, 7, r, 7, payload.ampToplam || 0, { font: { bold: true }, alignment: { horizontal: "center" } });
  r += 2;

  mergeSet(r, 1, r, COLS, "KOORDİNATÖRLÜK DERSLERİ  (AMP – 12. Sınıflar)", { font: { bold: true }, border: { top: thin, bottom: thin, left: thin, right: false } });
  r += 1;
  (payload.koordinatorluk || []).forEach(k => {
    mergeSet(r, 1, r, 1, k.no, { alignment: { horizontal: "center" } });
    mergeSet(r, 2, r, 2, k.sinif, { alignment: { horizontal: "center" } });
    mergeSet(r, 3, r, 3, k.ogrenciSayisi, { alignment: { horizontal: "center" } });
    mergeSet(r, 4, r, 4, k.dal, { font: { bold: true } });
    mergeSet(r, 5, r, 5, k.saat, { alignment: { horizontal: "center" } });
    mergeSet(r, 6, r, 6, k.grup, { alignment: { horizontal: "center" } });
    mergeSet(r, 7, r, 7, k.toplam, { font: { bold: true }, alignment: { horizontal: "center" } });
    r += 1;
  });
  mergeSet(r, 1, r, 6, "KOORDİNATÖRLÜK TOPLAMI", { font: { bold: true }, border: { top: thin, bottom: thin, left: thin, right: false } });
  mergeSet(r, 7, r, 7, payload.koordToplam || 0, { font: { bold: true }, alignment: { horizontal: "center" } });
  r += 2;

  mergeSet(r, 1, r, COLS, "ŞEFLİK DERS YÜKLERİ  ", { font: { bold: true }, border: { top: thin, bottom: thin, left: thin, right: false } });
  r += 1;
  (payload.seflik || []).forEach(s => {
    mergeSet(r, 1, r, 1, s.no, { alignment: { horizontal: "center" } });
    mergeSet(r, 2, r, 2, "—", { alignment: { horizontal: "center" } });
    mergeSet(r, 3, r, 3, "—", { alignment: { horizontal: "center" } });
    mergeSet(r, 4, r, 4, s.ders, { font: { bold: true } });
    mergeSet(r, 5, r, 5, s.saat, { alignment: { horizontal: "center" } });
    mergeSet(r, 6, r, 6, s.grup, { alignment: { horizontal: "center" } });
    mergeSet(r, 7, r, 7, s.toplam, { font: { bold: true }, alignment: { horizontal: "center" } });
    mergeSet(r, 8, r, 8, s.aciklama || "");
    r += 1;
  });
  mergeSet(r, 1, r, 6, "ŞEFLİK DERS YÜKLERİ TOPLAMI", { font: { bold: true }, border: { top: thin, bottom: thin, left: thin, right: false } });
  mergeSet(r, 7, r, 7, payload.seflikToplam || 0, { font: { bold: true }, alignment: { horizontal: "center" } });
  r += 3;

  mergeSet(r, 1, r, 4, "  GENEL TOPLAM DERS YÜKÜ  ", { font: { bold: true, size: 11 }, border: { top: thin, bottom: thin, left: thin, right: false } });
  mergeSet(r, 5, r, 5, payload.genelToplam || 0, { font: { bold: true, size: 14 }, alignment: { horizontal: "center" } });
  mergeSet(r, 6, r, 6, "SAAT", { font: { bold: true }, alignment: { horizontal: "center" }, border: false });
  mergeSet(r, 7, r, 7, "NORM KADRO:", { font: { bold: true }, alignment: { horizontal: "center" } });
  mergeSet(r, 8, r, 8, payload.normKadroSayisi || 0, { font: { bold: true, size: 11 }, alignment: { horizontal: "center" } });
  ws.getRow(r).height = 36;
  r += 2;
  ws.getRow(r).height = 108;
  r += 1;
  const alanSefiUnvani = (payload.alanAdi || "").replace(/\s*alan[ıi]?\s*$/i, "").trim() + " Alan Şefi";
  mergeSet(r, 5, r, 8, alanSefiUnvani, { font: { bold: true }, alignment: { horizontal: "center" }, border: false });
  ws.getRow(r).height = 18;
  r += 1;
  mergeSet(r, 5, r, 8, payload.alanSefiAdi || "", { font: { bold: true, size: 11 }, alignment: { horizontal: "center" }, border: false });
  ws.getRow(r).height = 19.5;

  await wb.xlsx.writeFile(result.filePath);
  return result.filePath;
});

function buildWordHtml(innerHtml, landscape) {
  const pageSize = landscape ? "29.7cm 21cm" : "21cm 29.7cm";
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
  @page { size: ${pageSize}; margin: 2cm 1.8cm; }
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color:#000; }
  h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 15pt; color:#0E1B33; margin: 0 0 8pt; }
  h3 { font-family: Georgia, 'Times New Roman', serif; font-size: 12.5pt; color:#0E1B33; margin: 0 0 6pt; }
  table { border-collapse: collapse; width: 100%; font-size: 10.5pt; margin-bottom: 8pt; }
  th, td { border: 1px solid #666; padding: 4pt 6pt; text-align: left; vertical-align: top; }
  th { background: #EEF0F4; font-weight: 700; }
  .card { border: 1px solid #999; padding: 10pt; margin-bottom: 10pt; }
  .sched-print-page { padding-top: 60pt; padding-bottom: 60pt; }
  .sched-table { table-layout: fixed; }
  .sched-table th:first-child, .sched-table td:first-child { width: 40pt; }
  .small { font-size: 9.5pt; color:#333; }
  .print-doc-header { border-bottom: 2pt solid #000; padding-bottom: 8pt; margin-bottom: 14pt; }
  .print-doc-header .okul { font-weight: 700; font-size: 12.5pt; }
  .print-doc-header .alan { font-size: 10.5pt; color:#333; }
  .print-doc-header .tarih { font-size: 10pt; color:#333; }
  .print-page-break { page-break-before: always; mso-break-type: page-break; }
  .no-print { display: none; }
  .print-only { display: block; }
  .print-only-cell { display: table-cell; }
  .print-only-inline { display: inline; }
  input, textarea, select, button { display: none; }
</style>
</head>
<body>
${innerHtml}
</body>
</html>`;
}

ipcMain.handle("export:word", async (evt, defaultName, innerHtml, landscape) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Word Olarak Kaydet",
    defaultPath: defaultName,
    filters: [{ name: "Word Belgesi", extensions: ["doc"] }]
  });
  if (result.canceled || !result.filePath) return null;
  fs.writeFileSync(result.filePath, buildWordHtml(innerHtml, landscape), "utf-8");
  return result.filePath;
});

ipcMain.handle("export:pdf", async (evt, defaultName, landscape) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "PDF Olarak Kaydet",
    defaultPath: defaultName,
    filters: [{ name: "PDF Belgesi", extensions: ["pdf"] }]
  });
  if (result.canceled || !result.filePath) return null;
  // Not: Electron'un printToPDF({landscape:true}) parametresi bu sürümde
  // güvenilir çalışmıyor (test edildi, portre çıkıyor) — bunun yerine
  // sayfanın kendi CSS'indeki "@page{size:A4 landscape}" kuralını
  // (renderer tarafında yazdırmadan hemen önce enjekte edilir) okuması
  // için preferCSSPageSize kullanıyoruz.
  const opts = landscape
    ? { printBackground: true, preferCSSPageSize: true }
    : { printBackground: true, pageSize: "A4" };
  const data = await mainWindow.webContents.printToPDF(opts);
  fs.writeFileSync(result.filePath, data);
  return result.filePath;
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
