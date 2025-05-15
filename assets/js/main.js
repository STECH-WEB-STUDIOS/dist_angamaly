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
let visibleCount = 4; // Default
    let currentIndex = 0;
    let slideWidth = 0;
    let autoScrollInterval;

    const carousel = document.getElementById("placementCarousel");
    const wrapper = document.getElementById("carouselWrapper");

    function updateVisibleCount() {
      const width = window.innerWidth;
      if (width < 640) visibleCount = 1;       // sm
      else if (width < 768) visibleCount = 2;  // md
      else if (width < 1024) visibleCount = 3; // lg
      else visibleCount = 4;                   // xl and up
    }

    function updateCarouselPosition() {
      const firstCard = carousel.querySelector("div");
      if (!firstCard) return;

      slideWidth = firstCard.getBoundingClientRect().width + 20; // 20 = space-x-5 gap
      carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function slideCarousel(direction) {
      const total = carousel.children.length;
      const maxIndex = total - visibleCount;

      currentIndex += direction;
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;

      carousel.style.transition = 'transform 0.5s ease-in-out';
      updateCarouselPosition();
    }

    function startAutoScroll() {
      stopAutoScroll();
      autoScrollInterval = setInterval(() => {
        const total = carousel.children.length;
        const maxIndex = total - visibleCount;

        if (currentIndex >= maxIndex) {
          currentIndex = 0;
        } else {
          currentIndex += 1;
        }

        carousel.style.transition = 'transform 0.5s ease-in-out';
        updateCarouselPosition();
      }, 5000);
    }

    function stopAutoScroll() {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    }

    window.addEventListener("load", () => {
      updateVisibleCount();
      updateCarouselPosition();
      startAutoScroll();
    });

    window.addEventListener("resize", () => {
      updateVisibleCount();
      updateCarouselPosition();
    });

    wrapper.addEventListener("mouseenter", stopAutoScroll);
    wrapper.addEventListener("mouseleave", startAutoScroll);