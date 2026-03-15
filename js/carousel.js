function setupCarousel() {
  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('.dot');
  let originalSlides = [...track.children];
  const totalOriginalSlides = originalSlides.length;
  
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[totalOriginalSlides - 1].cloneNode(true);
  track.insertBefore(lastClone, originalSlides[0]);
  track.appendChild(firstClone);
  
  let slides = track.children;
  const totalSlides = slides.length;
  
  let currentIndex = 1;
  let autoPlayInterval;
  let autoPlayTimeout;
  
  function updateDots(index) {
    const dotIndex = (index - 1 + totalOriginalSlides) % totalOriginalSlides;
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-gray-50', i === dotIndex);
      dot.classList.toggle('bg-gray-400', i !== dotIndex);
    });
  };
  
  function goToSlide(index, isInstant = false) {
    if (isInstant) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.7s ease-in-out';
    }
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots(index);
  };
  
  function nextSlide() {
    currentIndex++;
    goToSlide(currentIndex);
    
    if (currentIndex === totalSlides - 1) {
      setTimeout(() => {
        currentIndex = 1;
        goToSlide(currentIndex, true);
      }, 700);
    }
  };
  
  function prevSlide() {
    currentIndex--;
    goToSlide(currentIndex);
    
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = totalOriginalSlides;
        goToSlide(currentIndex, true);
      }, 700);
    }
  }
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000);
  }
  
  function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
    clearTimeout(autoPlayTimeout);
    autoPlayTimeout = setTimeout(startAutoPlay, 9000);
  }
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  
  track.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  });
  
  track.addEventListener('touchend', () => {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      pauseAutoPlay();
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });
  
  goToSlide(currentIndex, true);
  updateDots(currentIndex);
  startAutoPlay();
};

setupCarousel()
