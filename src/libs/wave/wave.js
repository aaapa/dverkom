document.addEventListener('DOMContentLoaded', () => {
  const createWaveEffect = (element) => {
    const defaultColor = 'rgba(0, 0, 0, 0.3)';
    const waveAttr = element.getAttribute('data-wave');
    const waveColor = waveAttr || defaultColor;
    const waveDuration = 1.5;

    const isValidColorOrGradient = (value) => {
      const tempDiv = document.createElement('div');
      tempDiv.style.backgroundImage = '';
      tempDiv.style.backgroundImage = value;
      if (tempDiv.style.backgroundImage !== '') {
        return true;
      }

      tempDiv.style.backgroundColor = '';
      tempDiv.style.backgroundColor = value;
      return !!tempDiv.style.backgroundColor;
    };

    const effectiveWaveColor = isValidColorOrGradient(waveColor)
      ? waveColor
      : defaultColor;

    const style = document.createElement('style');
    style.innerHTML = `
      .wave-wrapper {
        overflow: hidden;
        position: relative;
        pointer-events: inherit;
        display: inline-block;
        transition: all 0.15s;
      }

      .wave-effect {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        animation: wave-animation ${waveDuration}s ease-out;
        transform: scale(0);
        opacity: 0.6;
      }

      @keyframes wave-animation {
        0% {
          transform: scale(0);
          opacity: 0.6;
        }
        100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const addWaveEffect = (event, target) => {
      const rect = target.getBoundingClientRect();
      const wave = document.createElement('span');
      wave.classList.add('wave-effect');

      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      wave.style.width = `${size}px`;
      wave.style.height = `${size}px`;
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;

      if (
        effectiveWaveColor.startsWith('linear-gradient') ||
        effectiveWaveColor.startsWith('radial-gradient') ||
        effectiveWaveColor.startsWith('conic-gradient') ||
        effectiveWaveColor.startsWith('repeating-')
      ) {
        wave.style.backgroundImage = effectiveWaveColor;
      } else {
        wave.style.backgroundColor = effectiveWaveColor;
      }

      target.appendChild(wave);
      wave.addEventListener('animationend', () => {
        wave.remove();
      });
    };

    const tagsNeedingWrapper = [
      'area',
      'embed',
      'hr',
      'img',
      'input',
      'select',
      'textarea',
      'svg',
    ];

    const observer = new ResizeObserver(() => {
      if (element.parentNode.classList.contains('wave-wrapper')) {
        const wrapper = element.parentNode;
        const computedStyle = getComputedStyle(element);
        const outlineWidth = parseFloat(computedStyle.outlineWidth) || 0;
        const borderWidth = parseFloat(computedStyle.borderWidth) || 0;
        const borderRadius = computedStyle.borderRadius;

        wrapper.style.width = `${element.offsetWidth + outlineWidth * 2 + borderWidth * 2}px`;
        wrapper.style.height = `${element.offsetHeight + outlineWidth * 2 + borderWidth * 2}px`;
        wrapper.style.borderRadius = borderRadius;
      }
    });

    if (tagsNeedingWrapper.includes(element.tagName.toLowerCase())) {
      const wrapper = document.createElement('div');
      wrapper.className = 'wave-wrapper';

      const computedStyle = getComputedStyle(element);
      const outlineWidth = parseFloat(computedStyle.outlineWidth) || 0;
      const borderWidth = parseFloat(computedStyle.borderWidth) || 0;
      const borderRadius = computedStyle.borderRadius;

      wrapper.style.width = `${element.offsetWidth + outlineWidth * 2 + borderWidth * 2}px`;
      wrapper.style.height = `${element.offsetHeight + outlineWidth * 2 + borderWidth * 2}px`;
      wrapper.style.borderRadius = borderRadius;

      wrapper.style.margin = computedStyle.margin;
      wrapper.style.position =
        computedStyle.position !== 'static' ? computedStyle.position : 'relative';

      element.parentNode.replaceChild(wrapper, element);
      wrapper.appendChild(element);

      observer.observe(element);

      wrapper.addEventListener('mousedown', (event) => {
        if (event.button === 0 || event.button === 1 || event.button === 2) {
          addWaveEffect(event, wrapper);
          if (event.button === 2) {
            event.preventDefault();
          }
          event.stopPropagation();
        }
       });
      
    } else {
       element.style.position = 'relative';
       element.style.overflow = 'hidden';
       element.addEventListener('mousedown', (event) => 
         addWaveEffect(event, element)
       );

       element.addEventListener('mousedown', (event) => {
         if (event.button === 0 || event.button === 1 || event.button === 2) {
           addWaveEffect(event, element);
           if (event.button === 2) {
             event.preventDefault();
           }
           event.stopPropagation();
         }
       });
    }
  };

  const elements = document.body.querySelectorAll('[data-wave]');

  elements.forEach((element) => {
    createWaveEffect(element);
  });
});
