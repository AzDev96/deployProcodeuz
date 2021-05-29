window.addEventListener("load", function () {
    /* ========== Gamburger _ HEADER _ MENU  ==========  */
    let gambHeader = document.querySelector("#header__menu-gamburger");
    let gambClose = document.querySelector("#header__nav-close");
    let navFixed = document.querySelector("#header__nav-fixed");

    gambHeader.addEventListener("click", function () {
        navFixed.classList.add("active");
    });
    gambClose.addEventListener("click", function () {
        navFixed.classList.remove("active");
    });

    



});
