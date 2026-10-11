/* ============================================================
   VERİ MODELİ
   ------------------------------------------------------------
   Kural kaynağı: Millî Eğitim Bakanlığı Ortaöğretim Kurumları
   Yönetmeliği, Madde 88 (Koordinatör öğretmen görevlendirilmesi):
   "Bir öğretmene aynı gün için 8 saatten fazla ek ders görevi
   verilmez." Bu nedenle bir öğretmene koordinatörlük (işletme
   ziyareti) günü ayrıca okul dersi eklenmez — o gün tamamen
   koordinatörlüğe ayrılır, sadece 8 saati ücretlendirilir.
   ============================================================ */

const LS_KEY = "aok-sistem-v31";
const VERSIONS_KEY = "aok-versions-v1";
const AKTIF_SURUM_KEY = "aok-aktif-surum-v1";
const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

const KOORD_COURSE_ID = "crs-koordinatorluk";
const KOORD_BLOCK_LEN = 8;  // Madde 88: günde en fazla 8 saat ücretli koordinatörlük
const GROUP_LABELS = { psc: "Pazartesi-Salı-Çarşamba", cpc: "Çarşamba-Perşembe-Cuma", mesem: "Pazartesi-Salı-Perşembe-Cuma (MESEM)" };

const DAL_LABELS = {
  ORTAK9: "9. Sınıf Ortak",
  MBO: "Makine Bakım Onarım",
  BMI: "Bilgisayarlı Makine İmalatı",
  HERDAL: "Tüm Dallar",
  SERT: "Sertifika / Seçmeli",
  ORTAK: "Kültür Dersi",
  IDARI: "İdari Görev"
};

const GRADE_COLORS = {
  9: { bg: "#E8F1FC", ink: "#0D4A82", label: "9. Sınıf" },
  10: { bg: "#EAF5E9", ink: "#1F6B2F", label: "10. Sınıf" },
  11: { bg: "#FBEAF2", ink: "#7A2A4B", label: "11. Sınıf" },
  12: { bg: "#FCF0DC", ink: "#7A4A08", label: "12. Sınıf" },
  0: { bg: "#EEF0F4", ink: "#3C4356", label: "İdari" }
};
function gradeColor(grade) {
  return GRADE_COLORS[grade] !== undefined ? GRADE_COLORS[grade] : GRADE_COLORS[0];
}

function uid(prefix) { return prefix + Math.random().toString(36).slice(2, 9); }

function defaultState() {
  return {
    hoursPerDay: 10,
    rooms: [
      { id: "r1", name: "CAD-CAM Laboratuvarı" },
      { id: "r2", name: "İmalat Yöntemleri Atölyesi" },
      { id: "r3", name: "İmalat İşlemleri Atölyesi" },
      { id: "r4", name: "Derslik" }
    ],
    teachers: [
      { id: "t1", name: "Ali Osman Koç", timeOff: {}, hoursMode: "min", hoursTarget: 20, unvan: "Alan Şefi" },
      { id: "t2", name: "Arzu Kırıcı", timeOff: {}, hoursMode: "min", hoursTarget: 20, unvan: "Laboratuvar Şefi" },
      { id: "t3", name: "Gökhan Arslan", timeOff: {}, hoursMode: "min", hoursTarget: 20, unvan: "İmalat Yöntemleri Atölye Şefi" },
      { id: "t4", name: "Şerif Yetim", timeOff: {}, hoursMode: "min", hoursTarget: 20, unvan: "İmalat İşlemleri Atölye Şefi" },
      { id: "t5", name: "Seyit Ömer Şeker", timeOff: {}, hoursMode: "min", hoursTarget: 20, unvan: "Alan Öğretmeni" },
      { id: "t6", name: "Levent Ergin", timeOff: {}, hoursMode: "exact", hoursTarget: 6, coordEligible: false, unvan: "Teknik Müdür Yardımcısı" }
    ],
    courses: [
      { id: "c9-1", code: "MGA", name: "Mesleki Gelişim Atölyesi", dal: "ORTAK9", grade: 9, hours: 2, blocks: [2] },
      { id: "c9-2", code: "TRS", name: "Teknik Resim", dal: "ORTAK9", grade: 9, hours: 2, blocks: [2] },
      { id: "c9-3", code: "TIİ", name: "Temel İmalat İşlemleri", dal: "ORTAK9", grade: 9, hours: 8, blocks: [4, 4] },
      { id: "c10mbo-1", code: "İYT", name: "İmalat Yöntemleri", dal: "MBO", grade: 10, hours: 6, blocks: [3, 3] },
      { id: "c10mbo-2", code: "BOM", name: "Bakım Onarım Meslek Resmi", dal: "MBO", grade: 10, hours: 3, blocks: [3] },
      { id: "c10mbo-3", code: "ÖLÇ", name: "Ölçme ve Kontrol", dal: "MBO", grade: 10, hours: 2, blocks: [2] },
      { id: "c10mbo-4", code: "MLZ", name: "Malzeme Bilgisi", dal: "MBO", grade: 10, hours: 2, blocks: [2] },
      { id: "c11mbo-1", code: "MBO", name: "Mekanik Bakım Onarım", dal: "MBO", grade: 11, hours: 6, blocks: [3, 3] },
      { id: "c11mbo-2", code: "OKS", name: "Otomatik Kontrol Sistemleri", dal: "MBO", grade: 11, hours: 6, blocks: [3, 3] },
      { id: "c11mbo-3", code: "MKZ", name: "Mekanizmalar", dal: "MBO", grade: 11, hours: 3, blocks: [3] },
      { id: "c11mbo-4", code: "TEL", name: "Temel Elektrik", dal: "MBO", grade: 11, hours: 2, blocks: [2] },
      { id: "sec-3", code: "SEÇ3", name: "Seçmeli Dersler (3 Saat)", dal: "SERT", grade: 12, hours: 3, blocks: [3] },
      { id: "sec-4", code: "SEÇ4", name: "Seçmeli Dersler (4 Saat)", dal: "SERT", grade: 12, hours: 4, blocks: [4] },
      { id: "pbo-10", code: "PBO", name: "Planlama Bakım Onarım (Alan Şefi)", dal: "IDARI", grade: 0, hours: 10, blocks: [10] },
      { id: "pbo-6", code: "PBO", name: "Planlama Bakım Onarım (Atölye Şefi)", dal: "IDARI", grade: 0, hours: 6, blocks: [6] }
    ],
    classes: [
      { id: "cl-9a", name: "9-A", grade: 9, dal: "ORTAK9", maxTeachersPerCourse: 2, assignments: [
        { id: "a-9a-1", courseId: "c9-2", eligibleTeacherIds: ["t1", "t5"], teacherCount: 2, roomIds: [] },
        { id: "a-9a-2", courseId: "c9-3", eligibleTeacherIds: ["t1", "t5"], teacherCount: 2, roomIds: [] },
        { id: "a-9a-3", courseId: "c9-1", eligibleTeacherIds: ["t1", "t5"], teacherCount: 2, roomIds: [] }
      ] },
      { id: "cl-9b", name: "9-B", grade: 9, dal: "ORTAK9", maxTeachersPerCourse: 2, excludeFromDistribution: true, assignments: [] },
      { id: "cl-10a", name: "10-A", grade: 10, dal: "MBO", maxTeachersPerCourse: 3, assignments: [
        { id: "a-10a-1", courseId: "c10mbo-1", eligibleTeacherIds: ["t3", "t2", "t4"], teacherCount: 3, roomIds: [] },
        { id: "a-10a-2", courseId: "c10mbo-2", eligibleTeacherIds: ["t3", "t6"], teacherCount: 2, roomIds: [] },
        { id: "a-10a-3", courseId: "c10mbo-3", eligibleTeacherIds: ["t3", "t2", "t4"], teacherCount: 3, roomIds: [] },
        { id: "a-10a-4", courseId: "c10mbo-4", eligibleTeacherIds: ["t3", "t2", "t4"], teacherCount: 3, roomIds: [] }
      ] },
      { id: "cl-10b", name: "10-B", grade: 10, dal: "MBO", maxTeachersPerCourse: 3, excludeFromDistribution: true, assignments: [] },
      { id: "cl-11a", name: "11-A", grade: 11, dal: "MBO", maxTeachersPerCourse: 2, assignments: [
        { id: "a-11a-1", courseId: "c11mbo-1", eligibleTeacherIds: ["t1", "t5"], teacherCount: 2, roomIds: [] },
        { id: "a-11a-2", courseId: "c11mbo-2", eligibleTeacherIds: ["t2", "t4"], teacherCount: 2, roomIds: [] },
        { id: "a-11a-3", courseId: "c11mbo-3", eligibleTeacherIds: ["t5", "t6"], teacherCount: 2, roomIds: [] },
        { id: "a-11a-4", courseId: "c11mbo-4", eligibleTeacherIds: ["t1", "t5"], teacherCount: 2, roomIds: [] }
      ] },
      { id: "cl-11b", name: "11-B", grade: 11, dal: "MBO", maxTeachersPerCourse: 2, excludeFromDistribution: true, assignments: [] },
      { id: "cl-12a", name: "12-A", grade: 12, dal: "MBO", schoolDays: [], maxTeachersPerCourse: 2, assignments: [
        { id: "a-12a-1", courseId: "sec-3", eligibleTeacherIds: ["t3", "t2"], teacherCount: 2, roomIds: [] },
        { id: "a-12a-2", courseId: "sec-4", eligibleTeacherIds: ["t2", "t4"], teacherCount: 2, roomIds: [] }
      ] },
      { id: "cl-12b", name: "12-B", grade: 12, dal: "BMI", schoolDays: [], maxTeachersPerCourse: 1, assignments: [
        { id: "a-12b-1", courseId: "sec-3", eligibleTeacherIds: ["t3"], teacherCount: 1, roomIds: [] },
        { id: "a-12b-2", courseId: "sec-4", eligibleTeacherIds: ["t3"], teacherCount: 1, roomIds: [] }
      ] },
      { id: "cl-idari", name: "İdari Görevler (Alan/Atölye Şefliği)", grade: 0, dal: "IDARI", schoolDays: [0, 1, 2, 3, 4], assignments: [
        { id: "a-idari-1", courseId: "pbo-10", eligibleTeacherIds: ["t1"], teacherCount: 1, roomIds: [] },
        { id: "a-idari-2", courseId: "pbo-6", eligibleTeacherIds: ["t2"], teacherCount: 1, roomIds: [] },
        { id: "a-idari-3", courseId: "pbo-6", eligibleTeacherIds: ["t4"], teacherCount: 1, roomIds: [] },
        { id: "a-idari-4", courseId: "pbo-6", eligibleTeacherIds: ["t3"], teacherCount: 1, roomIds: [] }
      ] }
    ],
    schedule: {},
    blockedSlots: {},
    teacherBlockedSlots: {},
    coordAssignments: [],
    isletmeler: [],
    isletmeTeacherAssign: {},
    students: [],
    akademikTakvim: null,
    yillikPlanlar: [],
    gunlukPlanlar: [],
    normKadro: { ogrenciSayilari: {}, koordinatorlukSatirlari: [] },
    toplantilar: [],
    envanter: { makineler: [] },
    durumTespitFormlari: [],
    performansKayitlari: [],
    performansAgirliklari: { dersici: [10, 10, 10, 10, 10, 30, 10, 10], odev: [10, 10, 10, 10, 10, 30, 10, 10] },
    donemRaporlari: { dersKesim: [], yaziliTeslim: [] },
    sinavHavuzu: { sorular: [] },
    sinavKagitlari: [],
    imzaSirkuleri: [],
    kalfalikUstalik: { kayitlar: [] },
    beceriSinavi: { kayitlar: [] },
    ogrenciListesi: [],
    seflikRaporlari: [],
    sinavNotlari: [],
    performansNotlari: [],
    donemArsivi: [],
    sinavTutanaklari: [],
    adayGelmediTutanaklari: [],
    beceriSinavKagitlari: [],
    kurumBilgileri: {
      okulAdi: "Soma Mesleki ve Teknik Anadolu Lisesi",
      sehir: "SOMA",
      alanAdi: "Makine Teknolojisi Alanı",
      mudurAdi: "Ahmet Açar",
      alanSefiAdi: "Ali Osman Koç",
      alanSefiUnvani: "Makine Teknolojisi Alan Şefi",
      logo: YILLIK_PLAN_OKUL_LOGO_VARSAYILAN,
      mebLogo: YILLIK_PLAN_MEB_LOGO_VARSAYILAN
    }
  };
}

