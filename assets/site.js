(function () {
  var header = document.querySelector(".site-header");
  var onScroll = function () { header && header.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var toggle = document.querySelector(".menu-toggle"), nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") nav.classList.remove("open"); });
  }

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add("in"); }); }

  var box = document.getElementById("lightbox");
  if (box) {
    var big = box.querySelector("img");
    document.querySelectorAll(".frame img, .paper img, .float-doc img").forEach(function (img) {
      img.addEventListener("click", function () { big.src = img.src; big.alt = img.alt; box.classList.add("open"); });
    });
    box.addEventListener("click", function () { box.classList.remove("open"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.classList.remove("open"); });
  }
})();
