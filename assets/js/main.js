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



document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('#posterCarousel');
  const carouselItems = carousel.querySelectorAll('.carousel-item');
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: false,
    ride: false,
    pause: false,
    wrap: true
  });
  
  let currentIndex = 0;
  
  function advanceSlide() {
    const currentSlide = carouselItems[currentIndex];
    const type = currentSlide.dataset.type;
  
    if (type === 'image') {
      const interval = parseInt(currentSlide.dataset.interval || '3000');
      setTimeout(() => {
        bsCarousel.next();
      }, interval);
    } else if (type === 'video') {
      const video = currentSlide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play().then(() => {
          // Wait for video to end
          video.onended = () => {
            bsCarousel.next();
          };
        }).catch(error => {
          // If autoplay fails, skip after fallback time
          console.warn('Video autoplay failed:', error);
          setTimeout(() => {
            bsCarousel.next();
          }, 5000);
        });
      } else {
        setTimeout(() => {
          bsCarousel.next();
        }, 5000);
      }
    }
  }
  
  // On slide change
  carousel.addEventListener('slid.bs.carousel', () => {
    currentIndex = [...carouselItems].findIndex(item => item.classList.contains('active'));
    advanceSlide();
  });
  
  // Start on page load
  advanceSlide();
});


// Increment count of events
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.count-up');
  let counted = false; // to ensure counting only once

  // Function to animate the counting
  const animateCount = (counter) => {
    const target = +counter.getAttribute('data-target');
    let current = 0;

    const updateCount = () => {
      const increment = Math.ceil(target / 100);
      current += increment;

      if(current < target) {
        counter.innerText = current + "+";
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  };

  // Observer callback
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !counted) {
        counters.forEach(counter => animateCount(counter));
        counted = true;
        observer.disconnect(); // stop observing after counting once
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.3  // trigger when 30% of the section is visible
  });

  // Start observing the cards section
  const section = document.getElementById('cards-section');
  if(section){
    observer.observe(section);
  }
});