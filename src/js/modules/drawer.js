import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

function Drawer() {

    const bslTarget = document.querySelector('.drawer')

    if (!Element.prototype.closest) {
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
        }
        Element.prototype.closest = function(s) {
            let el = this
            let ancestor = this
            if (!document.documentElement.contains(el)) return null
            do {
                if (ancestor.matches(s)) return ancestor
                ancestor = ancestor.parentElement
            } while (ancestor !== null)
            return null
        }
    }

    function trapFocus(element) {
        let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
        let firstFocusableEl = focusableEls[0]
        let lastFocusableEl = focusableEls[focusableEls.length - 1]
        let KEYCODE_TAB = 9

        element.addEventListener('keydown', function(e) {
            let isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB)

            if (!isTabPressed) {
                return
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus()
                    e.preventDefault()
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus()
                    e.preventDefault()
                }
            }
        })
    }

    let settings = {
        speedOpen: 50,
        speedClose: 350,
        activeClass: 'is-active',
        visibleClass: 'is-visible',
        selectorTarget: '[data-drawer-target]',
        selectorTrigger: '[data-drawer-trigger]',
        selectorClose: '[data-drawer-close]',
    }

    let toggleAccessibility = function(event) {
        if (event.getAttribute('aria-expanded') === 'true') {
            event.setAttribute('aria-expanded', false)
        } else {
            event.setAttribute('aria-expanded', true)
        }
    }

    let openDrawer = function(trigger) {

        disableBodyScroll(bslTarget)

        let target = document.getElementById(trigger.getAttribute('aria-controls'))

        target.classList.add(settings.activeClass)

        toggleAccessibility(trigger)

        setTimeout(function() {
            target.classList.add(settings.visibleClass)
            trapFocus(target)
        }, settings.speedOpen)

    }

    let closeDrawer = function(event) {

        enableBodyScroll(bslTarget)

        let closestParent = event.closest(settings.selectorTarget),
            childrenTrigger = document.querySelector('[aria-controls="' + closestParent.id + '"')

        closestParent.classList.remove(settings.visibleClass)

        toggleAccessibility(childrenTrigger)

        setTimeout(function() {
            closestParent.classList.remove(settings.activeClass)
        }, settings.speedClose)

    }

    let clickHandler = function(event) {

        let toggle = event.target,
            open = toggle.closest(settings.selectorTrigger),
            close = toggle.closest(settings.selectorClose)

        if (open) {
            openDrawer(open)
        }

        if (close) {
            closeDrawer(close)
        }

        if (open || close) {
            event.preventDefault()
        }

    }

    let keydownHandler = function(event) {

        if (event.key === 'Escape' || event.keyCode === 27) {

            let drawers = document.querySelectorAll(settings.selectorTarget),
                i;

            for (i = 0; i < drawers.length; ++i) {
                if (drawers[i].classList.contains(settings.activeClass)) {
                    closeDrawer(drawers[i])
                }
            }

        }

    }

    document.addEventListener('click', clickHandler, false)
    document.addEventListener('keydown', keydownHandler, false)

}

Drawer()


