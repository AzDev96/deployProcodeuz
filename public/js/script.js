window.addEventListener('load', function () {
        // ======== PARALAX ========

    function parallaxHeader (event) {
        this.querySelector('#header__paralaks').style.transform = `translateX(${event.clientX/50}px) translateY(${event.clientY/50}px)`
    }
    document.addEventListener('mousemove', parallaxHeader)


    function parallaxAbout(event) {
        this.querySelectorAll('#about__right-images').forEach(layer => {
           let speed = layer.getAttribute("data-speed");
            layer.style.transform = `translateX(${event.clientX*speed/800}px) translateY(${event.clientY*speed/800}px)`
        })
    }
    document.addEventListener('mousemove', parallaxAbout )




    function parallaxAboutUs(event) {
        this.querySelectorAll('#aboutUs__images-img-1').forEach(layer => {
           let speed = layer.getAttribute("data-speed");
            layer.style.transform = `translateX(${event.clientX*speed/800}px) translateY(${event.clientY*speed/800}px)`
        })
    }
    document.addEventListener('mousemove', parallaxAboutUs)




    /* OWL CAROUSEL */
   
        $(".owl-carousel").owlCarousel({
            items: 1,
            loop:true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000

        });


        /* День и Ноч  ABOUT */
        let about_BtnOn = document.querySelector('#about__right-btnOn');
        let about_BtnOff = document.querySelector('#about__right-btnOff');
        let about = document.querySelector('#about');
        about_BtnOn.addEventListener('click', function () {
            about.style.background = "white"
            about_BtnOn.style.display = "none"
            about_BtnOff.style.display = "block"
        })
        about_BtnOff.addEventListener('click', function () {
            about.style.background = "black"
            about_BtnOn.style.display = "block"
            about_BtnOff.style.display = "none"
        })

              /* День и Ноч  Protfolio */
              let portfol_BtnOn = document.querySelector('#IndexPortfolio__right-btnOn');
              let portfol_BtnOff = document.querySelector('#IndexPortfolio__right-btnOff');
              let aboutUs = document.querySelector('#aboutUs');
              let question = document.querySelector('#question');
              let contact = document.querySelector('#contact');
              let portfol = document.querySelector('#IndexPortfolio');
              portfol_BtnOn.addEventListener('click', function () {
                  portfol.style.background = "white"
                  portfol_BtnOn.style.display = "none"
                  portfol_BtnOff.style.display = "block"
                  aboutUs.style.background = "white"
                  question.style.background = "white"
                  contact.style.background = "white"
              })
              portfol_BtnOff.addEventListener('click', function () {
                  portfol.style.background = "black"
                  portfol_BtnOn.style.display = "block"
                  portfol_BtnOff.style.display = "none"
                  aboutUs.style.background = "black"
                  question.style.background = "black"
                  contact.style.background = "black"
              })




              /* Acardion QUESTIONS ======= */
            const acardion = document.querySelectorAll('.question__box');
            for(let i = 0; i < acardion.length; i++) {
                acardion[i].addEventListener('click', function () {
                    this.classList.toggle('active')
                })
            }


            /* ========== Gamburger _ HEADER _ MENU  ==========  */
            let gambHeader = document.querySelector('#header__menu-gamburger');
            let gambClose = document.querySelector('#header__nav-close');
            let navFixed = document.querySelector('#header__nav-fixed');

            gambHeader.addEventListener('click', function() {
                navFixed.classList.add('active');
            })
            gambClose.addEventListener('click', function() {
                navFixed.classList.remove('active');
            })

          
})
   