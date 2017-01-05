$(function() {
    loadLoadingBar();

	var letter_list = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
	
	$("#rotation_arrow").click(function() {
	    $(this).find('i').toggleClass('on');
		var random_letter = generate_letter(letter_list);

		insert_letter(random_letter);
	});

	function insert_letter(random_letter) {
		var text = $('h1#body_title').text();
		$("h1#body_title").replaceWith('<h1 id=body_title>' + random_letter + '</h1>');
	};

    function generate_letter(letter_list) {
    	// add condition that previous letter dont generate again
		return letter_list[Math.floor(Math.random() * letter_list.length)];
    };

    function loadLoadingBar() {
        var widthOfLoadingBar = 0;
        var incrementWidthValueBy = 2;
        var incrementSpeedValue = 50;

        var progressBar = setInterval(function () {
            if (widthOfLoadingBar == 100) {
                clearInterval(progressBar);
                loadComplete();
            }

            widthOfLoadingBar = widthOfLoadingBar + incrementWidthValueBy;
            document.getElementById('progress_span').style.width = widthOfLoadingBar + '%';
        }, incrementSpeedValue);
    };

    function loadComplete() {
        // preloader out
        var preloaderOutTl = new TimelineMax();

        preloaderOutTl
            .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
            .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
            .set($('body'), {className: '-=is-loading'})
            .to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
            .set($('#preloader'), {className: '+=is-hidden'});

        return preloaderOutTl;
    };
});