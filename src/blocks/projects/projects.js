import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const sliders = document.querySelectorAll('.projects__slider');

sliders.forEach(slider => {
  new Swiper(slider, {
    modules: [Navigation, Pagination],
    loop: true,
    slidesPerView: 1,

    pagination: {
      el: slider.querySelector('.projects__slider-pagination'),
      clickable: true,
      renderBullet: function (index, className) {
        return `
          <button class="projects__slider-pagination-button ${className}" type="button" data-tippy-content="Проект ${index + 1}">
            <span class="visually-hidden">Открыть проект ${index + 1}</span>
          </button>
        `;
      },
    },

    grabCursor: true,

    navigation: {
      nextEl: slider.querySelector('.projects__slider-button.next'),
      prevEl: slider.querySelector('.projects__slider-button.prev'),
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
});
