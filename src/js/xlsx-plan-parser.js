/* ============================================================
   Yıllık Plan / Günlük Plan Excel içe aktarma ayrıştırıcısı
   ------------------------------------------------------------
   Kullanıcının kendi hazırladığı YILLIK_PLANLAR.xlsx ve
   GUNLUK_PLANLAR.xlsx şablonlarının gerçek yapısına göre yazıldı
   (bkz. belgeler/ klasörü). Her iki şablonda da her ders bir sayfa,
   ilk birkaç satır meta bilgi (DERS/SINIF/ÖĞRETMEN/ALAN-DAL/DERS
   SAATİ), sonra TARİH ile başlayan bir başlık satırı ve altında
   veri satırları var. TAKVİM sayfası "Hafta No" ile başlayan 37-40
   haftalık resmî çalışma takvimini, sınav tarihlerini ve önemli
   gün/hafta listesini içeriyor — bütün ders sayfaları tarihlerini
   formülle (=TAKVİM!$B$xx) bu sayfadan çeker; biz de aynı mantıkla
   TAKVİM'i önce ayrıştırıp diğer sayfaların içeriğini ona göre
   (hafta NUMARASINA göre) eşliyoruz.
   ============================================================ */

const AY_REGEX = /Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık/;

function planCellText(v) {
  if (v === null || v === undefined) return "";
  if (v instanceof Date) return v.toLocaleDateString("tr-TR");
  return String(v).trim();
}

function sheetMeta(rows) {
  const map = {
    "DERS": "ders", "SINIF": "sinif", "ÖĞRETMEN": "ogretmen", "ALAN/DAL": "alanDal",
    "DERS SAATİ": "dersSaati", "DERS SAATI": "dersSaati", "DERS GÜNÜ SEÇ": "dersGunu"
  };
  const meta = {};
  for (let i = 0; i < Math.min(rows.length, 10); i++) {
    const row = rows[i] || [];
    for (let c = 0; c < row.length; c++) {
      const label = planCellText(row[c]).toUpperCase().trim();
      const key = map[label];
      if (!key || meta[key]) continue;
      for (let c2 = c + 1; c2 < row.length; c2++) {
        let val = planCellText(row[c2]).replace(/^:\s*/, "").trim();
        if (val) {
          if (key === "sinif") val = val.replace(/(\d{1,2})\s*\/\s*([A-ZİÖÜÇŞĞ])/, "$1-$2");
          meta[key] = val;
          break;
        }
      }
    }
  }
  return meta;
}

function planFindHeaderRow(rows, requiredCols) {
  for (let i = 0; i < rows.length; i++) {
    const row = (rows[i] || []).map(v => planCellText(v).toUpperCase());
    if (requiredCols.every(col => row.some(cell => cell === col))) return { rowIndex: i, cols: row };
  }
  return null;
}

function sistemFromSinif(sinif) {
  // Excel'den içe aktarılan planlar her zaman "eski" (mevcut/reform öncesi)
  // sistemde başlar — "Maarif Model" sınıflandırması artık sınıf seviyesinden
  // otomatik çıkarılmıyor, kullanıcı ilgili sekmedeyken elle ekliyor/yüklüyor
  // (bkz. views.js activePlanSistem, saveNewPlanEntry, importPlanFromExcel).
  return "eski";
}

const SINAV_TARIHI_REGEX = /(\d)\.\s*Dönem\s*(\d)\.\s*Sınav\s*Tarihi/i;
const SINAV_TARIHI_KEY = { "1-1": "d1s1", "1-2": "d1s2", "2-1": "d2s1", "2-2": "d2s2" };

/* "ÖNEMLİ GÜN VE HAFTALAR" satırlarını, uygulamanın zaten kullandığı
   sabit 6+6'lık d1/d2 yuvalarına (bkz. views.js ONEMLI_GUNLER_D1/D2_
   ETIKETLERI) eşler. Tam metin eşleşmesi aramıyoruz — okul her yıl bu
   etiketleri hafifçe farklı yazabiliyor (ör. "1.Dönem Ara Tatil" / "1.
   Dönem Ara Tatili") — anahtar kelimelerle sağlam bir eşleme yapıyoruz. */
