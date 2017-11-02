/**
 * Created by stu on 5/8/17.
 */

(function(){
    'use strict';
    const desktopScroll = window.matchMedia( "(min-width: 800px)" );

    function scrollSpy(){
        window.addEventListener("scroll", function scrollSpy() {
            var offsetHeight = 200;
            var navLinkHash;
            var dataItemId;
            const dataItems = document.querySelectorAll(".content__section");
            const navLinks = document.querySelectorAll(".sideBar__list a");
            const navBullets = document.querySelectorAll(".sideBar__item");
            for ( let j = 0; j < dataItems.length; j++) {
                offsetHeight = dataItems[j].offsetHeight;
                if (dataItems[j].getBoundingClientRect().top <= offsetHeight && dataItems[j].getBoundingClientRect().top <= offsetHeight) {
                    for (let i = 0; i < navLinks.length; i++) {
                        if(navBullets[i].classList.contains('sideBar--scrollSpyActive')){
                            navBullets[i].classList.remove('sideBar--scrollSpyActive');
                        }
                        navLinkHash = navLinks[i].hash;
                        if (navLinkHash !== "") {
                            dataItemId = dataItems[j].getAttribute("id");
                            if (navLinks[i].hash === "#" + dataItemId) {
                                navBullets[i].classList.add('sideBar--scrollSpyActive');
                            }
                        }
                    }
                }
            }
        });
    }
    if (desktopScroll.matches) {
       scrollSpy();
    }
})();