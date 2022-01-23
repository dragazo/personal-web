const SLIDESHOW_TIME = 10000;

function setSlideshowSlide(id, n) {
    const slideshow = document.getElementById(id);
    const slides = slideshow.getElementsByClassName('slideshow-content');
    const dots = slideshow.getElementsByClassName('slideshow-dot');
    for (const slide of slides) slide.style.display = 'none';
    for (const dot of dots) dot.classList.remove('selected');
    slides[n].style.display = 'block';
    dots[n].classList.add('selected');
}
function slideshowNext(id) {
    const slideshow = document.getElementById(id);
    const slides = slideshow.getElementsByClassName('slideshow-content');
    let index = -1;
    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].style.display === 'block') { index = i; break; }
    }
    setSlideshowSlide(id, (index + 1) % slides.length);
}
function slideshowPrev(id) {
    const slideshow = document.getElementById(id);
    const slides = slideshow.getElementsByClassName('slideshow-content');
    let index = slides.length;
    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].style.display === 'block') { index = i; break; }
    }
    setSlideshowSlide(id, (index + slides.length - 1) % slides.length);
}

window.addEventListener('load', () => {
    for (const slideshow of document.getElementsByClassName('slideshow')) {
        const id = slideshow.id;
        setSlideshowSlide(id, 0);

        let timerId = undefined;
        const animator = function () {
            slideshowNext(id);
            timerId = setTimeout(animator, SLIDESHOW_TIME);
        };
        timerId = setTimeout(animator, SLIDESHOW_TIME);
        slideshow.addEventListener('mouseenter', () => {
            if (timerId) {
                clearTimeout(timerId);
                timerId = undefined;
            }
        });
        slideshow.addEventListener('mouseleave', () => {
            if (!timerId) timerId = setTimeout(animator, SLIDESHOW_TIME);
        });
    }
    for (const container of document.getElementsByClassName('counter-container')) {
        const items = container.getElementsByClassName('counter-value');
        const reversed = container.classList.contains('reversed');
        const mapper = reversed ? i => items.length - i : i => i + 1;

        for (let i = 0; i < items.length; ++i) {
            items[i].textContent = `${mapper(i)}`;
        }
    }
});