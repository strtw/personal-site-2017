/**
 * Created by stu on 5/8/17.
 */

(function(){
    'use strict';
    var desktopScroll = window.matchMedia( "(min-width: 800px)" );

    function scrollSpy(){
        window.addEventListener("scroll", function scrollSpy() {
            var i;
            var j;
            var offsetHeight = 200;
            var classCount = 0;
            var navLinkHash;
            var dataItemId;
            var dataItems = document.querySelectorAll(".content__section");
            var navLinks = document.querySelectorAll(".sideBar__list a");
            var navBullets = document.querySelectorAll(".sideBar__item");
            for ( j = 0; j < dataItems.length; j++) {
                offsetHeight = dataItems[j].offsetHeight;
                if (dataItems[j].getBoundingClientRect().top <= offsetHeight && dataItems[j].getBoundingClientRect().top <= offsetHeight) {
                    for (i = 0; i < navLinks.length; i++) {
                        if(navBullets[i].classList.contains('sideBar--scrollSpyActive')){
                            navBullets[i].classList.remove('sideBar--scrollSpyActive');
                        }
                        navLinkHash = navLinks[i].hash;
                        if (navLinkHash !== "") {
                            dataItemId = dataItems[j].getAttribute("id");
                            if (navLinks[i].hash == "#" + dataItemId && classCount < 1) {
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