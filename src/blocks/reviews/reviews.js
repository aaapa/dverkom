import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const sliders = document.querySelectorAll('.reviews__slider');

const moveCards = () => {
  const mediaQuery = window.matchMedia('(max-width: 62rem)');

  sliders.forEach(slider => {
    const slidesWrapper = slider.querySelector('.reviews__slider-slides');
    const allCards = slider.querySelectorAll('.reviews__card');
    const originalSlides = Array.from(slidesWrapper.querySelectorAll('.reviews__slider-slide'));

    if (mediaQuery.matches) {
      originalSlides.forEach(slide => slide.remove());

      allCards.forEach(card => {
        const newSlide = document.createElement('li');
        newSlide.className = 'reviews__slider-slide swiper-slide';
        newSlide.appendChild(card);
        slidesWrapper.appendChild(newSlide);
      });
    } else {
      const groupedCards = [];
      originalSlides.forEach(slide => slide.remove());

      let currentGroup = [];
      allCards.forEach((card, index) => {
        currentGroup.push(card.cloneNode(true));

        if ((index + 1) % 6 === 0 || index === allCards.length - 1) {
          groupedCards.push(currentGroup);
          currentGroup = [];
        }
      });

      groupedCards.forEach(group => {
        const newSlide = document.createElement('li');
        newSlide.className = 'reviews__slider-slide swiper-slide';

        const newCardsContainer = document.createElement('div');
        newCardsContainer.className = 'reviews__cards';

        group.forEach(card => newCardsContainer.appendChild(card));
        newSlide.appendChild(newCardsContainer);
        slidesWrapper.appendChild(newSlide);
      });
    }

    const swiperInstance = slider.swiper;
    if (swiperInstance) {
      swiperInstance.destroy();
    }

    new Swiper(slider, {
      modules: [Navigation, Pagination],
      loop: true,
      slidesPerView: 1,

      navigation: {
        nextEl: slider.querySelector('.reviews__slider-button.next'),
        prevEl: slider.querySelector('.reviews__slider-button.prev'),
      },

      pagination: {
        el: slider.querySelector('.reviews__slider-pagination'),
        clickable: true,
        renderBullet: (index, className) => {
          return `
            <button class="reviews__slider-pagination-button ${className}" type="button" data-tippy-content="Блок комментариев ${index + 1}">
              <span class="visually-hidden">Блок комментариев ${index + 1}</span>
            </button>
          `;
        },
      },

      grabCursor: true,

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    });
  });
};

window.addEventListener('resize', moveCards);
moveCards();