/* ============ Bulut Girişi ve Firestore Senkronizasyonu ============
   Firebase Authentication (e-posta/şifre) ile giriş yapıldıktan sonra S,
   Firestore'daki users/{uid}/data/state belgesiyle gerçek zamanlı
   senkronize olur — aynı hesapla açık herhangi bir bilgisayarda bir
   değişiklik kaydedildiğinde, diğer açık bilgisayarlar saniyeler içinde
   otomatik güncellenir (bkz. bulutDinlemeyeBasla, Firestore onSnapshot).
   Giriş yapılmazsa ya da internet/Firebase erişilemezse uygulama eskisi
   gibi (sadece yerel + varsa OneDrive, bkz. model.js) çalışmaya devam
   eder — bu dosyadaki her şey "varsa bonus" mantığıyla try/catch'li. */
const BULUT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC_HdP1Pk9LhbuLTieLGJDOxnPAUA6GfGE",
  authDomain: "makine-alan-yonetim-sistemi.firebaseapp.com",
  projectId: "makine-alan-yonetim-sistemi",
  storageBucket: "makine-alan-yonetim-sistemi.firebasestorage.app",
  messagingSenderId: "705157153686",
  appId: "1:705157153686:web:c5f3aa5d37809d2a7553b7",
  measurementId: "G-8X2ELT4260"
};

// TEMP: tüm düzenlemeler bitene kadar giriş zorunlu değil — test kolaylığı
// için geçici olarak kapatıldı. En son true yapılacak.
const BULUT_GIRIS_ZORUNLU = false;

let bulutDb = null;
let bulutDinleyiciDurdur = null;

function bulutBaslat() {
  if (typeof firebase === "undefined") return;
  try {
    firebase.initializeApp(BULUT_FIREBASE_CONFIG);
    bulutDb = firebase.firestore();
    // İnternet yokken yapılan kayıtlar diskte (IndexedDB) bekletilir;
    // internet geri geldiğinde (program kapatılıp açılsa bile) otomatik
    // olarak buluta gönderilir — kullanıcının ayrıca bir şey yapmasına
    // gerek yok. Aynı anda birden fazla pencere açıksa etkinleşemez,
    // o durumda da sorun değil: sadece bu "kuyruklama" özelliği devre
    // dışı kalır, normal senkronizasyon yine çalışır.
    bulutDb.enablePersistence().catch(() => {});
  } catch (e) { return; }
  // Oturum, program kapatılınca kendiliğinden kapansın istendi — yani
  // her açılışta şifre sorulsun, "beni hatırla" olmasın. Bunun için
  // kalıcılığı NONE'a çekip (bundan sonraki girişler hiç saklanmaz) ve
  // olası eski, önceden kalıcı kaydedilmiş bir oturumu bir kerelik zorla
  // kapatıyoruz — onAuthStateChanged'i ancak bu işlem bitince
  // dinlemeye başlıyoruz, böylece "önce girmiş gibi görünüp sonra
  // aniden çıkış" görüntüsü (flash) oluşmaz.
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .catch(() => {})
    .then(() => firebase.auth().signOut())
    .catch(() => {})
    .then(() => {
      firebase.auth().onAuthStateChanged(kullanici => {
        if (kullanici) {
          bulutGirisEkraniniGizle();
          bulutDurumGoster(kullanici.email);
          bulutDinlemeyeBasla(kullanici.uid);
        } else {
          if (bulutDinleyiciDurdur) { bulutDinleyiciDurdur(); bulutDinleyiciDurdur = null; }
          bulutDurumGoster(null);
          if (BULUT_GIRIS_ZORUNLU) bulutGirisEkraniniGoster();
        }
      });
    });
}

// ÖNEMLİ GÜVENLİK KARARI (kullanıcıyla konuşulup netleştirildi): "Hesap
// Oluştur" herkese açık bir buton olarak DURMASIN istendi — başkası bu
// sayfayı bulsa bile kendine hesap açamasın. Bu yüzden buradan hesap
// oluşturma KALDIRILDI. Yerine: hesap zaten var olduğunda gerçek Gmail
// adresine Firebase'in kendi "şifre sıfırlama" e-postasını gönderen
// "Şifremi Unuttum" eklendi — bu hem şifre değiştirmeyi hem de sahibin
// Gmail'ine bilgi gelmesini (Firebase'in kendi gönderdiği e-posta)
// sağlıyor. Giriş adı yerine tekrar GERÇEK e-posta isteniyor — aksi
// halde şifre sıfırlama e-postası hiçbir yere gidemez (uydurma bir alan
// adına e-posta gönderilemez).
function bulutDurumGoster(eposta) {
  const el = document.getElementById("bulut-durum");
  if (!el) return;
  el.innerHTML = eposta
    ? `☁️ ${escHtml(eposta)} · <a href="#" onclick="bulutCikisYap();return false;">Çıkış</a>`
    : `☁️ Bulut girişi yok · <a href="#" onclick="bulutGirisEkraniniGoster();return false;">Giriş yap</a>`;
}