function emptyState() {
  return {
    hoursPerDay: 10,
    rooms: [],
    courses: [],
    teachers: [],
    classes: [],
    schedule: {},
    blockedSlots: {},
    teacherBlockedSlots: {},
    coordAssignments: [],
    isletmeler: [],
    isletmeTeacherAssign: {},
    students: [],
    akademikTakvim: null,
    yillikPlanlar: [],
    gunlukPlanlar: [],
    normKadro: { ogrenciSayilari: {}, koordinatorlukSatirlari: [] },
    toplantilar: [],
    envanter: { makineler: [] },
    durumTespitFormlari: [],
    performansKayitlari: [],
    performansAgirliklari: { dersici: [10, 10, 10, 10, 10, 30, 10, 10], odev: [10, 10, 10, 10, 10, 30, 10, 10] },
    donemRaporlari: { dersKesim: [], yaziliTeslim: [] },
    sinavHavuzu: { sorular: [] },
    sinavKagitlari: [],
    imzaSirkuleri: [],
    kalfalikUstalik: { kayitlar: [] },
    beceriSinavi: { kayitlar: [] },
    ogrenciListesi: [],
    seflikRaporlari: [],
    sinavNotlari: [],
    performansNotlari: [],
    donemArsivi: [],
    sinavTutanaklari: [],
    adayGelmediTutanaklari: [],
    beceriSinavKagitlari: [],
    kurumBilgileri: {
      okulAdi: "Soma Mesleki ve Teknik Anadolu Lisesi",
      sehir: "SOMA",
      alanAdi: "Makine Teknolojisi Alanı",
      mudurAdi: "Ahmet Açar",
      alanSefiAdi: "Ali Osman Koç",
      alanSefiUnvani: "Makine Teknolojisi Alan Şefi",
      logo: YILLIK_PLAN_OKUL_LOGO_VARSAYILAN,
      mebLogo: YILLIK_PLAN_MEB_LOGO_VARSAYILAN
    }
  };
}

/* Bir kerelik geçiş yardımcısı: eski tek-toplam puanı, "en büyük kalan"
   yöntemiyle ağırlık oranında kriterlere dağıtır (views.js'teki
   performansPuanlariDagit ile aynı algoritma). */
function performansMigrasyonDagit(toplam, weights) {
  const total = Math.max(0, Math.min(100, Math.round(Number(toplam) || 0)));
  const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;
  const exact = weights.map(w => total * w / totalWeight);
  const result = exact.map(Math.floor);
  let kalan = total - result.reduce((a, b) => a + b, 0);
  const siraliIndeksler = weights.map((w, i) => i).sort((a, b) => (exact[b] - result[b]) - (exact[a] - result[a]));
  for (let i = 0; i < kalan; i++) result[siraliIndeksler[i % siraliIndeksler.length]] += 1;
  return result;
}

