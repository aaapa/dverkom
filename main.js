import '@/scss/simple-normalize.scss';
import '@/scss/base.scss';

import '@/blocks/home/home.scss';
import '@/blocks/about/about.scss';
import '@/blocks/cta/cta.scss';
import '@/blocks/projects/projects.scss';
import '@/blocks/feedback/feedback.scss';
import '@/blocks/reviews/reviews.scss';
import '@/blocks/services/services.scss';
import '@/blocks/catalog/catalog.scss';

import '@/components/header/header.scss';
import '@/components/logo/logo.scss';
import '@/components/menu-button/menu-button.scss';
import '@/components/button/button.scss';
import '@/components/modal/modal.scss';
import '@/components/icon/icon.scss';
import '@/components/socials/socials.scss';
import '@/components/title/title.scss';
import '@/components/button/button.scss';
import '@/components/breadcrumbs/breadcrumbs.scss';
import '@/components/footer/footer.scss';

import '@/blocks/home/home.js';
import '@/blocks/catalog/catalog.js';
import '@/blocks/feedback/feedback.js';
import '@/blocks/projects/projects.js';
import '@/blocks/reviews/reviews.js';

import '@/components/header/header.js';
import '@/components/modal/modal.js';

import sal from 'sal.js';
import 'sal.js/dist/sal.css';
sal({
  once: true,
  threshold: 0.1,
});

import '@/libs/wave/wave.js';

import 'swiper/swiper-bundle.css';

import PureCounter from '@srexi/purecounterjs';
new PureCounter();

import 'simplebar';
import 'simplebar/dist/simplebar.css';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
tippy('[data-tippy-content]');