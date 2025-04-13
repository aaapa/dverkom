class SiteHeader extends HTMLElement {
  constructor() {
    super();

    this.SELECTORS = {
      HEADER: '.header',
      MENU: '.header__menu',
      MENU_BUTTON: '.header__menu-button',
      SCROLL_LOCK: 'scroll-lock',
      OPEN: 'open',
      SCROLLED: 'scrolled',
    };

    this.ATTRIBUTES = {
      ARIA_EXPANDED: 'aria-expanded',
      ARIA_HIDDEN: 'aria-hidden',
      INERT: 'inert',
    };
  }

  connectedCallback() {
    const header = document.createElement('header');
    header.className = 'header';

    const headerHTML = `
      <div class="header__inner container">
        <a class="header__logo" href="index.html">
          <img class="logo__image" src="imgs/logo/logo.png" alt="DVERKOM">
        </a>
        <div class="header__menu-wrapper">
          <div class="header__socials socials">
            <nav class="socials__nav">
              <ul class="socials__list">
                <li class="socials__list-item">
                  <a class="socials__link" href="#!" data-tippy-content="WhatsApp">
                    <span class="icon whatsapp"></span>
                    <span class="visually-hidden">WhatsApp</span>
                  </a>
                </li>
                <li class="socials__list-item">
                  <a class="socials__link" href="#!" data-tippy-content="Telegram">
                    <span class="icon telegram"></span>
                    <span class="visually-hidden">Telegram</span>
                  </a>
                </li>
                <li class="socials__list-item">
                  <a class="socials__link" href="#!" data-tippy-content="Instagram">
                    <span class="icon instagram"></span>
                    <span class="visually-hidden">Instagram</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <a class="header__link phone" href="tel:+73434549834">+7 343 454 98 34</a>
          <div class="header__menu" id="header-menu" role="menu" aria-hidden="false">
            <nav class="header__nav">
              <ul class="header__list">
                <li class="header__list-item">
                  <a class="header__link" href="фартуки.html">Фартуки</a>
                </li>
                <li class="header__list-item">
                  <a class="header__link" href="фасады.html">Фасады</a>
                </li>
              </ul>
            </nav>
            <hr class="header__menu-hr">
            <div class="header__menu-bottom">
              <div class="header__menu-column">
                <span class="header__menu-text">Контакты:</span>
                <div class="header__menu-socials socials">
                  <nav class="socials__nav">
                    <ul class="socials__list">
                      <li class="socials__list-item">
                        <a class="socials__link" href="#!" data-tippy-content="WhatsApp">
                          <span class="icon whatsapp"></span>
                          <span class="visually-hidden">WhatsApp</span>
                        </a>
                      </li>
                      <li class="socials__list-item">
                        <a class="socials__link" href="#!" data-tippy-content="Telegram">
                          <span class="icon telegram"></span>
                          <span class="visually-hidden">Telegram</span>
                        </a>
                      </li>
                      <li class="socials__list-item">
                        <a class="socials__link" href="#!" data-tippy-content="Instagram">
                          <span class="icon instagram"></span>
                          <span class="visually-hidden">Instagram</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <a class="header__link phone menu" href="tel:+73434549834">+7 343 454 98 34</a>
              </div>
            </div>
          </div>
          <button class="header__menu-button menu-button" type="button" aria-controls="header-menu" aria-haspopup="menu" aria-label="Открыть мобильное меню" aria-expanded="false" data-tippy-content="Открыть меню">
            <span class="menu-button__icon">
              <span class="menu-button__line"></span>
              <span class="menu-button__line"></span>
              <span class="menu-button__line"></span>
            </span>
            <span class="visually-hidden">Мобильное меню</span>
          </button>
        </div>
      </div>
    `;

    header.insertAdjacentHTML('beforeend', headerHTML);
    this.replaceWith(header);

    const copyAttributes = () => {
      const attributes = Array.from(this.attributes);

      attributes.forEach(attribute => {
        attribute.name === 'class'
          ? header.classList.add(...attribute.value.split(' '))
          : header.setAttribute(attribute.name, attribute.value);
      });
    };
    
    copyAttributes();

    const root = document.documentElement;
    const menu = header.querySelector(this.SELECTORS.MENU);
    const button = header.querySelector(this.SELECTORS.MENU_BUTTON);

    const setMenuState = (isOpen) => {
      menu.classList.toggle(this.SELECTORS.OPEN, isOpen);
      button.classList.toggle(this.SELECTORS.OPEN, isOpen);
      button.setAttribute(this.ATTRIBUTES.ARIA_EXPANDED, isOpen.toString());
      menu.setAttribute(this.ATTRIBUTES.ARIA_HIDDEN, (!isOpen).toString());
      root.classList.toggle(this.SELECTORS.SCROLL_LOCK, isOpen);
      menu.toggleAttribute(this.ATTRIBUTES.INERT, !isOpen);
      button.setAttribute(this.ATTRIBUTES.ARIA_HIDDEN, isOpen.toString());
    };

    const closeMenu = () => setMenuState(false);
    const openMenu = () => setMenuState(true);

    const toggleMenu = () => {
      menu.classList.contains(this.SELECTORS.OPEN) ? closeMenu() : openMenu();
    };

    const initMenu = () => {
      closeMenu();

      button.addEventListener('click', toggleMenu);

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeMenu();
        }
      });
    };

    const handleScroll = () => {
      header.classList.toggle(this.SELECTORS.SCROLLED, window.scrollY > 0);
    };

    initMenu();
    window.addEventListener('scroll', handleScroll);
  }
}

customElements.define('site-header', SiteHeader);