function normalizeState(s) {
  s.hoursPerDay = 10;
  if (!s.schedule || typeof s.schedule !== "object") s.schedule = {};
  // Ders Programı — "Program 1/2/3..." adlı birden fazla ders dağıtım
  // denemesi tutulabilsin diye: öğretmen/sınıf/ders havuzu/koordinatörlük
  // HEP ORTAK kalır, sadece S.schedule'ın kendisi program başına ayrı
  // saklanır. S.schedule her zaman aktif programın canlı çalışma kopyasıdır;
  // save() her seferinde onu aktif programın içine senkronize eder.
  if (!Array.isArray(s.schedulePrograms) || s.schedulePrograms.length === 0) {
    const id = uid("prog");
    s.schedulePrograms = [{ id, name: "Program 1", schedule: JSON.parse(JSON.stringify(s.schedule)) }];
    s.activeScheduleProgramId = id;
  }
  if (!s.activeScheduleProgramId || !s.schedulePrograms.some(p => p.id === s.activeScheduleProgramId)) {
    s.activeScheduleProgramId = s.schedulePrograms[0].id;
  }
  if (!s.blockedSlots) s.blockedSlots = {};
  if (!s.teacherBlockedSlots) s.teacherBlockedSlots = {};
  if (!s.coordAssignments) s.coordAssignments = [];
  if (!s.isletmeler) s.isletmeler = [];
  s.isletmeler.forEach(isl => {
    if (!isl.kontenjanlar || typeof isl.kontenjanlar !== "object") isl.kontenjanlar = {};
    if (typeof isl.talep !== "string") isl.talep = "";
  });
  if (!s.isletmeTeacherAssign) s.isletmeTeacherAssign = {};
  if (!Array.isArray(s.students)) s.students = [];
  s.students.forEach(st => {
    if (typeof st.not !== "string") st.not = st.not !== undefined && st.not !== null ? String(st.not) : "";
    if (typeof st.tercihler !== "string") st.tercihler = "";
    if (typeof st.istemiyor !== "string") st.istemiyor = "";
    if (typeof st.yerlestirmeSirasi !== "string") st.yerlestirmeSirasi = "";
  });
  if (typeof s.eskiSistemKaldirildi !== "boolean") s.eskiSistemKaldirildi = false;
  if (s.akademikTakvim === undefined) s.akademikTakvim = null;
  if (s.akademikTakvim && (!s.akademikTakvim.sinavTarihleri || typeof s.akademikTakvim.sinavTarihleri !== "object")) {
    s.akademikTakvim.sinavTarihleri = { d1s1: "", d1s2: "", d2s1: "", d2s2: "" };
  }
  if (s.akademikTakvim) {
    const st = s.akademikTakvim.sinavTarihleri;
    if (typeof st.d1pt !== "string") st.d1pt = "";
    if (typeof st.d2pt !== "string") st.d2pt = "";
  }
  if (s.akademikTakvim && (!s.akademikTakvim.onemliGunler || typeof s.akademikTakvim.onemliGunler !== "object")) {
    s.akademikTakvim.onemliGunler = { d1: [], d2: [] };
  }
  if (s.akademikTakvim) {
    const og = s.akademikTakvim.onemliGunler;
    if (!Array.isArray(og.d1)) og.d1 = [];
    if (!Array.isArray(og.d2)) og.d2 = [];
    while (og.d1.length < 6) og.d1.push("");
    while (og.d2.length < 6) og.d2.push("");
  }
  if (s.akademikTakvim && !Array.isArray(s.akademikTakvim.haftalar)) s.akademikTakvim.haftalar = [];
  if (!Array.isArray(s.yillikPlanlar)) s.yillikPlanlar = [];
  if (!Array.isArray(s.gunlukPlanlar)) s.gunlukPlanlar = [];
  // Kullanıcının kendi YILLIK_PLANLAR.xlsx dosyasından bir kez ayrıştırılıp
  // uygulamaya gömülmüş varsayılan Çalışma Yılı + ders planları — sadece bu
  // alanlar daha önce hiç doldurulmamışsa (ilk açılışta) otomatik yüklenir;
  // kullanıcı isterse "Excel Yükle" ile kendi güncel dosyasıyla üzerine yazar.
  if (!s.seededYillikPlanIcerik) {
    s.seededYillikPlanIcerik = true;
    const varsayilan = (typeof YILLIK_PLAN_VARSAYILAN_ICERIK !== "undefined") ? YILLIK_PLAN_VARSAYILAN_ICERIK : null;
    if (varsayilan) {
      if (varsayilan.takvim && (!s.akademikTakvim || !s.akademikTakvim.ogretimYili)) {
        s.akademikTakvim = JSON.parse(JSON.stringify(varsayilan.takvim));
      }
      (varsayilan.yillikPlanlar || []).forEach(p => {
        const varMi = s.yillikPlanlar.some(x =>
          (x.ders || "").toLocaleLowerCase("tr-TR") === p.ders.toLocaleLowerCase("tr-TR") &&
          (x.sinif || "").toLocaleLowerCase("tr-TR") === p.sinif.toLocaleLowerCase("tr-TR"));
        if (!varMi) s.yillikPlanlar.push(Object.assign({ id: uid("yp") }, JSON.parse(JSON.stringify(p))));
      });
    }
  }
  s.yillikPlanlar.forEach(p => {
    if (!p.id) p.id = uid("yp");
    // Eski sürümde her yıllık plan kendi "haftalar" dizisini (tarihi de içeren,
    // bağımsız bir kopya) tutuyordu. Artık tarih/tatil bilgisi HER ZAMAN
    // S.akademikTakvim.haftalar'dan canlı okunuyor (Çalışma Yılı'nda bir
    // tarih değişince bütün ders sayfaları otomatik güncellensin diye);
    // her plan sadece o haftanın içeriğini (kazanım/konu/yöntem/araç/
    // değerlendirme) hafta NUMARASINA göre saklıyor. Eski verideki tarihi,
    // akademik takvimdeki aynı tarih aralığına sahip haftanın numarasıyla
    // eşleştirip içeriği oraya taşıyoruz; eşleşme bulunamazsa sıradaki
    // numarayı kullanırız — içerik hiçbir durumda kaybolmaz.
    if (!p.haftaIcerik || typeof p.haftaIcerik !== "object") {
      p.haftaIcerik = {};
      if (Array.isArray(p.haftalar)) {
        const takvimHaftalari = (s.akademikTakvim && Array.isArray(s.akademikTakvim.haftalar)) ? s.akademikTakvim.haftalar : [];
        p.haftalar.forEach((h, i) => {
          const hasContent = h.kazanimlar || h.konular || h.yontem || h.arac || h.degerlendirme;
          if (!hasContent) return;
          const eslesen = takvimHaftalari.find(tk => tk.tarihAraligi && tk.tarihAraligi === h.tarih);
          const no = eslesen ? eslesen.no : (i + 1);
          p.haftaIcerik[no] = {
            kazanimlar: h.kazanimlar || "", konular: h.konular || "",
            yontem: h.yontem || "", arac: h.arac || "", degerlendirme: h.degerlendirme || ""
          };
        });
      }
    }
    delete p.haftalar;
    // Excel İndir artık kullanıcının orijinal YILLIK_PLANLAR.xlsx dosyasını
    // şablon olarak kullanıp sadece değişen hücreleri güncelliyor — bunun
    // için hangi sayfadan geldiğini bilmesi gerekiyor. Daha önce (bu alan
    // eklenmeden önce) içe aktarılmış planlarda eksikse, gömülü varsayılan
    // içerikten ders+sınıf eşleşmesiyle geriye dönük tamamlanıyor.
    if (typeof p.kaynakSayfaAdi !== "string") {
      const varsayilan = (typeof YILLIK_PLAN_VARSAYILAN_ICERIK !== "undefined") ? YILLIK_PLAN_VARSAYILAN_ICERIK : null;
      const eslesen = varsayilan && (varsayilan.yillikPlanlar || []).find(v =>
        (v.ders || "").toLocaleLowerCase("tr-TR") === (p.ders || "").toLocaleLowerCase("tr-TR") &&
        (v.sinif || "").toLocaleLowerCase("tr-TR") === (p.sinif || "").toLocaleLowerCase("tr-TR"));
      p.kaynakSayfaAdi = (eslesen && eslesen.kaynakSayfaAdi) || "";
    }
  });
  // Kullanıcının kendi GÜNLÜK_PLANLAR.xlsx dosyasından bir kez ayrıştırılıp
  // gömülmüş varsayılan içerik — Yıllık Plan'la aynı mantık, sadece bu
  // alanlar daha önce hiç doldurulmamışsa otomatik yüklenir. Takvim Yıllık
  // Plan'la ortak (S.akademikTakvim) olduğu için burada tekrar yazılmıyor.
  if (!s.seededGunlukPlanIcerik) {
    s.seededGunlukPlanIcerik = true;
    const varsayilan = (typeof GUNLUK_PLAN_VARSAYILAN_ICERIK !== "undefined") ? GUNLUK_PLAN_VARSAYILAN_ICERIK : null;
    if (varsayilan) {
      (varsayilan.gunlukPlanlar || []).forEach(p => {
        const varMi = s.gunlukPlanlar.some(x =>
          (x.ders || "").toLocaleLowerCase("tr-TR") === p.ders.toLocaleLowerCase("tr-TR") &&
          (x.sinif || "").toLocaleLowerCase("tr-TR") === p.sinif.toLocaleLowerCase("tr-TR"));
        if (!varMi) s.gunlukPlanlar.push(Object.assign({ id: uid("gp") }, JSON.parse(JSON.stringify(p))));
      });
    }
  }
  s.gunlukPlanlar.forEach(p => {
    if (!p.id) p.id = uid("gp");
    // Eski sürümde her günlük plan "kayitlar" adında, tarihi elle girilen
    // bağımsız bir dizi tutuyordu. Artık Yıllık Plan'daki gibi tarih HER
    // ZAMAN S.akademikTakvim.haftalar + dersGunu'ndan canlı hesaplanıyor;
    // içerik hafta NUMARASINA göre saklanıyor. Eski kayıtlar sırayla
    // (1. kayıt = 1. hafta) yeni yapıya taşınıyor — içerik kaybolmuyor.
    if (!p.haftaIcerik || typeof p.haftaIcerik !== "object") {
      p.haftaIcerik = {};
      if (Array.isArray(p.kayitlar)) {
        p.kayitlar.forEach((k, i) => {
          const hasContent = k.konu || k.kazanim || k.giris || k.gelisme || k.sonuc || k.yontem || k.arac || k.olcme;
          if (!hasContent) return;
          p.haftaIcerik[i + 1] = {
            konu: k.konu || "", kazanim: k.kazanim || "", giris: k.giris || "", gelisme: k.gelisme || "",
            sonuc: k.sonuc || "", yontem: k.yontem || "", arac: k.arac || "", olcme: k.olcme || ""
          };
        });
      }
    }
    delete p.kayitlar;
    if (typeof p.dersGunu !== "string") p.dersGunu = "";
    // Excel İndir de Yıllık Plan gibi kullanıcının orijinal dosyasını şablon
    // olarak kullanıyor — hangi sayfadan geldiğini bilmesi gerekiyor.
    if (typeof p.kaynakSayfaAdi !== "string") {
      const varsayilan = (typeof GUNLUK_PLAN_VARSAYILAN_ICERIK !== "undefined") ? GUNLUK_PLAN_VARSAYILAN_ICERIK : null;
      const eslesen = varsayilan && (varsayilan.gunlukPlanlar || []).find(v =>
        (v.ders || "").toLocaleLowerCase("tr-TR") === (p.ders || "").toLocaleLowerCase("tr-TR") &&
        (v.sinif || "").toLocaleLowerCase("tr-TR") === (p.sinif || "").toLocaleLowerCase("tr-TR"));
      p.kaynakSayfaAdi = (eslesen && eslesen.kaynakSayfaAdi) || "";
    }
  });
  // Günlük Plan, her haftanın Pazartesi tarihine (+ seçilen Ders Günü'ne)
  // göre kendi tarihini hesaplıyor. Yıllık Plan'ın kendi Excel'inden içe
  // aktarılan haftalarda bu sütun hiç yoktu (sadece "Tarih Aralığı" metni
  // vardı) — eksikse, öğretim yılının başlangıcından (aynı MEB kuralıyla:
  // 14 Eylül'e en yakın Pazartesi) hesaplayıp geriye dönük tamamlıyoruz.
  if (s.akademikTakvim && s.akademikTakvim.ogretimYili && Array.isArray(s.akademikTakvim.haftalar)
    && s.akademikTakvim.haftalar.some(h => !h.pazartesi) && typeof ogretimYiliBaslangicPazartesi === "function") {
    const baslangic = ogretimYiliBaslangicPazartesi(s.akademikTakvim.ogretimYili);
    if (baslangic) {
      s.akademikTakvim.haftalar.forEach(h => {
        if (h.pazartesi) return;
        const pzt = new Date(baslangic);
        pzt.setDate(pzt.getDate() + (h.no - 1) * 7);
        h.pazartesi = formatTrTarih(pzt);
      });
    }
  }
  // MEB reformu kademeli: 9. sınıflar "Maarif Model" sanılıp otomatik o
  // sisteme atanıyordu, ama bu henüz gerçek yeni müfredat içeriği değil —
  // mevcut/eski plan verisiydi. Bir kereliğine bütün planları "Eski
  // Sistem"e geri alıyoruz; kullanıcı gerçek Maarif Model planlarını
  // hazırladığında ilgili sekmedeyken elle ekleyip/yükleyecek.
  if (!s.eskiSistemeYenidenSiniflandirildi) {
    s.eskiSistemeYenidenSiniflandirildi = true;
    s.yillikPlanlar.forEach(p => { if (p.sistem === "maarif") p.sistem = "eski"; });
    s.gunlukPlanlar.forEach(p => { if (p.sistem === "maarif") p.sistem = "eski"; });
  }
  if (!s.normKadro || typeof s.normKadro !== "object") s.normKadro = {};
  if (!s.normKadro.ogrenciSayilari || typeof s.normKadro.ogrenciSayilari !== "object") s.normKadro.ogrenciSayilari = {};
  if (!Array.isArray(s.normKadro.koordinatorlukSatirlari)) s.normKadro.koordinatorlukSatirlari = [];
  s.normKadro.koordinatorlukSatirlari.forEach(r => {
    if (typeof r.grupSayisi !== "number" || r.grupSayisi < 1) r.grupSayisi = 1;
  });
  if (typeof s.normKadro.normKadroSayisi !== "string") s.normKadro.normKadroSayisi = "";
  if (!Array.isArray(s.toplantilar)) s.toplantilar = [];
  s.toplantilar.forEach(top => {
    if (!top.id) top.id = uid("top");
    if (!Array.isArray(top.katilimcilar)) top.katilimcilar = [];
    if (!Array.isArray(top.gorevDagilimi)) top.gorevDagilimi = [];
    if (!Array.isArray(top.gundemMaddeleri)) top.gundemMaddeleri = [];
  });
  if (!s.envanter || typeof s.envanter !== "object") s.envanter = {};
  if (!Array.isArray(s.envanter.makineler)) s.envanter.makineler = [];
  s.envanter.makineler.forEach(m => {
    if (!m.id) m.id = uid("mk");
    if (!Array.isArray(m.arizaKayitlari)) m.arizaKayitlari = [];
    if (!Array.isArray(m.onarimKayitlari)) m.onarimKayitlari = [];
    if (!Array.isArray(m.bakimKayitlari)) m.bakimKayitlari = [];
    if (!Array.isArray(m.yedekParcalar)) m.yedekParcalar = [];
    if (!m.talimat || typeof m.talimat !== "object") m.talimat = {};
    ["teknik", "hazirlik", "calistirma", "guvenlik", "bakim", "sikSorular", "acilDurum"].forEach(f => {
      if (typeof m.talimat[f] !== "string") m.talimat[f] = "";
    });
  });
  if (!Array.isArray(s.durumTespitFormlari)) s.durumTespitFormlari = [];
  s.durumTespitFormlari.forEach(f => {
    if (!f.id) f.id = uid("dtf");
    if (!Array.isArray(f.satirlar)) f.satirlar = [];
    f.satirlar.forEach(r => { if (!r.id) r.id = uid("dtr"); });
  });
  if (!s.performansAgirliklari || typeof s.performansAgirliklari !== "object") s.performansAgirliklari = {};
  ["dersici", "odev"].forEach(tur => {
    const arr = s.performansAgirliklari[tur];
    if (!Array.isArray(arr) || arr.length !== 8 || arr.some(v => typeof v !== "number")) {
      s.performansAgirliklari[tur] = [10, 10, 10, 10, 10, 30, 10, 10];
    }
  });
  if (!Array.isArray(s.performansKayitlari)) s.performansKayitlari = [];
  s.performansKayitlari.forEach(k => {
    if (!k.id) k.id = uid("pf");
    if (k.tur !== "odev") k.tur = "dersici";
    if (!Array.isArray(k.ogrenciler)) k.ogrenciler = [];
    const weights = s.performansAgirliklari[k.tur];
    k.ogrenciler.forEach(o => {
      if (!o.id) o.id = uid("og");
      /* Eski sürümde tek bir Toplam Puan girilip kriterlere ağırlık
         oranında otomatik dağıtılıyordu; gerçek MEB çizelgesinde her
         kriter ayrı ayrı puanlanıyor. Var olan kayıtlar, aynı dağıtım
         algoritmasıyla bir kerelik kriter puanlarına çevrilir — sonrası
         için puanlar doğrudan kriter bazında girilir. */
      if (!Array.isArray(o.puanlar) || o.puanlar.length !== 8) {
        const eskiToplam = typeof o.toplamPuan === "number" ? o.toplamPuan : (Number(o.toplamPuan) || 0);
        o.puanlar = eskiToplam > 0 ? performansMigrasyonDagit(eskiToplam, weights) : new Array(8).fill(0);
      }
      o.puanlar = o.puanlar.map((v, i) => Math.max(0, Math.min(weights[i], Math.round(Number(v) || 0))));
      delete o.toplamPuan;
    });
  });
  if (!s.donemRaporlari || typeof s.donemRaporlari !== "object") s.donemRaporlari = {};
  if (!Array.isArray(s.donemRaporlari.dersKesim)) s.donemRaporlari.dersKesim = [];
  if (!Array.isArray(s.donemRaporlari.yaziliTeslim)) s.donemRaporlari.yaziliTeslim = [];
  s.donemRaporlari.dersKesim.forEach(r => {
    if (!r.id) r.id = uid("dk");
    if (!Array.isArray(r.satirlar)) r.satirlar = [];
    r.satirlar.forEach(x => { if (!x.id) x.id = uid("dkr"); });
  });
  s.donemRaporlari.yaziliTeslim.forEach(r => {
    if (!r.id) r.id = uid("yt");
    if (!Array.isArray(r.satirlar)) r.satirlar = [];
    r.satirlar.forEach(x => { if (!x.id) x.id = uid("ytr"); });
  });
  if (!s.sinavHavuzu || typeof s.sinavHavuzu !== "object") s.sinavHavuzu = {};
  if (!Array.isArray(s.sinavHavuzu.sorular)) s.sinavHavuzu.sorular = [];
  s.sinavHavuzu.sorular.forEach(q => {
    if (!q.id) q.id = uid("sr");
    if (!Array.isArray(q.secenekler)) q.secenekler = [];
    q.secenekler.forEach(o => { if (!o.id) o.id = uid("sc"); });
    if (typeof q.puan !== "number") q.puan = Number(q.puan) || 10;
  });
  if (!Array.isArray(s.sinavKagitlari)) s.sinavKagitlari = [];
  s.sinavKagitlari.forEach(k => {
    if (!k.id) k.id = uid("sk");
    if (!Array.isArray(k.soruIdleri)) k.soruIdleri = [];
  });
  if (!Array.isArray(s.imzaSirkuleri)) s.imzaSirkuleri = [];
  s.imzaSirkuleri.forEach(k => { if (!k.id) k.id = uid("imza"); });
  function normalizeSinavKayitListesi(liste, prefix) {
    if (!Array.isArray(liste)) return [];
    liste.forEach(k => {
      if (!k.id) k.id = uid(prefix);
      if (typeof k.ogrenciNo !== "string") k.ogrenciNo = String(k.ogrenciNo || "");
      if (typeof k.ad !== "string") k.ad = "";
      if (typeof k.soyad !== "string") k.soyad = "";
      if (typeof k.kod !== "string") k.kod = "";
      if (!k.d1 || typeof k.d1 !== "object") k.d1 = {};
      if (!k.d2 || typeof k.d2 !== "object") k.d2 = {};
      ["t1", "t2", "ih1", "ih2", "proje", "deney"].forEach(f => {
        if (typeof k.d1[f] !== "string" && typeof k.d1[f] !== "number") k.d1[f] = "";
        if (typeof k.d2[f] !== "string" && typeof k.d2[f] !== "number") k.d2[f] = "";
      });
      if (!k.isDosyasi || typeof k.isDosyasi !== "object") k.isDosyasi = {};
      ["k1", "k2", "k3", "k4"].forEach(f => {
        if (typeof k.isDosyasi[f] !== "string" && typeof k.isDosyasi[f] !== "number") k.isDosyasi[f] = "";
      });
      if (typeof k.isDosyasiTeslimEtmedi !== "boolean") k.isDosyasiTeslimEtmedi = false;
      if (typeof k.sinavPuani !== "string" && typeof k.sinavPuani !== "number") k.sinavPuani = "";
      if (typeof k.aciklama !== "string") k.aciklama = "";
      if (typeof k.tckn !== "string") k.tckn = "";
      if (typeof k.kagitAdedi !== "string") k.kagitAdedi = "";
      ["degerlendirici1", "degerlendirici2", "degerlendirici3"].forEach(f => {
        if (typeof k[f] !== "string" && typeof k[f] !== "number") k[f] = "";
      });
      if (typeof k.isletmeAdi !== "string") k.isletmeAdi = "";
      if (typeof k.isletmeTel !== "string") k.isletmeTel = "";
      if (typeof k.isletmeEmail !== "string") k.isletmeEmail = "";
      if (typeof k.telafiEgitimPuani !== "string" && typeof k.telafiEgitimPuani !== "number") k.telafiEgitimPuani = "";
      if (typeof k.beceriYarismaPuani !== "string" && typeof k.beceriYarismaPuani !== "number") k.beceriYarismaPuani = "";
    });
    return liste;
  }
  if (!s.kalfalikUstalik || typeof s.kalfalikUstalik !== "object") s.kalfalikUstalik = { kayitlar: [] };
  s.kalfalikUstalik.kayitlar = normalizeSinavKayitListesi(s.kalfalikUstalik.kayitlar, "ku").map(k => {
    if (k.tur !== "kalfalik" && k.tur !== "ustalik") k.tur = "kalfalik";
    if (typeof k.dal !== "string" || !k.dal) k.dal = "MBO";
    return k;
  });
  if (!s.beceriSinavi || typeof s.beceriSinavi !== "object") s.beceriSinavi = { kayitlar: [] };
  s.beceriSinavi.kayitlar = normalizeSinavKayitListesi(s.beceriSinavi.kayitlar, "bs").map(k => {
    if (typeof k.sinif !== "string" || !k.sinif) k.sinif = "12-A";
    if (typeof k.dal !== "string" || !k.dal) k.dal = "MBO";
    return k;
  });
  if (!Array.isArray(s.ogrenciListesi)) s.ogrenciListesi = [];
  s.ogrenciListesi.forEach(o => {
    if (!o.id) o.id = uid("og");
    if (typeof o.sinif !== "string") o.sinif = "";
    if (typeof o.okulNo !== "string") o.okulNo = String(o.okulNo || "");
    if (typeof o.ad !== "string") o.ad = "";
    if (typeof o.soyad !== "string") o.soyad = "";
    if (typeof o.cinsiyet !== "string") o.cinsiyet = "";
    if (typeof o.pansiyon !== "string") o.pansiyon = "";
  });
  if (!Array.isArray(s.seflikRaporlari)) s.seflikRaporlari = [];
  s.seflikRaporlari.forEach(r => {
    if (!r.id) r.id = uid("sr");
    if (typeof r.ay !== "string") r.ay = "";
    if (!Array.isArray(r.kayitlar)) r.kayitlar = [];
    r.kayitlar.forEach(k => {
      if (!k.id) k.id = uid("srk");
      if (typeof k.tarih !== "string") k.tarih = "";
      if (typeof k.gun !== "string") k.gun = "";
      if (typeof k.saat !== "string" && typeof k.saat !== "number") k.saat = "";
      if (typeof k.isler !== "string") k.isler = "";
    });
  });
  if (!Array.isArray(s.sinavNotlari)) s.sinavNotlari = [];
  s.sinavNotlari.forEach(n => {
    if (!n.id) n.id = uid("sn");
    if (typeof n.sinif !== "string") n.sinif = "";
    if (typeof n.ders !== "string") n.ders = "";
    if (n.donem !== "1" && n.donem !== "2") n.donem = "1";
    if (typeof n.uygulamaSinaviVarMi !== "boolean") n.uygulamaSinaviVarMi = true;
    if (!Array.isArray(n.kayitlar)) n.kayitlar = [];
    n.kayitlar.forEach(k => {
      if (!k.id) k.id = uid("snk");
      if (typeof k.okulNo !== "string") k.okulNo = String(k.okulNo || "");
      if (typeof k.ad !== "string") k.ad = "";
      if (typeof k.sinav1 !== "string") k.sinav1 = String(k.sinav1 !== undefined ? k.sinav1 : "");
      if (typeof k.sinav2 !== "string") k.sinav2 = String(k.sinav2 !== undefined ? k.sinav2 : "");
      if (typeof k.uygulama !== "string") k.uygulama = String(k.uygulama !== undefined ? k.uygulama : "");
      if (typeof k.grup !== "string" || !k.grup) k.grup = "1";
    });
  });
  if (!Array.isArray(s.performansNotlari)) s.performansNotlari = [];
  s.performansNotlari.forEach(n => {
    if (!n.id) n.id = uid("pn");
    if (typeof n.sinif !== "string") n.sinif = "";
    if (typeof n.ders !== "string") n.ders = "";
    if (n.donem !== "1" && n.donem !== "2") n.donem = "1";
    if (typeof n.perf1Sayisi !== "number") n.perf1Sayisi = 3;
    if (typeof n.perf2Sayisi !== "number") n.perf2Sayisi = 3;
    if (!Array.isArray(n.kayitlar)) n.kayitlar = [];
    n.kayitlar.forEach(k => {
      if (!k.id) k.id = uid("pnk");
      if (typeof k.okulNo !== "string") k.okulNo = String(k.okulNo || "");
      if (typeof k.ad !== "string") k.ad = "";
      if (!Array.isArray(k.perf1)) k.perf1 = [];
      if (!Array.isArray(k.perf2)) k.perf2 = [];
      while (k.perf1.length < n.perf1Sayisi) k.perf1.push("");
      while (k.perf2.length < n.perf2Sayisi) k.perf2.push("");
      k.perf1 = k.perf1.slice(0, n.perf1Sayisi).map(v => String(v !== undefined && v !== null ? v : ""));
      k.perf2 = k.perf2.slice(0, n.perf2Sayisi).map(v => String(v !== undefined && v !== null ? v : ""));
      if (typeof k.grup !== "string" || !k.grup) k.grup = "1";
    });
  });
  if (!Array.isArray(s.donemArsivi)) s.donemArsivi = [];
  s.donemArsivi.forEach(a => {
    if (!a.id) a.id = uid("da");
    if (typeof a.etiket !== "string") a.etiket = "";
    if (typeof a.tarih !== "string") a.tarih = "";
    if (!a.veri || typeof a.veri !== "object") a.veri = {};
  });
  if (!Array.isArray(s.sinavTutanaklari)) s.sinavTutanaklari = [];
  s.sinavTutanaklari.forEach(t => {
    if (!t.id) t.id = uid("st");
    ["kind", "tur", "dal", "sinif", "ogretimYili", "sinavDonemi", "sinavTarihi", "dersinAdi",
      "komisyonToplanmaSaati", "hazirlikSaati", "sinavBaslamaSaati", "katilmayanSayisi",
      "kullanilanKagitSayisi", "sinavBitisSaati", "degerlendirmeTarihSaati"].forEach(f => {
      if (typeof t[f] !== "string") t[f] = "";
    });
  });
  if (!Array.isArray(s.adayGelmediTutanaklari)) s.adayGelmediTutanaklari = [];
  s.adayGelmediTutanaklari.forEach(t => {
    if (!t.id) t.id = uid("agt");
    ["kind", "tur", "dal", "sinif", "ogretimYili", "sinavDonemi", "sinavTarihi", "dersinAdi",
      "sinavCesidi", "toplanmaTarihi", "toplanmaGunu", "toplanmaSaati", "beklemeSaati"].forEach(f => {
      if (typeof t[f] !== "string") t[f] = "";
    });
  });
  if (!Array.isArray(s.beceriSinavKagitlari)) s.beceriSinavKagitlari = [];
  s.beceriSinavKagitlari.forEach(sk => {
    if (!sk.id) sk.id = uid("bsk");
    ["kind", "tur", "dal", "sinif", "soruMetni"].forEach(f => {
      if (typeof sk[f] !== "string") sk[f] = "";
    });
    if (!Array.isArray(sk.unsurlar)) sk.unsurlar = [];
    sk.unsurlar.forEach(u => {
      if (!u.id) u.id = uid("bsu");
      if (typeof u.ad !== "string") u.ad = "";
      if (typeof u.puan !== "string" && typeof u.puan !== "number") u.puan = "";
    });
  });
  if (!s.kurumBilgileri || typeof s.kurumBilgileri !== "object") s.kurumBilgileri = {};
  {
    const kb = s.kurumBilgileri;
    if (typeof kb.okulAdi !== "string" || !kb.okulAdi) kb.okulAdi = "Soma Mesleki ve Teknik Anadolu Lisesi";
    if (typeof kb.sehir !== "string" || !kb.sehir) kb.sehir = "SOMA";
    if (typeof kb.alanAdi !== "string" || !kb.alanAdi) kb.alanAdi = "Makine Teknolojisi Alanı";
    if (typeof kb.mudurAdi !== "string") kb.mudurAdi = "";
    if (typeof kb.alanSefiAdi !== "string") kb.alanSefiAdi = "";
    if (typeof kb.alanSefiUnvani !== "string") kb.alanSefiUnvani = "";
    if (typeof kb.logo !== "string") kb.logo = null;
    if (typeof kb.mebLogo !== "string") kb.mebLogo = null;
  }
  if (!s.seededYillikPlanLogolari) {
    s.seededYillikPlanLogolari = true;
    if (!s.kurumBilgileri.logo) s.kurumBilgileri.logo = YILLIK_PLAN_OKUL_LOGO_VARSAYILAN;
    if (!s.kurumBilgileri.mebLogo) s.kurumBilgileri.mebLogo = YILLIK_PLAN_MEB_LOGO_VARSAYILAN;
  }
  if (!s.seededIsletmeler2026) {
    s.seededIsletmeler2026 = true;
    const seed = [
      ["TKİ Ege Linyitleri İşletmesi Müdürlüğü", ["psc", "cpc"]],
      ["Defas Madencilik San. ve Tic. A.Ş.", ["psc"]],
      ["Hidro-Gen Enerji", ["psc", "cpc"]],
      ["Arıksan Metal", ["psc", "cpc"]],
      ["İmbat Madencilik", ["psc", "cpc"]],
      ["Bulut Metal", ["psc", "cpc", "mesem"]],
      ["Zinba Makina Sanayi", ["psc"]],
      ["Zirve Makina", ["psc", "mesem"]],
      ["Uysal Torna (Muhammet Uysal)", ["psc"]],
      ["Ürün Taşlama (Aycan Ürün)", ["psc"]],
      ["Özaltınbay Mermer", ["mesem"]]
    ];
    seed.forEach(([name, groups]) => {
      const existing = s.isletmeler.find(i => i.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        groups.forEach(g => { if (!existing.groups.includes(g)) existing.groups.push(g); });
      } else {
        s.isletmeler.push({ id: uid("isletme"), name, groups: groups.slice() });
      }
    });
    const studentSeed = [
      ["12/A", "1008", "Zafer Sarı", "MBO", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/A", "23014", "Ramazan Övek", "MBO", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/A", "23100", "Mert Kocabıyık", "MBO", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/A", "23107", "Hasan Mert Anaç", "MBO", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/A", "23245", "Ahmet Cemil Yıldız", "MBO", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/A", "23060", "Mehmet Kazım Uzun", "MBO", "Defas Madencilik San. ve Tic. A.Ş."],
      ["12/A", "23068", "Sadettin Aksu", "MBO", ""],
      ["12/A", "23081", "Batıkan Alemdar Taşpınar", "MBO", "Defas Madencilik San. ve Tic. A.Ş."],
      ["12/A", "23046", "Tunahan Teker", "MBO", "Hidro-Gen Enerji"],
      ["12/A", "23077", "Cengizhan Gezgin", "MBO", "Hidro-Gen Enerji"],
      ["12/A", "23050", "Yaşar Arda Cal", "MBO", "Arıksan Metal"],
      ["12/A", "23087", "Yusuf Efe Cal", "MBO", "Arıksan Metal"],
      ["12/A", "23238", "Arda Yılmaz", "MBO", "Arıksan Metal"],
      ["12/A", "23104", "Ali Han Çelik", "MBO", "İmbat Madencilik"],
      ["12/A", "23117", "Salih Agcık", "MBO", "İmbat Madencilik"],
      ["12/A", "23113", "Muhammet Emin Kılıç", "MBO", "Bulut Metal"],
      ["12/A", "23034", "Ali Yılmaz", "MBO", "Zinba Makina Sanayi"],
      ["12/A", "23110", "Süleyman Çoban", "MBO", "Zirve Makina"],
      ["12/A", "23015", "İsmail Sivri", "MBO", "Uysal Torna (Muhammet Uysal)"],
      ["12/A", "23102", "Hüseyin Yekta Şenlik", "MBO", ""],
      ["12/A", "23112", "Emirhan Ertürk", "MBO", "Ürün Taşlama (Aycan Ürün)"],
      ["12/A", "22", "Halil Yanık", "MBO", "Bulut Metal"],
      ["12/B", "23010", "Emirhan Yaslan", "BMİ", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/B", "23021", "Yiğit Afacan", "BMİ", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/B", "23026", "Yağız Şenhan", "BMİ", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/B", "23054", "Samet Yalın", "BMİ", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/B", "23105", "Efe Eşref Özdılkural", "BMİ", "TKİ Ege Linyitleri İşletmesi Müdürlüğü"],
      ["12/B", "23058", "Mehmet Can Çelebi", "BMİ", ""],
      ["12/B", "23109", "Eren Olum", "BMİ", ""],
      ["12/B", "23085", "Muhammet Toprak", "BMİ", "Arıksan Metal"],
      ["12/B", "23249", "Ege Genç", "BMİ", "Arıksan Metal"],
      ["12/B", "22117", "Hüseyin Anıl Koç", "BMİ", "Hidro-Gen Enerji"],
      ["12/B", "23053", "Mert Berat Varlı", "BMİ", "İmbat Madencilik"],
      ["12/B", "23093", "Fahri Can Ilgaz", "BMİ", "İmbat Madencilik"],
      ["12/B", "22102", "Ramazan Doganer", "BMİ", "Bulut Metal"],
      ["12/B", "23007", "Talha Ömer Yağmur", "BMİ", "Bulut Metal"],
      ["12/B", "202501", "Bülent Alp Özkan", "BMİ", "Zirve Makina"],
      ["11/C", "713", "Emirhan Türkmen", "MBO", "Özaltınbay Mermer"]
    ];
    studentSeed.forEach(([sinif, okulNo, ad, dal, isletme]) => {
      s.students.push({ id: uid("st"), sinif, okulNo, ad, dal, isletme });
    });
  }
  if (s.coordAssignments.length > 0 || s.classes.some(c => c.id && c.id.startsWith("koord-"))) {
    s.coordAssignments = [];
    s.classes = s.classes.filter(c => !(c.id && c.id.startsWith("koord-")));
    Object.keys(s.schedule || {}).forEach(k => {
      const cell = s.schedule[k];
      if (cell.classId && cell.classId.startsWith("koord-")) delete s.schedule[k];
    });
  }
  s.teachers.forEach(t => {
    if (!t.timeOff) t.timeOff = {};
    if (typeof t.hoursMode !== "string") {
      if (typeof t.maxHours === "number") { t.hoursMode = "exact"; t.hoursTarget = t.maxHours; }
      else { t.hoursMode = "min"; t.hoursTarget = 20; }
    }
    if (typeof t.coordEligible !== "boolean") t.coordEligible = true;
    if (typeof t.unvan !== "string") t.unvan = "";
  });
  // Yıllık Plan imza bloğu — S.teachers'dan (ders programı öğretmen listesi)
  // BAĞIMSIZ ayrı bir liste: alandaki öğretmen sayısı zamanla artıp
  // azalabiliyor ama imza sirkülerini (kurumun onay/imza yetkilileri)
  // bundan ayrı, elle yönetilebilir tutmak gerekiyor.
  if (!Array.isArray(s.yillikPlanImzaListesi)) s.yillikPlanImzaListesi = [];
  if (!s.seededYillikPlanImzaListesi) {
    s.seededYillikPlanImzaListesi = true;
    if (s.yillikPlanImzaListesi.length === 0) {
      const varsayilanSira = ["t5", "t2", "t3", "t4", "t1", "t6"];
      s.yillikPlanImzaListesi = varsayilanSira.map(id => s.teachers.find(t => t.id === id)).filter(Boolean)
        .map(t => ({ id: uid("imza"), ad: t.name, unvan: t.unvan || "" }));
    }
  }
  s.yillikPlanImzaListesi.forEach(e => {
    if (!e.id) e.id = uid("imza");
    if (typeof e.ad !== "string") e.ad = "";
    if (typeof e.unvan !== "string") e.unvan = "";
  });
  s.classes.forEach(cl => {
    cl.assignments.forEach(a => {
      if (!Array.isArray(a.eligibleTeacherIds)) a.eligibleTeacherIds = [];
      if (typeof a.teacherCount !== "number") a.teacherCount = a.eligibleTeacherIds.length > 0 ? 1 : 0;
      if (!Array.isArray(a.roomIds)) a.roomIds = a.roomId ? [a.roomId] : [];
    });
  });
  const c12a = s.classes.find(c => c.id === "cl-12a");
  if (c12a && (!c12a.schoolDays || c12a.schoolDays.length === 0)) c12a.schoolDays = [0, 1];
  const c12b = s.classes.find(c => c.id === "cl-12b");
  if (c12b && (!c12b.schoolDays || c12b.schoolDays.length === 0)) c12b.schoolDays = [3, 4];
  Object.values(s.schedule || {}).forEach(cell => {
    if (!Array.isArray(cell.teacherIds)) cell.teacherIds = [];
    if (!Array.isArray(cell.roomIds)) cell.roomIds = cell.roomId ? [cell.roomId] : [];
  });
  return s;
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return normalizeState(defaultState());
    return normalizeState(JSON.parse(raw));
  } catch (e) { return normalizeState(defaultState()); }
}

