/* ============================================================
   EDIT THIS FILE ONLY - every button on the site reads from here.
   ============================================================ */
window.TM_CONFIG = {
  // Free-trial installer (GitHub Releases link - see SELLING-GUIDE step 4)
  downloadUrl: "https://github.com/Conanarchi/transmittal-manager/releases/latest/download/Transmittal-Manager-Setup.exe",

  // One installer per platform (file names must match the GitHub release assets).
  downloads: {
    win64: "https://github.com/Conanarchi/transmittal-manager/releases/latest/download/Transmittal-Manager-Setup.exe",
    win32: "https://github.com/Conanarchi/transmittal-manager/releases/latest/download/Transmittal-Manager-Setup-32bit.exe",
    macArm: "https://github.com/Conanarchi/transmittal-manager/releases/latest/download/Transmittal-Manager-mac-arm64.zip",
    macIntel: "https://github.com/Conanarchi/transmittal-manager/releases/latest/download/Transmittal-Manager-mac-x64.zip"
  },

  // Lemon Squeezy checkout links (Products > Share > copy link), one per plan
  checkout: {
    single: "https://transmittalmanager.lemonsqueezy.com/checkout/buy/3d878687-de69-4538-8c47-43629929f589",
    office: "https://transmittalmanager.lemonsqueezy.com/checkout/buy/1fed37c1-e4e8-4a71-9874-800366c9819d",
    studio: "https://transmittalmanager.lemonsqueezy.com/checkout/buy/b89a29c8-241a-4e3c-9887-64acce60f9eb"
  },

  // Autodesk App Store listing (after it is approved)
  autodeskUrl: "https://apps.autodesk.com/",

  // LinkedIn company page (set when creating the page: linkedin.com/company/transmittal-manager).
  // Leave empty to hide the LinkedIn links.
  linkedinUrl: "https://www.linkedin.com/company/transmittal-manager",

  supportEmail: "transmittalmanager.help@gmail.com"
};

document.addEventListener("DOMContentLoaded", function () {
  var c = window.TM_CONFIG;
  // Mac visitors get the Mac build on the main buttons (Apple Silicon; Intel is in the "Also for" links).
  var isMac = /Mac/i.test(navigator.platform || "") || /Mac OS X/.test(navigator.userAgent);
  var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  var main = isMac && !isMobile && c.downloads ? c.downloads.macArm : c.downloadUrl;
  document.querySelectorAll("[data-download]").forEach(function (a) {
    a.href = main;
    if (isMac && !isMobile && a.querySelector("svg")) a.lastChild.textContent = "Download for Mac";
  });
  document.querySelectorAll("[data-download-alt]").forEach(function (a) {
    var url = c.downloads && c.downloads[a.dataset.downloadAlt];
    if (url) a.href = url; else a.remove();
    if (a.dataset.downloadAlt === (isMac ? "macArm" : "win64")) a.remove();
  });
  document.querySelectorAll("[data-checkout]").forEach(function (a) { a.href = c.checkout[a.dataset.checkout] + "?embed=1"; });
  document.querySelectorAll("[data-linkedin]").forEach(function (a) {
    if (c.linkedinUrl) a.href = c.linkedinUrl; else a.remove();
  });
  document.querySelectorAll("[data-autodesk]").forEach(function (a) { a.href = c.autodeskUrl; });
  document.querySelectorAll("[data-email]").forEach(function (a) {
    if (c.supportEmail) { a.href = "mailto:" + c.supportEmail; if (a.textContent === "support" || a.textContent === "Contact") a.textContent = c.supportEmail; }
    else { a.removeAttribute("href"); a.textContent = a.textContent === "Contact" ? "" : "us"; }
  });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
});
