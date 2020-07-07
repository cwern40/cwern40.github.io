let slideIndex = 0;

carousel();

function carousel() {
    let carouselItems = document.querySelectorAll('.carousel');
    carouselItems.forEach(item => {
        item.style.display = "none"
    })

    slideIndex++;
    if (slideIndex > carouselItems.length) slideIndex = 1;
    carouselItems[slideIndex - 1].style.display = "inherit";
    carouselItems[slideIndex - 1].style.margin = "0";
    setTimeout(carousel, 2500);
}