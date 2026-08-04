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
