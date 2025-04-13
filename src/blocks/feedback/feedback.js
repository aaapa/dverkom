import IMask from 'imask';

const initializeForm = (form) => {
  if (!form.querySelector('.feedback__message')) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'feedback__message';
    form.querySelector('.feedback__form-bottom').appendChild(messageContainer);
  }

  let nameInput = form.querySelector('.name');
  if (nameInput && !nameInput.dataset.maskInitialized) {
    IMask(nameInput, {
      mask: /^[a-zA-Zа-яА-ЯёЁ\u00C0-\u017F\s]+$/,
    });
    nameInput.dataset.maskInitialized = true;
  }

  let telInput = form.querySelector('.tel');
  if (telInput && !telInput.dataset.maskInitialized) {
    let phoneMask;

    const applyMask = () => {
      if (!phoneMask) {
        phoneMask = IMask(telInput, {
          mask: '+{7} (000) 000-00-00',
          lazy: false,
        });
      }
    };

    telInput.addEventListener('focus', applyMask);
    telInput.addEventListener('click', applyMask);

    telInput.addEventListener('blur', () => {
      if (telInput.value.trim() === '') {
        phoneMask.destroy();
        phoneMask = null;
      }
    });

    telInput.dataset.maskInitialized = true;
  }

  if (!form.dataset.submitHandlerInitialized) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const messageContainer = form.querySelector('.feedback__message');
      const name = form.querySelector('.name').value.trim();
      const email = form.querySelector('.email').value.trim();
      const phone = form.querySelector('.tel').value.trim();

      if (!name || !email || !phone) {
        messageContainer.innerHTML = '<span class="feedback__message-error">Пожалуйста, заполните все поля!</span>';
        return;
      }

      const message = `Новая заявка:\nИмя: ${name}\nEmail: ${email}\nТелефон: ${phone}`;
      sendMessageToTelegram(message)
        .then(() => {
          messageContainer.innerHTML =
            '<span class="feedback__message-success">Сообщение успешно отправлено! Ожидайте ответа</span>';
          form.reset();
        })
        .catch((error) => {
          messageContainer.innerHTML = `<span class="feedback__message-error">${error.message}</span>`;
        });
    });

    form.dataset.submitHandlerInitialized = true;
  }
};

const sendMessageToTelegram = async (message) => {
  const token = '7557757579:AAGOuOeF-he2Up1mSSVTl3U-bs0vl9tS9WM';
  const chatId = '-1002359277353';
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка отправки: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    throw error;
  }
};

document.querySelectorAll('.feedback__form').forEach((form) => initializeForm(form));

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('feedback__form')) {
        initializeForm(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.querySelectorAll('.feedback__form').forEach((form) => initializeForm(form));
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
