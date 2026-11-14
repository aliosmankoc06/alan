/* ============================================================
   e-Okul "Sınıf Listesi" PDF ayrıştırıcısı
   ------------------------------------------------------------
   Her sayfa bir sınıf/şube: başlıkta "AMP - 9. Sınıf / A Şubesi
   (... ALANI) Sınıf Listesi" gibi bir satır, altında sütun
   başlıkları (S.No, Öğrenci No, Adı, Soyadı, Cinsiyeti, Pansiyon
   Durum) ve öğrenci satırları var. pdf-parse'ın pdfjs-dist tabanlı
   pagerender kancasıyla her metin parçasının x/y konumunu okuyup
   satırlara (y toleranslı kümeleme) ve sütunlara (x aralığı) ayırır
   — düz metin çıktısında Türkçe noktalı harfler (İ, ğ, ş, ı) ayrı
   parçalara bölündüğü ve sütunlar boşluksuz bitiştiği için basit
   satır/regex ayrıştırma güvenilir değildir.
   ============================================================ */

const BASLIK_REGEX = /(AMP|MESEM)\s*-\s*(\d{1,2})\.\s*Sınıf\s*\/\s*([A-ZÇĞİÖŞÜ])\s*Şubesi\s*\(([^)]*)\)/i;

function clusterRows(items, tol) {
  const sorted = items.slice().sort((a, b) => b.y - a.y || a.x - b.x);
  const rows = [];
  let cur = [];
  let curY = null;
  sorted.forEach(it => {
    if (curY === null || Math.abs(it.y - curY) <= tol) {
      cur.push(it);
      curY = curY === null ? it.y : (curY + it.y) / 2;
    } else {
      rows.push(cur);
      cur = [it];
      curY = it.y;
    }
  });
  if (cur.length) rows.push(cur);
  return rows;
}

function rowText(row) {
  return row.slice().sort((a, b) => a.x - b.x).map(it => it.str).join("").replace(/\s+/g, " ").trim();
}

function columnText(row, xMin, xMax) {
  return row.filter(it => it.x >= xMin && it.x < xMax).sort((a, b) => a.x - b.x).map(it => it.str).join("").replace(/\s+/g, " ").trim();
}

function parsePage(items) {
  const rows = clusterRows(items, 3);
  const rowStrings = rows.map(rowText);
  const baslikSatiri = rowStrings.find(s => BASLIK_REGEX.test(s));
  if (!baslikSatiri) return null;
  const m = BASLIK_REGEX.exec(baslikSatiri);
  const program = m[1].toUpperCase();
  const grade = Number(m[2]);
  const sube = m[3].toUpperCase();
  const alanAdi = m[4].trim();
  const sinif = grade + "-" + sube;

  /* e-Okul "Sınıf Listesi" (OOG01001R020) raporu sabit bir sütun düzeni kullanır;
     gerçek örnek dosyalarda ölçülen referans x konumları: */
  const colX = { sNo: 21, okulNo: 64, ad: 156, soyad: 297, cinsiyet: 426, pansiyon: 493 };
  const headerRowIdx = rows.findIndex(r => rowText(r).replace(/\s/g, "").includes("S.NoÖğrenciNo"));
  const bounds = [
    ["sNo", colX.sNo], ["okulNo", colX.okulNo], ["ad", colX.ad],
    ["soyad", colX.soyad], ["cinsiyet", colX.cinsiyet], ["pansiyon", colX.pansiyon]
  ].sort((a, b) => a[1] - b[1]);
  function colRange(key) {
    const idx = bounds.findIndex(b => b[0] === key);
    const lo = idx === 0 ? -1e9 : (bounds[idx - 1][1] + bounds[idx][1]) / 2;
    const hi = idx === bounds.length - 1 ? 1e9 : (bounds[idx][1] + bounds[idx + 1][1]) / 2;
    return [lo, hi];
  }
  const ranges = {};
  ["sNo", "okulNo", "ad", "soyad", "cinsiyet", "pansiyon"].forEach(k => { ranges[k] = colRange(k); });

  const ogrenciler = [];
  const dataStart = headerRowIdx >= 0 ? headerRowIdx + 1 : 0;
  for (let i = dataStart; i < rows.length; i++) {
    const row = rows[i];
    const okulNo = columnText(row, ranges.okulNo[0], ranges.okulNo[1]);
    const cinsiyet = columnText(row, ranges.cinsiyet[0], ranges.cinsiyet[1]);
    if (!/^\d+$/.test(okulNo) || !/^(Erkek|Kız)$/i.test(cinsiyet)) continue;
    const ad = columnText(row, ranges.ad[0], ranges.ad[1]);
    const soyad = columnText(row, ranges.soyad[0], ranges.soyad[1]);
    const pansiyon = columnText(row, ranges.pansiyon[0], ranges.pansiyon[1]);
    if (!ad && !soyad) continue;
    ogrenciler.push({ okulNo, ad, soyad, cinsiyet, pansiyon: pansiyon || "" });
  }
  if (!ogrenciler.length) return null;
  return { program, sinif, grade, sube, alanAdi, ogrenciler };
}

async function parseOgrenciPdf(filePath, pdfParse) {
  const fs = require("fs");
  const buf = fs.readFileSync(filePath);
  const sonuclar = [];
  async function pagerender(pageData) {
    const textContent = await pageData.getTextContent();
    const items = textContent.items
      .filter(it => it.str && it.str.trim() !== "")
      .map(it => ({ str: it.str, x: it.transform[4], y: it.transform[5] }));
    const parsed = parsePage(items);
    if (parsed) sonuclar.push(parsed);
    return "";
  }
  await pdfParse(buf, { pagerender });
  return { siniflar: sonuclar };
}

if (typeof module !== "undefined") module.exports = { parseOgrenciPdf, parsePage };
