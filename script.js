const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const galleryButtons = [...document.querySelectorAll(".gallery-item")];
const galleryImages = galleryButtons.map((button) => button.querySelector("img").src);
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");
const previousButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");

let currentImage = 0;

function showImage(index) {
  currentImage = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImage];
  lightboxImage.alt = galleryButtons[currentImage].querySelector("img").alt;
}

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showImage(index);
    lightbox.showModal();
  });
});

closeButton.addEventListener("click", () => lightbox.close());
previousButton.addEventListener("click", () => showImage(currentImage - 1));
nextButton.addEventListener("click", () => showImage(currentImage + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;

  if (event.key === "ArrowLeft") showImage(currentImage - 1);
  if (event.key === "ArrowRight") showImage(currentImage + 1);
  if (event.key === "Escape") lightbox.close();
});

// ===== RULES SLIDER =====

const ruleSlides = [...document.querySelectorAll(".rules-slide")];
const rulesPrev = document.querySelector(".rules-prev");
const rulesNext = document.querySelector(".rules-next");
const rulesDots = document.querySelector(".rules-dots");

let currentRule = 0;


// Create dots
ruleSlides.forEach((slide, index) => {

  const dot = document.createElement("button");

  dot.className = "rule-dot";

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.type = "button";
  dot.setAttribute("aria-label", `Peraturan ${index + 1}`);

  dot.addEventListener("click", () => {
    showRule(index);
  });

  rulesDots.appendChild(dot);

});


const ruleDots = [...document.querySelectorAll(".rule-dot")];


function showRule(index) {

  currentRule = (index + ruleSlides.length) % ruleSlides.length;

  ruleSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentRule);
  });

  ruleDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentRule);
  });

}


rulesPrev.addEventListener("click", () => {
  showRule(currentRule - 1);
});


rulesNext.addEventListener("click", () => {
  showRule(currentRule + 1);
});


// Swipe pada telefon
let ruleTouchStart = 0;

document.querySelector(".rules-track").addEventListener(
  "touchstart",
  (event) => {
    ruleTouchStart = event.changedTouches[0].screenX;
  },
  { passive: true }
);


document.querySelector(".rules-track").addEventListener(
  "touchend",
  (event) => {

    const ruleTouchEnd = event.changedTouches[0].screenX;
    const difference = ruleTouchStart - ruleTouchEnd;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
      showRule(currentRule + 1);
    } else {
      showRule(currentRule - 1);
    }

  },
  { passive: true }
);
