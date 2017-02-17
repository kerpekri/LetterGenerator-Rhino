$(function () {
    var cookieExists = getCookie();

    if (cookieExists == null || cookieExists == undefined) {
        $("#preloader").removeClass("hidden");
        loadLoadingBar();
        setCookie();
    }
    else {

    }

    // Initialize collapse button
    $(".button-collapse").sideNav();
    $('.button-collapse').sideNav('show');
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();

    $("#rotation_arrow").click(function () {
        var letter_list = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
        var random_letter = generate_letter(letter_list);
        insert_letter(random_letter);
    });

    function setCookie() {
        Cookies.set('alphabetApp', 'visited', {expires: 0.1, path: ''});
    }

    function getCookie() {
        return Cookies.get('alphabetApp');
    }

    function insert_letter(random_letter) {
        var bodyTitle = $('h1#body_title');
        bodyTitle.replaceWith('<h1 id=body_title>' + random_letter + '</h1>');
    }

    function generate_letter(letter_list) {
        // add condition that previous letter dont generate again
        return letter_list[Math.floor(Math.random() * letter_list.length)];
    }

    function loadLoadingBar() {
        var widthOfLoadingBar = 0;
        var incrementWidthValueBy = 2;
        var incrementSpeedValue = 5;

        var progressBar = setInterval(function () {
            if (widthOfLoadingBar == 100) {
                clearInterval(progressBar);
                loadComplete();
            }

            widthOfLoadingBar = widthOfLoadingBar + incrementWidthValueBy;
            document.getElementById('progress_span').style.width = widthOfLoadingBar + '%';
        }, incrementSpeedValue);
    }

    function loadComplete() {
        // preloader out
        var preloaderOutTl = new TimelineMax();
        var preloaderElement = $('#preloader');

        preloaderOutTl
            .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease: Back.easeIn})
            .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease: Back.easeIn}, 0.1)
            .set($('body'), {className: '-=is-loading'})
            .to(preloaderElement, 0.7, {yPercent: 100, ease: Power4.easeInOut})
            .set(preloaderElement, {className: '+=is-hidden'});

        return preloaderOutTl;
    }
});