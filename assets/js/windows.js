document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  let index = 0;

  function showSlide() {
    const slideWidth = document.querySelector('.slide').clientWidth;
    slides.style.transform = `translateX(${-index * slideWidth}px)`;
  }

  setInterval(() => {
    index = (index + 1) % 3; // Cycle through 3 slides
    showSlide();
  }, 12000); // Change slide every 12 seconds
});
