document.addEventListener("DOMContentLoaded", () => {
  // ===== Slider (manual) =====
  const track = document.querySelector(".banner-slider .slides");
  const slides = Array.from(document.querySelectorAll(".banner-slider .slide"));
  const prevBtn = document.querySelector(".banner-slider .prev");
  const nextBtn = document.querySelector(".banner-slider .next");
  let index = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlide();
  }
  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  }
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  updateSlide();

  // ===== Mobile nav toggle =====
  const hamburger = document.querySelector(".hamburger");
  const mainnav = document.querySelector(".mainnav");
  hamburger.addEventListener("click", () => {
    mainnav.classList.toggle("open");
  });

  // ===== Dropdown toggle (mobile only) =====
  const dropdownParents = document.querySelectorAll(".mainnav .has-sub");
  dropdownParents.forEach((li) => {
    const btn = li.querySelector(".nav-link");
    btn.addEventListener("click", (e) => {
      // Only toggle in mobile mode
      if (window.matchMedia("(max-width: 900px)").matches) {
        e.preventDefault();
        li.classList.toggle("open");
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
      }
    });
  });

  // ===== Demo: cart count (replace with real logic later) =====
  const cartCount = document.getElementById("cartCount");
  // Example: set to 2 just to show
  // cartCount.textContent = "2";
});

// ===== Clean dropdown logic =====
document.addEventListener("DOMContentLoaded", () => {
  const mainnav = document.querySelector(".mainnav");
  const parents = Array.from(mainnav.querySelectorAll(".has-sub"));

  // Open/close on click; close others
  parents.forEach((li) => {
    const btn = li.querySelector(".nav-link");
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Close other open menus
      parents.forEach(p => { if (p !== li) p.classList.remove("open"); });

      // Toggle this one
      li.classList.toggle("open");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    if (!mainnav.contains(e.target)) {
      parents.forEach(p => p.classList.remove("open"));
      mainnav.querySelectorAll(".nav-link[aria-expanded='true']")
             .forEach(b => b.setAttribute("aria-expanded", "false"));
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      parents.forEach(p => p.classList.remove("open"));
      mainnav.querySelectorAll(".nav-link[aria-expanded='true']")
             .forEach(b => b.setAttribute("aria-expanded", "false"));
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Quantity selector logic
  document.querySelectorAll(".qty-control").forEach(control => {
    const input = control.querySelector("input");
    const minus = control.querySelector(".qty-btn.minus");
    const plus = control.querySelector(".qty-btn.plus");

    minus.addEventListener("click", () => {
      let value = parseInt(input.value, 10) || 1;
      if (value > 1) {
        input.value = value - 1;
      }
    });

    plus.addEventListener("click", () => {
      let value = parseInt(input.value, 10) || 1;
      input.value = value + 1;
    });
  });
});

import { onSnapshot, collection, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const q = query(collection(db, "banners"), orderBy("order"));
onSnapshot(q, (snapshot) => {
  slidesContainer.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const img = document.createElement("img");
    img.src = data.imageURL;
    img.alt = data.alt || "Banner";
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.appendChild(img);
    slidesContainer.appendChild(slide);
  });
});

