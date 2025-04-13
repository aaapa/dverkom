const buttonTextWrapper = document.querySelector('.home__button-text-wrapper');

if (buttonTextWrapper) {
  buttonTextWrapper.style.transition = 'transform 0.5s ease-in-out';
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const maxScrollPosition = document.body.offsetHeight - window.innerHeight;
    
    const scrollPercent = (scrollPosition / maxScrollPosition) * 100;

    buttonTextWrapper.style.transform = `rotate(${scrollPercent * 20}deg)`;
  });
}