let S = loadState();
let lastSnapshot = null;
let lastSnapshotWasDelete = false;
let undoing = false;
function save() {
  const prevRaw = localStorage.getItem(LS_KEY);
  if (!undoing) {
    lastSnapshot = prevRaw;
    lastSnapshotWasDelete = !!window.__lastActionWasDelete;
  }
  window.__lastActionWasDelete = false;
  S.__senkronZamani = new Date().toISOString();
  localStorage.setItem(LS_KEY, JSON.stringify(S));
  surumSenkronizeEt();
  scheduleProgramSenkronizeEt();
  bulutaSenkronEt();
  if (typeof showSaveToast === "function") showSaveToast(!undoing && lastSnapshotWasDelete);
}
/* ============ Bilgisayarlar Arası Otomatik Senkronizasyon ============
   Kullanıcı OneDrive kullanıyorsa (bkz. electron/main.js), her save()
   çağrısında mevcut çalışma OneDrive'daki ortak dosyaya da yazılır.
   Program açılışında (bkz. app.js) bulutSenkronunuKontrolEt() çağrılıp
   o dosyadaki veri bu bilgisayardakinden daha yeniyse (başka bir
   bilgisayarda kaydedilmişse) otomatik olarak buraya aktarılır — yedek
   dosyası alıp elle yüklemeye gerek kalmaz. OneDrive yoksa (electron
   dışı ortam ya da syncWrite/syncRead tanımsız) bu işlemler sessizce
   atlanır, uygulama eskisi gibi sadece yerel çalışır. */
