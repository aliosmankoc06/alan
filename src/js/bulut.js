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

let bulutDb = null;
let bulutDinleyiciDurdur = null;

function bulutBaslat() {
  if (typeof firebase === "undefined") return;
  try {
    firebase.initializeApp(BULUT_FIREBASE_CONFIG);
    bulutDb = firebase.firestore();
  } catch (e) { return; }
  firebase.auth().onAuthStateChanged(kullanici => {
    if (kullanici) {
      bulutGirisEkraniniGizle();
      bulutDurumGoster(kullanici.email);
      bulutDinlemeyeBasla(kullanici.uid);
    } else {
      if (bulutDinleyiciDurdur) { bulutDinleyiciDurdur(); bulutDinleyiciDurdur = null; }
      bulutDurumGoster(null);
      bulutGirisEkraniniGoster();
    }
  });
}

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
    S = normalizeState(bulutState);
    localStorage.setItem(LS_KEY, JSON.stringify(S));
    if (typeof renderTabbar === "function") renderTabbar();
    if (typeof renderMain === "function") renderMain();
    if (typeof renderSurumWidget === "function") renderSurumWidget();
    if (typeof showSaveToast === "function") showSaveToast(false, "Veriler başka bir bilgisayardan senkronize edildi");
  }, () => {});
}

/* model.js'teki save() bu fonksiyonu çağırır — OneDrive'a yazan
   bulutaSenkronEt'ten kasıtlı olarak farklı isimli: aynı anda iki ayrı
   bulut mekanizması (OneDrive dosyası + Firestore) birbirinden habersiz,
   bağımsız çalışabilsin diye. */
function bulutaFirestoreSenkronEt() {
  if (!(bulutDb && typeof firebase !== "undefined" && firebase.auth().currentUser)) return;
  const uid = firebase.auth().currentUser.uid;
  bulutDb.collection("users").doc(uid).collection("data").doc("state")
    .set({ json: JSON.stringify(S), updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
    .catch(() => {});
}
