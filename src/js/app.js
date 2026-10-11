/* ============ BAŞLAT ============ */
document.addEventListener("mouseup", endCellDrag);

/* Programdaki her confirm() bir silme onayı — silme sonrası "Geri Al"
   bildirimi gösterebilmek için onaylanan silmeleri işaretliyoruz. */
(function () {
  const nativeConfirm = window.confirm;
  window.confirm = function (msg) {
    const result = nativeConfirm(msg);
    if (result) window.__lastActionWasDelete = true;
    return result;
  };
})();

if (window.desktop && window.desktop.isElectron) {
  window.desktop.onExportBackup(() => exportDataFile());
  window.desktop.onImportBackup(() => triggerImportFile());
  window.desktop.onSavedPrograms(() => openSavedProgramsModal());
  window.desktop.onRestoreDefaults(() => restoreSchoolDefaults());
}

renderTabbar();
renderMain();
renderSidebarBrand();
applyTheme(currentTheme());
sonKayitBaslangicDurumunuGoster();
renderSurumWidget();

if (typeof bulutSenkronunuKontrolEt === "function") bulutSenkronunuKontrolEt();
