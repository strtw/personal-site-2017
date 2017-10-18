(function(){
    var startScrollPosition = 0; //Top of page
    var endScrollPosition;
    var scrollTargets = document.querySelectorAll('[data-target="scroll"]');
    var links = document.querySelectorAll(".menu__item");
    var scrollTopNotDisplayed = true;

    window.addEventListener("scroll",function(){
        startScrollPosition = window.pageYOffset;
        if(startScrollPosition > 300 && scrollTopNotDisplayed){
            displayScrollTop();
            scrollTopNotDisplayed = false;
        }
    });

    function handleLinkClicks(e) {
        e.preventDefault();
        endScrollPosition = getEndScrollPosition(e);
        if (startScrollPosition <= endScrollPosition) {
            pageScrollDown(startScrollPosition, endScrollPosition);
        } else {
            pageScrollUp(startScrollPosition, endScrollPosition);
        }
        if (document.getElementById("scrollTopButton") === null) {
            displayScrollTop();
        }
    }


    document.addEventListener("click",function(e){
        if(e.target.getAttribute("id")==="scrollTopButton"){
            var currentYOffset = document.getElementsByTagName("BODY")[0].scrollTop;
            pageScrollUp(currentYOffset,0);
        }
    });


    function pageScrollDown(startYCoordinate,endYCoordinate) {
        window.scroll(0,startYCoordinate); // horizontal and vertical
        // scroll positions
        var scrollDelay = setTimeout(function(){pageScrollDown(startYCoordinate,endYCoordinate);},5); // scrolls every x milliseconds
        if(startYCoordinate <= endYCoordinate){
            startYCoordinate +=25;
        } else {
            clearTimeout(scrollDelay);
        }
    }

    function pageScrollUp(startYCoordinate,endYCoordinate) {
        window.scroll(0,startYCoordinate); // horizontal and vertical
        // scroll positions
        var scrollDelay = setTimeout(function(){pageScrollUp(startYCoordinate,endYCoordinate);},5); // scrolls every x milliseconds
        if(endYCoordinate <= startYCoordinate){
            startYCoordinate -=25;
        }else{
            clearTimeout(scrollDelay);
        }
    }


    function getEndScrollPosition(e){//get the y-offset of element to be
        // scrolled to
        var anchorHref;
        if(e.target.getAttribute("href")){
            anchorHref = e.target.getAttribute("href").substring(1);
        }//strips #
        // character from href to match target ID
        for(var i=0; i <scrollTargets.length;i++){
            var scrollTargetId = scrollTargets[i].getAttribute("id");
            if(anchorHref === scrollTargetId){
                return scrollTargets[i].offsetTop - 140; // - value is to
                // account for fixed nav bar
            }
        }
    }

    function displayScrollTop(){
        var body = document.getElementsByTagName("BODY")[0];
        var scrollTopButton = document.createElement("DIV");
        scrollTopButton.innerHTML = "TOP";
        scrollTopButton.setAttribute("id","scrollTopButton");
        body.appendChild(scrollTopButton);
        scrollTopButton.classList.add("scrollTopActive");
        setTimeout(function(){
            scrollTopButton.classList.add("scrollTopFadeIn");
        },0);

    }

    function restrictDataTargets(increment){
        if(links[increment].classList.contains("no-scroll")){
            return false;
        } else{
            links[increment].addEventListener("click",handleLinkClicks);
        }
    }

    for(var i = 0; i < links.length;i ++){
        restrictDataTargets(i);
    }
})();



//TODO hide scrollTopButton when page reaches top