function bulutGirisEkraniniGoster() {
  const root = document.getElementById("bulut-giris-root");
  if (!root) return;
  root.innerHTML = `
  <div class="modal-bg" style="z-index:200;">
    <div class="modal" style="width:340px;">
      <h3>Giriş Yap</h3>
      <p class="small">Programı kullanmak ve değişikliklerin buluta otomatik kaydedilmesi için giriş yapman gerekiyor.</p>
      <label class="small">E-posta</label>
      <input type="email" id="bulut-eposta" style="width:100%" autocomplete="username">
      <label class="small">Şifre</label>
      <input type="password" id="bulut-sifre" style="width:100%" autocomplete="current-password" onkeydown="if(event.key==='Enter'){event.preventDefault();bulutGirisYap();}">
      <div id="bulut-giris-hata" class="small" style="color:var(--warn);margin-top:6px;"></div>
      <div class="row">
        <button class="btn primary" id="bulut-giris-btn" onclick="bulutGirisYap()">Giriş Yap</button>
      </div>
      <p class="small" style="margin-top:8px;"><a href="#" onclick="bulutSifremiUnuttum();return false;">Şifremi unuttum</a></p>
      <div id="bulut-sifirla-mesaj" class="small" style="color:var(--teal-ink);margin-top:4px;"></div>
    </div>
  </div>`;
}
function bulutGirisEkraniniGizle() {
  const root = document.getElementById("bulut-giris-root");
  if (root) root.innerHTML = "";
}
function bulutGirisYap() {
  const eposta = ((document.getElementById("bulut-eposta") || {}).value || "").trim();
  const sifre = (document.getElementById("bulut-sifre") || {}).value || "";
  const hataEl = document.getElementById("bulut-giris-hata");
  const btn = document.getElementById("bulut-giris-btn");
  if (!eposta || !sifre) { if (hataEl) hataEl.textContent = "E-posta ve şifre girin."; return; }
  if (hataEl) hataEl.textContent = "";
  if (btn) { btn.disabled = true; btn.textContent = "Giriş yapılıyor..."; }
  firebase.auth().signInWithEmailAndPassword(eposta, sifre).catch(err => {
    if (hataEl) hataEl.textContent = "Giriş başarısız: " + (err && err.message ? err.message : "bilinmeyen hata");
    if (btn) { btn.disabled = false; btn.textContent = "Giriş Yap"; }
  });
}
function bulutSifremiUnuttum() {
  const eposta = ((document.getElementById("bulut-eposta") || {}).value || "").trim();
  const hataEl = document.getElementById("bulut-giris-hata");
  const mesajEl = document.getElementById("bulut-sifirla-mesaj");
  if (!eposta) { if (hataEl) hataEl.textContent = "Önce e-posta adresini yaz."; return; }
  if (hataEl) hataEl.textContent = "";
  firebase.auth().sendPasswordResetEmail(eposta).then(() => {
    if (mesajEl) mesajEl.textContent = "Şifre sıfırlama bağlantısı " + eposta + " adresine gönderildi, gelen kutunu kontrol et.";
  }).catch(err => {
    if (hataEl) hataEl.textContent = "Gönderilemedi: " + (err && err.message ? err.message : "bilinmeyen hata");
  });
}
// Hesap oluşturma artık arayüzde YOK (bkz. yukarıdaki not) — ama ilk
// hesabın bir kere kurulması gerekiyor ve bunu buradan (bu oturumdan)
// Firebase'e ağ erişimi olmadığı için ben kuramıyorum. Bu fonksiyon SADECE
// tarayıcının geliştirici konsoluna yazılıp tek seferlik çalıştırılmak
// üzere burada bırakıldı — arayüzde hiçbir düğmeye bağlı değil, o yüzden
// sayfayı bulan biri bunu göremez/tıklayamaz.
function bulutIlkHesabiKurKonsoldanCalistir(eposta, sifre) {
  if (!eposta || !sifre) { console.error("Kullanım: bulutIlkHesabiKurKonsoldanCalistir('gercek@gmail.com','sifre')"); return; }
  firebase.auth().createUserWithEmailAndPassword(eposta, sifre).then(() => {
    console.log("Hesap oluşturuldu:", eposta);
  }).catch(err => {
    console.error("Hesap oluşturulamadı:", err.message);
  });
}
function bulutCikisYap() {
  if (!(typeof firebase !== "undefined" && firebase.auth)) return;
  firebase.auth().signOut();
}

