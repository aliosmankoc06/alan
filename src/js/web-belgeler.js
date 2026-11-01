/* ============================================================
   Tarayıcı (web) sürümü için belge indirme — Electron'daki
   electron/main.js'nin export:* IPC handler'larının tarayıcıda
   çalışan karşılığı. Aynı mantık, aynı hücre/satır eşlemeleri —
   sadece dosya diyaloğu yerine normal tarayıcı indirmesi, Node
   fs yerine fetch() kullanılıyor. views.js, belgeAraci() ile
   Electron'dayken window.desktop'ı, web'deyken window.webBelgeler'i
   seçip aynı isimli metotları çağırıyor.
   ============================================================ */

function belgeAraci() {
  if (window.desktop && window.desktop.isElectron) return window.desktop;
  if (window.webBelgeler) return window.webBelgeler;
  return null;
}

function webDosyaIndir(blob, dosyaAdi) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dosyaAdi;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return dosyaAdi;
}

async function webSablonYukle(dosyaAdi) {
  const resp = await fetch("templates/" + dosyaAdi);
  if (!resp.ok) throw new Error("Şablon dosyası bulunamadı: " + dosyaAdi);
  return await resp.arrayBuffer();
}

/* ---- Genel Excel (XLSX / SheetJS ile) ---- */
async function webExportExcel(defaultName, sheets) {
  if (typeof XLSX === "undefined") { alert("Excel kütüphanesi yüklenemedi — internet bağlantını kontrol et."); return null; }
  const wb = XLSX.utils.book_new();
  sheets.forEach((sheet, i) => {
    const ws = XLSX.utils.aoa_to_sheet(sheet.rows);
    if (sheet.colWidths) ws["!cols"] = sheet.colWidths.map(wch => ({ wch }));
    const name = (sheet.name || ("Sayfa" + (i + 1))).slice(0, 31).replace(/[\\/*?:[\]]/g, " ");
    XLSX.utils.book_append_sheet(wb, ws, name || ("Sayfa" + (i + 1)));
  });
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  webDosyaIndir(new Blob([buf], { type: "application/octet-stream" }), defaultName);
  return defaultName;
}

/* ---- Ders Programı (ExcelJS ile, stil/renk taşıyor) ---- */
async function webExportScheduleExcel(defaultName, teacherBlocks) {
  if (typeof ExcelJS === "undefined") { alert("Excel kütüphanesi yüklenemedi — internet bağlantını kontrol et."); return null; }
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Programlar");
  const dayHeaders = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
  const thin = { style: "thin", color: { argb: "FF999999" } };
  const borderAll = { top: thin, bottom: thin, left: thin, right: thin };
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

  const buf = await wb.xlsx.writeBuffer();
  webDosyaIndir(new Blob([buf], { type: "application/octet-stream" }), defaultName);
  return defaultName;
}

/* ---- Yıllık Plan (şablon tabanlı) ----
   electron/main.js'teki fillYillikPlanTakvimSayfasi/fillYillikPlanDersSayfasi
   ile birebir aynı — satır/sütun numaraları orijinal dosyadan hücre hücre
   okunarak çıkarıldı, burada değiştirilmedi. */
function webFillYillikPlanTakvimSayfasi(ws, payload) {
  const meta = payload.meta || {};
  const sinav = payload.sinav || {};
  ws.getCell("E3").value = meta.ogretimYili || "";
  ws.getCell("B7").value = sinav.d1s1 || "";
  ws.getCell("B8").value = sinav.d1s2 || "";
  ws.getCell("B9").value = sinav.d2s1 || "";
  ws.getCell("B10").value = sinav.d2s2 || "";

  const d1 = (payload.onemliGunler && payload.onemliGunler.d1) || [];
  const d2 = (payload.onemliGunler && payload.onemliGunler.d2) || [];
  const ONEMLI_GUN_SATIR_ESLESME = [
    [13, d1, 0], [14, d2, 0], [15, d1, 1], [16, d1, 3], [17, d1, 2], [18, d2, 2],
    [19, d2, 1], [20, d2, 3], [21, d1, 4], [22, d2, 4], [23, d1, 5], [24, d2, 5]
  ];
  ONEMLI_GUN_SATIR_ESLESME.forEach(([row, dizi, idx]) => {
    ws.getCell("B" + row).value = (dizi[idx] && dizi[idx].value) || "";
  });

  (payload.haftalar || []).forEach((h, i) => {
    const row = 29 + i;
    ws.getCell("B" + row).value = h.tarihAraligi || "";
    ws.getCell("C" + row).value = h.tatilMi ? "EVET" : "HAYIR";
    ws.getCell("D" + row).value = h.tatilMi ? (h.tatilAdi || "") : "";
  });
}
function webFillYillikPlanDersSayfasi(ws, payload) {
  const meta = payload.meta || {};
  ws.getCell("G4").value = ": " + (meta.ders || "");
  ws.getCell("U4").value = ": " + (meta.alanDal || "");
  ws.getCell("G5").value = ": " + (meta.dersSaati || "");
  ws.getCell("U5").value = ": " + (meta.sinif || "");

  function resetWeekRowMerges(row) {
    [[row, 4, row, 31], [row, 4, row, 11], [row, 12, row, 17], [row, 18, row, 22], [row, 23, row, 29], [row, 30, row, 31]]
      .forEach(([r1, c1, r2, c2]) => { try { ws.unMergeCells(r1, c1, r2, c2); } catch (e) {} });
  }
  (payload.haftalar || []).forEach((h, i) => {
    const row = 38 + i;
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
async function webExportYillikPlanExcel(defaultName, payload) {
  if (typeof ExcelJS === "undefined") { alert("Excel kütüphanesi yüklenemedi — internet bağlantını kontrol et."); return null; }
  if (!payload.kaynakSayfaAdi) throw new Error("Bu ders, orijinal Excel şablonundaki 19 dersten biri değil — henüz Excel'e aktarılamıyor.");
  const buf = await webSablonYukle("YILLIK_PLANLAR.xlsx");
  const twb = new ExcelJS.Workbook();
  await twb.xlsx.load(buf);
  const takvimWs = twb.getWorksheet("TAKVİM");
  const dersWs = twb.getWorksheet(payload.kaynakSayfaAdi);
  if (!takvimWs || !dersWs) throw new Error("Bu ders, orijinal Excel şablonundaki 19 dersten biri değil — henüz Excel'e aktarılamıyor.");
  twb.calcProperties.fullCalcOnLoad = true;
  twb.worksheets.slice().forEach(sh => { if (sh !== takvimWs && sh !== dersWs) twb.removeWorksheet(sh.id); });
  webFillYillikPlanTakvimSayfasi(takvimWs, payload);
  webFillYillikPlanDersSayfasi(dersWs, payload);
  const outBuf = await twb.xlsx.writeBuffer();
  webDosyaIndir(new Blob([outBuf], { type: "application/octet-stream" }), defaultName);
  return defaultName;
}

/* ---- Günlük Plan (şablon tabanlı) ---- */
function webFillGunlukPlanTakvimSayfasi(ws, payload) {
  const meta = payload.meta || {};
  ws.getCell("B4").value = meta.ogretimYili || "";
  (payload.haftalar || []).forEach((h, i) => {
    const row = 10 + i;
    ws.getCell("D" + row).value = h.tatilMi ? "EVET" : "HAYIR";
    ws.getCell("E" + row).value = h.tatilMi ? (h.tatilAdi || "") : "";
  });
}
function webFillGunlukPlanDersSayfasi(ws, payload) {
  const meta = payload.meta || {};
  ws.getCell("B3").value = meta.ders || "";
  ws.getCell("B4").value = meta.sinif || "";
  ws.getCell("B5").value = meta.ogretmen || "";
  ws.getCell("G3").value = meta.alanDal || "";
  ws.getCell("G4").value = meta.dersSaati || "";
  ws.getCell("G5").value = meta.dersGunu || "";

  (payload.haftalar || []).forEach((h, i) => {
    const row = 8 + i;
    try { ws.unMergeCells(row, 2, row, 9); } catch (e) {}
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
async function webExportGunlukPlanExcel(defaultName, payload) {
  if (typeof ExcelJS === "undefined") { alert("Excel kütüphanesi yüklenemedi — internet bağlantını kontrol et."); return null; }
  if (!payload.kaynakSayfaAdi) throw new Error("Bu ders, orijinal Excel şablonundaki 19 dersten biri değil — henüz Excel'e aktarılamıyor.");
  const buf = await webSablonYukle("GUNLUK_PLANLAR.xlsx");
  const twb = new ExcelJS.Workbook();
  await twb.xlsx.load(buf);
  const takvimWs = twb.getWorksheet("TAKVİM");
  const dersWs = twb.getWorksheet(payload.kaynakSayfaAdi);
  if (!takvimWs || !dersWs) throw new Error("Bu ders, orijinal Excel şablonundaki 19 dersten biri değil — henüz Excel'e aktarılamıyor.");
  twb.calcProperties.fullCalcOnLoad = true;
  twb.worksheets.slice().forEach(sh => { if (sh !== takvimWs && sh !== dersWs) twb.removeWorksheet(sh.id); });
  webFillGunlukPlanTakvimSayfasi(takvimWs, payload);
  webFillGunlukPlanDersSayfasi(dersWs, payload);
  const outBuf = await twb.xlsx.writeBuffer();
  webDosyaIndir(new Blob([outBuf], { type: "application/octet-stream" }), defaultName);
  return defaultName;
}

/* ---- Norm Kadro (sıfırdan, okulun resmi dosyasıyla birebir ölçü/stil) ---- */
async function webExportNormKadroExcel(defaultName, payload) {
  if (typeof ExcelJS === "undefined") { alert("Excel kütüphanesi yüklenemedi — internet bağlantını kontrol et."); return null; }
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Norm Kadro");
  const COLS = 8;
  ws.getColumn(1).width = 4;
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

  const outBuf = await wb.xlsx.writeBuffer();
  webDosyaIndir(new Blob([outBuf], { type: "application/octet-stream" }), defaultName);
  return defaultName;
}

/* ---- Word (HTML tabanlı .doc, Electron'daki ile birebir aynı) ---- */
function webBuildWordHtml(innerHtml, landscape) {
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
async function webExportWord(defaultName, innerHtml, landscape) {
  const html = webBuildWordHtml(innerHtml, landscape);
  webDosyaIndir(new Blob([html], { type: "application/msword" }), defaultName);
  return defaultName;
}

if (typeof window !== "undefined") {
  window.webBelgeler = {
    exportExcel: webExportExcel,
    exportScheduleExcel: webExportScheduleExcel,
    exportYillikPlanExcel: webExportYillikPlanExcel,
    exportGunlukPlanExcel: webExportGunlukPlanExcel,
    exportNormKadroExcel: webExportNormKadroExcel,
    exportWord: webExportWord
  };
}
