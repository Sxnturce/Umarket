const swiper = new Swiper('.swiper-hero', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    autoplay: {
        delay: 8000,
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


const swiper2 = new Swiper('.swiper-cards', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    slidesPerGroupAuto: true,
    breakpoints: {
        1200: {
            spaceBetween: 25,
        },
        // when window width is >= 640px
        860: {
            spaceBetween: 25
        },
        // when window width is >= 480px
        620: {
            spaceBetween: 20
        },
        // when window width is >= 320px
        490: {
            spaceBetween: 10
        },
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // If we need pagination
});

const swiper3 = new Swiper('.swiper-offerts', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    slidesPerGroupAuto: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});