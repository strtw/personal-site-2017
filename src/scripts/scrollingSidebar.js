/**
 * Created by stu on 5/5/17.
 */
(function(){
    var body = document.getElementsByTagName("BODY")[0];
    var sideBar = document.getElementsByClassName("sidebar")[0];
    var timeoutID;
    window.addEventListener("scroll", scrollDelay);

    function scrollTop(){
        var yOffset = body.scrollTop;
        if(yOffset >= 60){
            sideBar.style.position = "fixed";
            sideBar.style.top = 130 + "px";

        }else{
            sideBar.style.position = "absolute";
            sideBar.style.top = 200 + "px";
        }
    }
    function scrollDelay() {
        var yOffset = body.scrollTop;
        if(yOffset < 400){
            scrollTop();
        }else{
            timeoutID = window.setTimeout(scrollTop, 300);
        }

    }
})();
