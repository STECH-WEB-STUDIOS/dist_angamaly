tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#4D0000',
                secondary: '#A20000',
            }
        }
    }
}


const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});



//Carousal script
const visibleCount = 4;
const carousel = document.getElementById('placementCarousel');
const wrapper = document.getElementById('carouselWrapper');
let currentIndex = visibleCount; // Start after prepended clones
let slideWidth = 0;
let autoScrollInterval;

// Clone slides for infinite effect
function cloneSlides() {
  const items = Array.from(carousel.children);
  const total = items.length;

  const startClones = items.slice(0, visibleCount).map(el => el.cloneNode(true));
  const endClones = items.slice(total - visibleCount).map(el => el.cloneNode(true));

  startClones.forEach(clone => carousel.appendChild(clone));
  endClones.forEach(clone => carousel.insertBefore(clone, carousel.firstChild));
}

// Update carousel position
function updateCarouselPosition() {
  slideWidth = carousel.children[0].offsetWidth + 25;
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Slide logic
function slideCarousel(direction) {
  currentIndex += direction;
  carousel.style.transition = 'transform 0.5s ease-in-out';
  updateCarouselPosition();

  carousel.addEventListener('transitionend', handleLoopEdges, { once: true });
}

// Handle seamless jump at loop edges
function handleLoopEdges() {
  const total = carousel.children.length;
  if (currentIndex >= total - visibleCount) {
    currentIndex = visibleCount;
    carousel.style.transition = 'none';
    updateCarouselPosition();
  } else if (currentIndex < visibleCount) {
    currentIndex = total - visibleCount * 2;
    carousel.style.transition = 'none';
    updateCarouselPosition();
  }
}

// Auto-scroll
function startAutoScroll() {
  stopAutoScroll();
  autoScrollInterval = setInterval(() => slideCarousel(1), 5000);
}

function stopAutoScroll() {
  if (autoScrollInterval) clearInterval(autoScrollInterval);
}

// Initialization
window.addEventListener("load", () => {
  cloneSlides();
  updateCarouselPosition();
  startAutoScroll();
});

window.addEventListener("resize", updateCarouselPosition);
wrapper.addEventListener("mouseenter", stopAutoScroll);
wrapper.addEventListener("mouseleave", startAutoScroll);