function siniflandirOnemliGun(label) {
  const l = (label || "").toLocaleLowerCase("tr-TR");
  if (!l) return null;
  // "1.Yarıyıl Başlangıcı (elle değiştirilebilir)" gibi açıklama notu içeren
  // yardımcı etiketler (TAKVİM sayfasının üst kısmında, asıl ÖNEMLİ GÜN VE
  // HAFTALAR listesinden önce geçebiliyor) — bunları atlayıp asıl listedeki
  // temiz etikete bekliyoruz.
  if (/değiştir/.test(l)) return null;
  if (/1\.?\s*yarıyıl/.test(l) && /başlan/.test(l)) return ["d1", 0];
  if (/2\.?\s*yarıyıl/.test(l) && /başlan/.test(l)) return ["d2", 0];
  if (/cumhuriyet/.test(l)) return ["d1", 1];
  if (/1\.?\s*dönem/.test(l) && /ara\s*tatil/.test(l)) return ["d1", 3];
  if (/2\.?\s*dönem/.test(l) && /ara\s*tatil/.test(l)) return ["d2", 1];
  if (/atatürk/.test(l) && /gençlik/.test(l)) return ["d2", 3];
  if (/atatürk/.test(l)) return ["d1", 2];
  if (/23\s*nisan/.test(l) || /egemenlik/.test(l)) return ["d2", 2];
  if (/yılbaşı/.test(l)) return ["d1", 4];
  if (/ramazan/.test(l)) return ["d2", 4];
  if (/yarıyıl\s*tatili/.test(l)) return ["d1", 5];
  if (/sonu/.test(l) && /(eğitim|öğretim)/.test(l)) return ["d2", 5];
  return null;
}

function parseTakvimSheet(ws, XLSX) {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
  const haftalar = [];
  let ogretimYili = "";
  const sinavTarihleri = { d1s1: "", d1s2: "", d2s1: "", d2s2: "" };
  const onemliGunler = { d1: ["", "", "", "", "", ""], d2: ["", "", "", "", "", ""] };
  for (const row of rows) {
    if (!row || !row.length) continue;
    for (let c = 0; c < row.length; c++) {
      const label = planCellText(row[c]);
      if (label === "ÖĞRETİM YILI SEÇ" && !ogretimYili) {
        for (let c2 = c + 1; c2 < row.length; c2++) {
          const val = planCellText(row[c2]);
          if (val) { ogretimYili = val; break; }
        }
      }
      const m = SINAV_TARIHI_REGEX.exec(label);
      if (m) {
        const key = SINAV_TARIHI_KEY[m[1] + "-" + m[2]];
        if (key) {
          for (let c2 = c + 1; c2 < row.length; c2++) {
            const val = planCellText(row[c2]).replace(/^:\s*/, "").trim();
            if (val) { sinavTarihleri[key] = val; break; }
          }
        }
      }
      const sinif = siniflandirOnemliGun(label);
      if (sinif && !onemliGunler[sinif[0]][sinif[1]]) {
        for (let c2 = c + 1; c2 < row.length; c2++) {
          const val = planCellText(row[c2]).replace(/^:\s*/, "").trim();
          if (val) { onemliGunler[sinif[0]][sinif[1]] = val; break; }
        }
      }
    }
    const no = Number(row[0]);
    if (Number.isInteger(no) && no > 0 && row[1]) {
      const c1 = planCellText(row[1]);
      if (/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(c1)) {
        /* [Hafta No, Pazartesi tarihi, Tarih Aralığı, Tatil mi?, Tatil Adı] biçimi */
        haftalar.push({
          no, pazartesi: c1, tarihAraligi: planCellText(row[2]),
          tatilMi: planCellText(row[3]) === "EVET", tatilAdi: planCellText(row[4])
        });
      } else if (c1) {
        /* [Hafta No, Tarih Aralığı, Tatil mi?, Tatil Adı] biçimi (Pazartesi sütunu yok) */
        haftalar.push({
          no, pazartesi: "", tarihAraligi: c1,
          tatilMi: planCellText(row[2]) === "EVET", tatilAdi: planCellText(row[3])
        });
      }
    }
  }
  return haftalar.length ? { ogretimYili, haftalar, sinavTarihleri, onemliGunler } : null;
}

