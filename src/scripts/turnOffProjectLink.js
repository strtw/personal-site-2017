/**
 * Created by stu on 5/5/17.
 */

//Turns off  the link functionality of the project menu link for widths
// specified. So that the responsive menu will show a dropdown not a link
(function(){
    window.onload = function(){
        var mql = window.matchMedia("(max-width: 770px)");

        var projectLink = document.getElementById("project-link");

        console.log(projectLink);

        var handleMediaChange = function (mediaQueryList) {
            if (mediaQueryList.matches) {
                // The browser window is 770px or fewer
                projectLink.addEventListener("click",function(e){
                    e.preventDefault();
                });
            }
        };

        mql.addListener(handleMediaChange);

        handleMediaChange(mql);

        if (window.matchMedia("(max-width: 770px)").matches) {
            projectLink.addEventListener("click",function(e){
                console.log("clicked");
                e.preventDefault();
            });
        } else {
            /* the viewport is less than 400 pixels wide */
        }
    };
})();




