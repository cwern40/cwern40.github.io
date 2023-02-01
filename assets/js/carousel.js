let slideIndex = 0;

carousel();

function carousel() {
    let carouselItems = document.querySelectorAll('.carousel');
    carouselItems.forEach(item => {
        item.classList.remove("carousel-show");
    })

    slideIndex++;
    if (slideIndex > carouselItems.length) slideIndex = 1;
    carouselItems[slideIndex - 1].classList.add("carousel-show");
    setTimeout(carousel, 2500);
}