/* GÜNLÜK_PLANLAR.xlsx'te her ders sayfasında satır sırası hafta numarasıyla
   birebir örtüşüyor: başlık satırından (TARİH/KONU/...) sonraki ilk satır
   1. hafta, ikincisi 2. hafta... TAKVİM sayfasındaki 40 haftayla aynı sırada
   (tatil haftaları da içerik satırı olarak yer alıyor, sadece tek bir
   birleşik hücrede tatil adını gösteriyor — TARİH sütunu o satırlarda tek
   bir güne değil tarih aralığına işaret ettiği için aşağıdaki DD.MM.YYYY
   biçim kontrolünü geçemiyor ve otomatik atlanıyor). Bu yüzden hafta
   numarasını satırın TARİH metnini takvimle eşleştirerek değil, doğrudan
   satır sırasından çıkarıyoruz. */
function parseGunlukSheet(ws, XLSX, sheetName) {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
  const meta = sheetMeta(rows);
  const header = planFindHeaderRow(rows, ["TARİH", "KONU", "KAZANIM"]);
  if (!header || !meta.ders) return null;
  const colIndex = name => header.cols.indexOf(name);
  const idx = {
    tarih: colIndex("TARİH"), konu: colIndex("KONU"), kazanim: colIndex("KAZANIM"),
    giris: colIndex("GİRİŞ"), gelisme: colIndex("GELİŞME"), sonuc: colIndex("SONUÇ"),
    yontem: colIndex("YÖNTEM VE TEKNİKLER"), arac: colIndex("ARAÇ VE GEREÇLER"),
    olcme: colIndex("ÖLÇME-DEĞERLENDİRME")
  };
  const haftaIcerik = {};
  for (let r = header.rowIndex + 1; r < rows.length; r++) {
    const row = rows[r] || [];
    const tarih = planCellText(row[idx.tarih]);
    if (!/^\d{1,2}\.\d{1,2}\.\d{4}/.test(tarih)) continue; // tatil satırı ya da boş — atla
    const no = r - header.rowIndex;
    const konu = planCellText(row[idx.konu]), kazanim = planCellText(row[idx.kazanim]),
      giris = planCellText(row[idx.giris]), gelisme = planCellText(row[idx.gelisme]), sonuc = planCellText(row[idx.sonuc]),
      yontem = planCellText(row[idx.yontem]), arac = planCellText(row[idx.arac]), olcme = planCellText(row[idx.olcme]);
    if (!konu && !kazanim && !giris && !gelisme && !sonuc && !yontem && !arac && !olcme) continue;
    haftaIcerik[no] = { konu, kazanim, giris, gelisme, sonuc, yontem, arac, olcme };
  }
  if (!Object.keys(haftaIcerik).length) return null;
  return { ders: meta.ders, sinif: meta.sinif || "", ogretmen: meta.ogretmen || "", alanDal: meta.alanDal || "",
    dersSaati: meta.dersSaati || "", dersGunu: meta.dersGunu || "", sistem: sistemFromSinif(meta.sinif),
    haftaIcerik, kaynakSayfaAdi: sheetName || "" };
}

const YONTEM_BASLIK = "ÖĞRENME-ÖĞRETME\nYÖNTEM VE TEKNİKLERİ";
const ARAC_BASLIK = "KULLANILAN EĞİTİM TEKNOLOJİLERİ,\nARAÇ VE GEREÇLER";