function bulutaSenkronEt() {
  if (!(window.desktop && window.desktop.isElectron && window.desktop.syncWrite)) return;
  try { window.desktop.syncWrite(JSON.stringify(S)); } catch (e) {}
}
async function bulutSenkronunuKontrolEt() {
  if (!(window.desktop && window.desktop.isElectron && window.desktop.syncRead)) return;
  let raw;
  try { raw = await window.desktop.syncRead(); } catch (e) { return; }
  if (!raw) return;
  let bulutState;
  try { bulutState = JSON.parse(raw); } catch (e) { return; }
  const bulutZaman = bulutState.__senkronZamani || "";
  const yerelZaman = S.__senkronZamani || "";
  if (!bulutZaman || bulutZaman <= yerelZaman) return;
  S = normalizeState(bulutState);
  localStorage.setItem(LS_KEY, JSON.stringify(S));
  if (typeof renderTabbar === "function") renderTabbar();
  if (typeof renderMain === "function") renderMain();
  if (typeof renderSurumWidget === "function") renderSurumWidget();
  if (typeof showSaveToast === "function") showSaveToast(false, "Veriler başka bir bilgisayardan senkronize edildi");
}
function scheduleProgramSenkronizeEt() {
  if (!Array.isArray(S.schedulePrograms) || !S.activeScheduleProgramId) return;
  const p = S.schedulePrograms.find(x => x.id === S.activeScheduleProgramId);
  if (p) p.schedule = JSON.parse(JSON.stringify(S.schedule));
}

