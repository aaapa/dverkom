export const modal = (htmlContent) => {
  const dialog = document.createElement('dialog');
  dialog.className = 'modal';

  const modalInner = document.createElement('div');
  modalInner.classList.add('modal__inner', 'container');
  modalInner.insertAdjacentHTML('beforeend', htmlContent);

  dialog.append(modalInner);
  document.body.append(dialog);
  document.documentElement.classList.add('scroll-lock');

  const openModal = () => {
    dialog.showModal();

    addEventListeners();
  };

  const closeModal = () => {
    dialog.close();
    dialog.remove();
    document.documentElement.classList.remove('scroll-lock');
    removeEventListeners(); 
  };

  const addEventListeners = () => {

    window.addEventListener('keydown', handleKeyDown);

    const closeButton = document.getElementById('modal-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
      closeButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          closeModal();
        }
      });
    }
  };

  const removeEventListeners = () => {
    window.removeEventListener('keydown', handleKeyDown);

    const closeButton = document.getElementById('close-modal-button');
    if (closeButton) {
      closeButton.removeEventListener('click', closeModal);
      closeButton.removeEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          closeModal();
        }
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return {
    open: openModal,
    close: closeModal,
    dialog: dialog
  };
};

export default modal;