/* takvimHaftalar: TAKVİM sayfasından ayrıştırılmış {no,tarihAraligi,tatilMi}
   listesi (yoksa null). Her ders sayfasındaki TARİH hücresi, formülle zaten
   TAKVİM'deki aynı metni gösterdiği için, buradaki tarih metnini
   takvimHaftalar'daki tarihAraligi ile eşleştirip doğru hafta NUMARASINI
   buluyoruz — uygulama artık içeriği tarihe göre değil hafta numarasına
   göre saklıyor (bkz. views.js renderYillikHaftaTablosu). Tatil haftaları
   hiç içe aktarılmaz; onların adı zaten S.akademikTakvim.haftalar'dan
   canlı okunuyor. */
function parseYillikSheet(ws, XLSX, takvimHaftalar, sheetName) {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
  const meta = sheetMeta(rows);
  const header = planFindHeaderRow(rows, ["TARİH", "KAZANIMLAR", "KONULAR"]);
  if (!header || !meta.ders) return null;
  const colIndex = name => header.cols.indexOf(name);
  const idx = {
    tarih: colIndex("TARİH"), kazanimlar: colIndex("KAZANIMLAR"), konular: colIndex("KONULAR"),
    yontem: colIndex(YONTEM_BASLIK), arac: colIndex(ARAC_BASLIK), degerlendirme: colIndex("DEĞERLENDİRME")
  };
  const haftaIcerik = {};
  let siradakiNo = 1;
  for (let r = header.rowIndex + 1; r < rows.length; r++) {
    const row = rows[r] || [];
    const tarih = planCellText(row[idx.tarih]);
    if (!tarih || !AY_REGEX.test(tarih)) continue;
    const eslesen = (takvimHaftalar || []).find(tk => tk.tarihAraligi && tk.tarihAraligi === tarih);
    if (eslesen && eslesen.tatilMi) continue; // tatil haftası — içerik yok, atla
    const kazanimlar = planCellText(row[idx.kazanimlar]);
    const konular = planCellText(row[idx.konular]);
    const yontem = planCellText(row[idx.yontem]);
    const arac = planCellText(row[idx.arac]);
    const degerlendirme = planCellText(row[idx.degerlendirme]);
    if (!kazanimlar && !konular && !yontem && !arac && !degerlendirme) continue;
    const no = eslesen ? eslesen.no : siradakiNo;
    haftaIcerik[no] = { kazanimlar, konular, yontem, arac, degerlendirme };
    siradakiNo = no + 1;
  }
  if (!Object.keys(haftaIcerik).length) return null;
  return { ders: meta.ders, sinif: meta.sinif || "", alanDal: meta.alanDal || "", dersSaati: meta.dersSaati || "",
    sistem: sistemFromSinif(meta.sinif), haftaIcerik, kaynakSayfaAdi: sheetName || "" };
}

function parsePlanWorkbook(filePathOrWb, XLSX) {
  const wb = typeof filePathOrWb === "string" ? XLSX.readFile(filePathOrWb) : filePathOrWb;
  const result = { takvim: null, yillikPlanlar: [], gunlukPlanlar: [] };
  const takvimSheetName = wb.SheetNames.find(sn => /TAKVİM/i.test(sn));
  if (takvimSheetName) {
    const t = parseTakvimSheet(wb.Sheets[takvimSheetName], XLSX);
    if (t) result.takvim = t;
  }
  const takvimHaftalar = result.takvim ? result.takvim.haftalar : null;
  for (const sn of wb.SheetNames) {
    if (sn === takvimSheetName) continue;
    const ws = wb.Sheets[sn];
    const g = parseGunlukSheet(ws, XLSX, sn);
    if (g) { result.gunlukPlanlar.push(g); continue; }
    const y = parseYillikSheet(ws, XLSX, takvimHaftalar, sn);
    if (y) { result.yillikPlanlar.push(y); continue; }
  }
  return result;
}

if (typeof module !== "undefined") module.exports = { parsePlanWorkbook };
