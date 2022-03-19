import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

new Splide('.carousel-logos', {
    arrows: false,
    pagination: false,
    type: 'loop',
    drag: false,
    focus: 'center',
    autoScroll: {
        speed: 0.3,
        pauseOnHover: false,
        pauseOnFocus: false
    },
    perPage: 6,
    breakpoints: {
        992: {
            perPage: 5
        },
        768: {
            perPage: 4
        },
        576: {
            perPage: 3,
            autoScroll: {
                speed: 0.5
            }
        }
    }
}).mount({ AutoScroll })

new Splide('.carousel-subscribe', {
    // type: 'loop',
    padding: 40,
    gap: 10,
    arrows: false,
    pagination: false,
    mediaQuery: 'min',
    breakpoints: {
        992: {
            destroy: true
        }
    }
}).mount()


