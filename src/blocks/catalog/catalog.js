import modal from '../../components/modal/modal.js';
import facadesData from '../../data/фасады.json';
import apronsData from '../../data/фартуки.json';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const createCatalogCards = (data, dataType, selector) => {
  const catalogList = document.querySelector(selector);
  if (!catalogList) return;
  catalogList.innerHTML = '';
  data.forEach(item => {
    const title = item.name ? `<h5 class="catalog__card-title">${item.name}</h5>` : '';
    const image = item.preview ? `<img class="catalog__card-image" src="${item.preview}" alt="${item.name || dataType}" />` : '';
    const link = item.link ? `<a class="catalog__card-button" href="${item.link}" data-wave><span>Подробнее</span></a>` : '';
    const cardLink = item.link ? `<a class="catalog__card-link" href="${item.link}"></a>` : '';
    
    const listItemHTML = `
      <li class="catalog__list-item" data-sal="slide-up" data-sal-delay="300" data-sal-duration="1000" data-sal-easing="ease-out-back">
        <div class="catalog__card" data-id="${item.id}" data-type="${dataType}">
          <div class="catalog__card-top">
            ${title}
          </div>
          ${image}
          <div class="catalog__card-bottom">
            ${link}
          </div>
            ${cardLink}
        </div>
      </li>
    `;
    catalogList.insertAdjacentHTML('beforeend', listItemHTML);
  });
};

createCatalogCards(facadesData, 'facades', '.catalog__list.facades-list');
createCatalogCards(apronsData, 'aprons', '.catalog__list.aprons-list');