function bulutDinlemeyeBasla(uid) {
  if (bulutDinleyiciDurdur) bulutDinleyiciDurdur();
  const belge = bulutDb.collection("users").doc(uid).collection("data").doc("state");
  bulutDinleyiciDurdur = belge.onSnapshot(snap => {
    if (!snap.exists) { bulutaFirestoreSenkronEt(); return; }
    const veri = snap.data();
    if (!veri || typeof veri.json !== "string") return;
    let bulutState;
    try { bulutState = JSON.parse(veri.json); } catch (e) { return; }
    const bulutZaman = bulutState.__senkronZamani || "";
    const yerelZaman = (typeof S !== "undefined" && S.__senkronZamani) || "";
    if (!bulutZaman || bulutZaman <= yerelZaman) return;
    // GÜVENLİK: sadece zaman damgasına güvenmek tehlikeli — ör. yeni/boş bir
    // cihaz ilk kez giriş yapıp bulutu kendi (boş) hâliyle ezerse, zaman
    // damgası ondan "daha yeni" görünür ve gerçek veriyi barındıran bu
    // bilgisayar bu bulut kopyasını indirip üzerine yazar. Bunu önlemek için,
    // gelen bulut verisi bu bilgisayardaki veriden BELİRGİN ÖLÇÜDE daha "boş"
    // görünüyorsa inip ezmek yerine, bu bilgisayarın kendi (daha zengin)
    // verisini buluta tekrar göndeririz — veri kaybı yerine zararsız bir
    // "hiçbir şey olmadı" sonucu.
    const zenginlik = (st) => {
      if (!st) return 0;
      return (Array.isArray(st.ogrenciListesi) ? st.ogrenciListesi.length : 0) * 10
        + (Array.isArray(st.students) ? st.students.length : 0) * 5
        + (Array.isArray(st.stajdakiOgrenciler) ? st.stajdakiOgrenciler.length : 0) * 5
        + (Array.isArray(st.isletmeler) ? st.isletmeler.length : 0)
        + (st.schedule ? Object.keys(st.schedule).length : 0);
    };
    const yerelZenginlik = zenginlik(typeof S !== "undefined" ? S : null);
    const bulutZenginlik = zenginlik(bulutState);
    if (yerelZenginlik > 0 && bulutZenginlik < yerelZenginlik / 2) {
      bulutaFirestoreSenkronEt();
      if (typeof showSaveToast === "function") showSaveToast(false, "Buluttaki veri bu bilgisayardakinden daha az görünüyordu, üzerine yazılmadı — bu bilgisayarın verisi buluta gönderildi");
      return;
    }
    S = normalizeState(bulutState);
    localStorage.setItem(LS_KEY, JSON.stringify(Object.assign({}, S, { donemArsivi: [] })));
    Promise.resolve(typeof arsivSenkronEt === "function" ? arsivSenkronEt() : null).then(() => {
      if (typeof renderTabbar === "function") renderTabbar();
      if (typeof renderMain === "function") renderMain();
      if (typeof renderYilWidget === "function") renderYilWidget();
      if (typeof showSaveToast === "function") showSaveToast(false, "Veriler başka bir bilgisayardan senkronize edildi");
    });
  }, () => {});
}

/* model.js'teki save() bu fonksiyonu çağırır — OneDrive'a yazan
   bulutaSenkronEt'ten kasıtlı olarak farklı isimli: aynı anda iki ayrı
   bulut mekanizması (OneDrive dosyası + Firestore) birbirinden habersiz,
   bağımsız çalışabilsin diye. Dönem Arşivi burada da taşınmıyor —
   hem Firestore'un 1 MB'lık belge sınırına takılmamak, hem de her
   kayıtta büyüyen arşivi gereksiz yere tekrar tekrar yüklememek için
   (arşiv zaten her bilgisayarda kendi IndexedDB'sinde kalıcı). */
function bulutaFirestoreSenkronEt() {
  if (!(bulutDb && typeof firebase !== "undefined" && firebase.auth().currentUser)) return;
  const uid = firebase.auth().currentUser.uid;
  bulutDb.collection("users").doc(uid).collection("data").doc("state")
    .set({ json: JSON.stringify(Object.assign({}, S, { donemArsivi: [] })), updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
    .catch(() => {});
}
