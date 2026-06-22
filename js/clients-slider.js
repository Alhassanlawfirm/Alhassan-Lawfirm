document.addEventListener('DOMContentLoaded', () => {
  const slider      = document.querySelector('.clients-slider');
  const wrapper     = document.querySelector('.clients-slider-wrapper');
  const prevBtn     = document.querySelector('.slider-prev');
  const nextBtn     = document.querySelector('.slider-next');
  const items       = document.querySelectorAll('.client-item');

  let itemWidth     = calcItemWidth();
  let visibleCount  = calcVisibleCount();
  let currentIndex  = 0;
  let maxIndex      = items.length - visibleCount;

  function calcItemWidth() {
    const style = window.getComputedStyle(items[0]);
    return items[0].offsetWidth +
           parseInt(style.marginLeft) +
           parseInt(style.marginRight);
  }

  function calcVisibleCount() {
    return Math.floor(wrapper.offsetWidth / itemWidth);
  }

  function moveSlider() {
    slider.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    updateButtons();
  }

  function updateButtons() {
    prevBtn.classList.toggle('disabled', currentIndex === 0);
    nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);
  }

  function changeSlide(direction) {
    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex > maxIndex) return;
    currentIndex = newIndex;
    moveSlider();
  }

  prevBtn.addEventListener('click', () => changeSlide(-1));
  nextBtn.addEventListener('click', () => changeSlide(1));

  window.addEventListener('resize', () => {
    itemWidth    = calcItemWidth();
    visibleCount = calcVisibleCount();
    maxIndex     = items.length - visibleCount;
    moveSlider();
  });

  moveSlider();
});
