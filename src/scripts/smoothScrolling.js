(function() {
    'use strict';
    var startScrollPosition = 0; //Top of page
    var endScrollPosition;
    var scrollTargets = document.querySelectorAll('[data-target="scroll"]');
    var links = document.querySelectorAll(".menu__item");
    var scrollTopNotDisplayed = true;
    window.addEventListener("scroll", function() { //Scroll top button appears
        // after scrolling page 300px.
        startScrollPosition = window.pageYOffset;
        if (startScrollPosition > 300 && scrollTopNotDisplayed) {
            displayScrollTop();
            scrollTopNotDisplayed = false;
        }
    });

    function handleLinkClicks(e) {
        e.preventDefault();
        endScrollPosition = getEndScrollPosition(e); //destination of link click
        if (startScrollPosition <= endScrollPosition) {
            pageScrollDown(startScrollPosition, endScrollPosition);
        } else { //startScrollPosition > endScrollPosition
            pageScrollUp(startScrollPosition, endScrollPosition);
        }
        if (document.getElementById("scrollTopButton") === null) {
            displayScrollTop();
        }
    }
    document.addEventListener("click", function(e) { //scroll to top on TOP
        // button click. Callback uses event delegation to match click.
        if (e.target.getAttribute("id") === "scrollTopButton") {
            var currentYOffset = document.getElementsByTagName("BODY")[0].scrollTop;
            pageScrollUp(currentYOffset, 0);
        }
    });

    function pageScrollDown(startYCoordinate, endYCoordinate) {
        window.scroll(0, startYCoordinate); // horizontal and vertical
        // scroll positions
        var scrollDelay = setTimeout(function() {
            pageScrollDown(startYCoordinate, endYCoordinate);
        }, 5); // scrolls every x milliseconds
        if (startYCoordinate <= endYCoordinate) {
            startYCoordinate += 25; //controls scroll speed 1 is slow
        } else {
            clearTimeout(scrollDelay);
        }
    }

    function pageScrollUp(startYCoordinate, endYCoordinate) {
        window.scroll(0, startYCoordinate); // horizontal and vertical
        // scroll positions
        var scrollDelay = setTimeout(function() {
            pageScrollUp(startYCoordinate, endYCoordinate);
        }, 5); // scrolls every x milliseconds
        if (endYCoordinate <= startYCoordinate) {
            startYCoordinate -= 25; //controls scroll speed 1 is slow
        } else {
            clearTimeout(scrollDelay);
        }
    }

    function getEndScrollPosition(e) { //get the y-offset of element to be
        // scrolled to
        var anchorHref;
        if (e.target.getAttribute("href")) {
            anchorHref = e.target.getAttribute("href").substring(1);
        } //strips # character from href to match target ID
        for (var i = 0; i < scrollTargets.length; i++) {
            var scrollTargetId = scrollTargets[i].getAttribute("id");
            if (anchorHref === scrollTargetId) {
                return scrollTargets[i].offsetTop - 140; // - value is to
                // account for fixed nav bar
            }
        }
    }

    function displayScrollTop() { //dynamically creates and displays scroll
        // TOP button
        var body = document.getElementsByTagName("BODY")[0];
        var scrollTopButton = document.createElement("DIV");
        scrollTopButton.innerHTML = "TOP";
        scrollTopButton.setAttribute("id", "scrollTopButton");
        body.appendChild(scrollTopButton);
        scrollTopButton.classList.add("scrollTopActive");
        setTimeout(function() {//waits until display and position are set to
            // fade in
            scrollTopButton.classList.add("scrollTopFadeIn");
        }, 0);
    }

    function restrictDataTargets(increment) {
        if (links[increment].classList.contains("no-scroll")) {
            return false;
        } else {
            links[increment].addEventListener("click", handleLinkClicks);
        }
    }
    for (var i = 0; i < links.length; i++) {
        restrictDataTargets(i);
    }
})();
//TODO hide scrollTopButton when page reaches top