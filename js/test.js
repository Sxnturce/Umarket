const swiper = new Swiper('.swiper-cards', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerGroup: 4,
    spaceBetween: 16,
    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        // when window width is >= 640px
        860: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        // when window width is >= 480px
        620: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 320px
        490: {
            slidesPerView: 1,
            spaceBetween: 10
        },
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});