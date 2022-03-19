export function Responsive() {

    function resChange(e) {
        e.matches ? movie('desktop') : movie('mobile')
    }

    function movie(to) {
        Array.prototype.find.call(
            document.querySelectorAll('[data-movable]'),
            function(movable) {
                let attrVal = movable.getAttribute('data-movable')
                document
                    .querySelector('[data-'+to+'="'+attrVal+'"]')
                    .insertAdjacentElement('afterBegin', movable)
            }
        )
    }

    (function() {
        let mediaQuery = window.matchMedia('(min-width: 992px)')
        mediaQuery.addListener(resChange)
        resChange(mediaQuery)
    })()

}