const createCatalogSlider = () => {
  class CatalogCard extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const catalogCard = document.createElement('section');
      catalogCard.className = 'catalog catalog-info';

      let dataItem = null;
      let dataType = '';
      if (this.dataset.facadeId) {
        dataItem = facadesData.find(item => item.id === parseInt(this.dataset.facadeId));
        dataType = 'facades';
      } else if (this.dataset.apronId) {
        dataItem = apronsData.find(item => item.id === parseInt(this.dataset.apronId));
        dataType = 'aprons';
      }

      if (!dataItem) return;

      const currentURL = `${dataItem.name.toLowerCase()}.html`;

      let mainTitle = '';
      let description = '';
      let descriptionClass = '';
      let secondLink = '';

      if (dataType === 'facades') {
        mainTitle = 'Фасады';
        description = `Коллекции фасадов на основе плиты МДФ <br> и термическим восстановлением`;
        descriptionClass = 'facade-title';
        secondLink = 'фасады.html';
        descriptionClass = 'facades-desc';
      } else if (dataType === 'aprons') {
        mainTitle = 'Фартуки';
        description = `Коллекции фартуков на основе мозайки и <br> плиты МДФ`;
        descriptionClass = 'aprons-desc';
        secondLink = 'фартуки.html';
      }

      let topSliderSlides = '';
      let thumbsSliderSlides = '';

      topSliderSlides += `
        <div class="catalog__info-slide-top swiper-slide">
          <div class="catalog__info-card">
            <img class="catalog__info-image" src="${dataItem.preview}" alt="${dataItem.name}">
          </div>
        </div>
      `;

      thumbsSliderSlides += `
        <div class="catalog__info-thumb swiper-slide">
          <div class="catalog__info-card">
            <img class="catalog__info-image" src="${dataItem.preview}" alt="${dataItem.name}">
          </div>
        </div>
      `;

      if (dataItem['slider-images']) {
        dataItem['slider-images'].forEach(imageSrc => {
          topSliderSlides += `
            <div class="catalog__info-slide-top swiper-slide">
              <div class="catalog__info-card">
                <img class="catalog__info-image" src="${imageSrc}" alt="${dataItem.name}">
              </div>
            </div>
          `;
          thumbsSliderSlides += `
            <div class="catalog__info-thumb swiper-slide">
              <div class="catalog__info-card">
                <img class="catalog__info-image" src="${imageSrc}" alt="${dataItem.name}">
              </div>
            </div>
          `;
        });
      }

      const catalogCardHTML = `
        <div class="catalog__inner container">
          <div class="catalog__breadcrumbs breadcrumbs">
            <div class="breadcrumbs__inner">
              <nav class="breadcrumbs__nav" aria-label="Навигация по сайту">
                <ul class="breadcrumbs__list">
                  <li class="breadcrumbs__list-item">
                    <a class="breadcrumbs__link" href="index.html">Главная</a>
                  </li>
                  <li class="breadcrumbs__list-item">
                    <a class="breadcrumbs__link" href="${secondLink}">${mainTitle}</a>
                  </li>
                  <li class="breadcrumbs__list-item">
                    <a class="breadcrumbs__link" href="${currentURL}" aria-current="page">${dataItem.name}</a>
                  </li>
                </ul>
              </nav>
              <a class="catalog__modal-close-button card-close" href="index.html" data-tippy-content="На главную">
                <span class="catalog__modal-close-button-icon"></span>
                <span class="visually-hidden">На главную</span>
              </a>
            </div>
          </div>
          <div class="catalog__top">
            <h2 class="title big decor decor-left">${mainTitle}</h2>
            <p class="catalog__desc ${descriptionClass}">
              ${description}
            </p>
          </div>
          <div class="catalog__info" data-id="${dataItem.id}" data-type="${dataType}">
            <div class="catalog__info-slider">
              <div class="catalog__info-slider-top swiper">
                <div class="swiper-wrapper">
                  ${topSliderSlides}
                </div>
                <div class="catalog__info-slider-buttons">
              <!--    <button class="catalog__zoom-button" type="button" data-tippy-content="Увеличить фото">
                    <span class="catalog__zoom-button-icon">
                      <span class="icon zoom"></span>
                    </span>
                    <span class="visually-hidden">Увеличить фото</span>
                  </button>  -->                  
                 <div class="catalog__info-slider-row">
                  <button class="catalog__info-slider-button prev" type="button" data-tippy-content="Предыдущие фото">
                    <span class="catalog__info-slider-button-icon">
                      <span class="icon arrow-short-left"></span>
                    </span>
                    <span class="visually-hidden">Предыдущие фото</span>
                  </button>
                  <button class="catalog__info-slider-button next" type="button" data-tippy-content="Следующие фото">
                    <span class="catalog__info-slider-button-icon">
                      <span class="icon arrow-short-right"></span>
                    </span>
                    <span class="visually-hidden">Следующие фото</span>
                  </button>                 
                 </div>
                </div>
              </div>
              <div class="catalog__info-thumbs swiper">
                <div class="swiper-wrapper">
                  ${thumbsSliderSlides}
                </div>
              </div>
            </div>
            <div class="catalog__info-details">
             <h2 class="catalog__info-title">${dataItem.name}</h2>
             <ul class="catalog__info-details-list">
              <li class="catalog__info-details-item">
               <span class="catalog__info-details-key">Теплоизоляция</span>
               <span class="catalog__info-details-value">Сохранение тепла</span>
              </li>
              <li class="catalog__info-details-item">
               <span class="catalog__info-details-key">Шумоизоляция</span>
               <span class="catalog__info-details-value">Снижение шума</span>
              </li>
              <li class="catalog__info-details-item">
               <span class="catalog__info-details-key">Влагозащита</span>
               <span class="catalog__info-details-value">Защита от влаги</span>
              </li>
              <li class="catalog__info-details-item">
               <span class="catalog__info-details-key">Устойчивость</span>
               <span class="catalog__info-details-value">Долговечность</span>
              </li>
              <li class="catalog__info-details-item">
               <span class="catalog__info-details-key">Эстетика</span>
               <span class="catalog__info-details-value">Внешний вид</span>
              </li>
             </ul>
             <a class="button long" href="#feedback" data-wave="rgb(255 255 255 / 40%)">Сотрудничать</a>
            </div>
          </div>
        </div>
      `;
      catalogCard.insertAdjacentHTML('beforeend', catalogCardHTML);

      Array.from(this.attributes).forEach(attr => {
        catalogCard.setAttribute(attr.name, attr.value);
      });

      this.replaceWith(catalogCard);

      const topSlider = new Swiper(catalogCard.querySelector('.catalog__info-slider-top'), {
        spaceBetween: 10,
        grabCursor: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        navigation: {
          nextEl: catalogCard.querySelector('.catalog__info-slider-button.next'),
          prevEl: catalogCard.querySelector('.catalog__info-slider-button.prev'),
        },
      });

      const thumbsSlider = new Swiper(catalogCard.querySelector('.catalog__info-thumbs'), {
        spaceBetween: 22,
        slidesPerView: 4,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
      });

      thumbsSlider.controller.control = topSlider;

      thumbsSlider.on('click', function (swiper) {
        topSlider.slideTo(swiper.clickedIndex);
      });

      const catalogInfo = catalogCard.querySelector('.catalog__info');
      if (catalogInfo) {
          const zoomButton = catalogInfo.querySelector('.catalog__zoom-button');
          if (zoomButton) {
              zoomButton.addEventListener('click', (event) => {
                  event.preventDefault();
                  const id = catalogInfo.dataset.id;
                  const type = catalogInfo.dataset.type;
                  const dataItem = type === 'facades' ? facadesData.find(item => item.id === parseInt(id)) : apronsData.find(item => item.id === parseInt(id));

                  if (dataItem) {
                      const modalContent = `
                        <div class="catalog__modal-slider-wrapper">
                          <button class="catalog__modal-slider-button prev" type="button" data-tippy-content="Предыдущее фото">
                            <span class="catalog__modal-slider-button-icon">
                              <span class="icon arrow-short-left"></span>
                            </span>
                            <span class="visually-hidden">Предыдущее фото</span>
                          </button>
                          <button id="modal-close-button" class="catalog__modal-close-button" type="button" data-tippy-content="Закрыть галерею">
                            <span class="catalog__modal-close-button-icon"></span>
                            <span class="visually-hidden">Закрыть галерею</span>
                          </button>       
                          <div class="catalog__modal-slider swiper">
                            <div class="swiper-wrapper">
                              <div class="catalog__modal-slider-slide swiper-slide">
                                <div class="catalog__modal-card">
                                  <img class="catalog__modal-card-image" src="${dataItem.preview}" alt="${dataItem.name}">
                                </div>
                              </div>
                              ${dataItem['slider-images'] ? dataItem['slider-images'].map(imageSrc => `
                                <div class="catalog__modal-slider-slide swiper-slide">
                                  <div class="catalog__modal-card">
                                    <img class="catalog__modal-card-image" src="${imageSrc}" alt="${dataItem.name}">
                                  </div>
                                </div>
                              `).join('') : ''}
                            </div>
                          </div>
                          <button class="catalog__modal-slider-button next" type="button" data-tippy-content="Следующее фото">
                            <span class="catalog__modal-slider-button-icon">
                              <span class="icon arrow-short-right"></span>
                            </span>
                            <span class="visually-hidden">Следующее фото</span>
                          </button>      
                        </div>
                      `;

                      const modalInstance = modal(modalContent);
                      modalInstance.open();

                      const swiper = new Swiper(modalInstance.dialog.querySelector('.catalog__modal-slider'), {
                        grabCursor: true,

                        keyboard: {
                          enabled: true,
                          onlyInViewport: true,
                        },
                        
                        navigation: {
                              nextEl: modalInstance.dialog.querySelector('.catalog__modal-slider-button.next'),
                              prevEl: modalInstance.dialog.querySelector('.catalog__modal-slider-button.prev'),
                          },
                      });
                  }
              });
          }
      }
    }
  }

  customElements.define('catalog-card', CatalogCard);
};
createCatalogSlider();