/* ============ İsimli Kayıtlar (Öğretim Yılı vb. Sürümler) ============
   "Kaydet" her zaman anlık çalışmayı localStorage'a yazar (yukarıdaki
   LS_KEY). Kullanıcı isterse çalışmasının o anki hâlini isimli bir
   "sürüm" olarak da saklayabilir (ör. "2026-2027 Eğitim-Öğretim Yılı").
   Bir sürüm "aktif" olarak işaretlendiğinde, o andan sonraki her
   save() çağrısı otomatik olarak o sürümün içeriğini de günceller —
   böylece kullanıcı hangi isimli kayıtla çalıştığını bilir ve normal
   "Kaydet" ile çalışmaya devam ettiğinde o isimli kayıt da güncel
   kalır, aksi hâlde sürümler arasında kaybolan değişiklik olmaz. */
function getAktifSurumId() {
  try { return localStorage.getItem(AKTIF_SURUM_KEY) || null; } catch (e) { return null; }
}
function setAktifSurumId(id) {
  try {
    if (id) localStorage.setItem(AKTIF_SURUM_KEY, id);
    else localStorage.removeItem(AKTIF_SURUM_KEY);
  } catch (e) {}
}
function surumSenkronizeEt() {
  const aktifId = getAktifSurumId();
  if (!aktifId) return;
  const versions = loadVersions();
  const v = versions.find(x => x.id === aktifId);
  if (!v) return;
  v.data = JSON.parse(JSON.stringify(S));
  v.savedAt = new Date().toISOString();
  saveVersionsList(versions);
}
function undoLastChange() {
  if (!lastSnapshot) return;
  let restored;
  try { restored = normalizeState(JSON.parse(lastSnapshot)); } catch (e) { return; }
  S = restored;
  lastSnapshot = null;
  undoing = true;
  save();
  undoing = false;
  if (typeof renderTabbar === "function") renderTabbar();
  if (typeof renderMain === "function") renderMain();
}

function loadVersions() {
  try { return JSON.parse(localStorage.getItem(VERSIONS_KEY)) || []; } catch (e) { return []; }
}
function saveVersionsList(v) { localStorage.setItem(VERSIONS_KEY, JSON.stringify(v)); }

function courseById(id) { return S.courses.find(c => c.id === id); }
function teacherById(id) { return S.teachers.find(t => t.id === id); }
function roomById(id) { return S.rooms.find(r => r.id === id); }
function classById(id) { return S.classes.find(c => c.id === id); }
function isletmeById(id) { return S.isletmeler.find(i => i.id === id); }

function assignedCoursesForClass(cls) {
  return (cls.assignments || []).map(a => courseById(a.courseId)).filter(Boolean);
}
