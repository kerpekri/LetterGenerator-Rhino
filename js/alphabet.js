$(function() {
    loadLoadingBar();

	var letter_list = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
	
	$("#rotation_arrow").click(function() {
		var random_letter = generate_letter(letter_list);

		insert_letter(random_letter);
	});

	function insert_letter(random_letter) {
		var text = $('h1#body_title').text();
		$("h1#body_title").replaceWith('<h1 id=body_title>'+random_letter+'</h1>');
	};

    function generate_letter(letter_list) {
    	// add condition that previous letter dont generate again
		return letter_list[Math.floor(Math.random() * letter_list.length)];
    };

    function loadLoadingBar() {

    // -> http://stackoverflow.com/questions/23004792/js-setinterval-increase-speed-gradually
    // http://stackoverflow.com/questions/1280263/changing-the-interval-of-setinterval-while-its-running
        interval = 65; // initial condition
        var run = setInterval(request, 65); // start setInterval as "run"

        function request() {
            console.log(interval); // firebug or chrome log
            //clearInterval(run); // stop the setInterval()

            //var widthOfLoadingBar = 0;
            //var incrementWidthValueBy = 2;
            //var incrementSpeedValue = 65;

             // dynamically change the run interval
            if (interval > 200){
              interval = interval*.8;
            }
            else {
              interval = interval*1.2;
            }

            run = setInterval(request, interval); // start the setInterval()

        }
    //
        /*var widthOfLoadingBar = 0;
        var incrementWidthValueBy = 2;
        var incrementSpeedValue = 65;

        var progressBar = setInterval(function () {
            if (widthOfLoadingBar == 100) {
                clearInterval(progressBar);
                $("body").removeClass("is-loading");
                $("#preloader").addClass("loaded");
            }

            widthOfLoadingBar = widthOfLoadingBar + incrementWidthValueBy;
            document.getElementById('kri').style.width = widthOfLoadingBar + '%';
        }, incrementSpeedValue);*/
    };

    //
    //



    //
    //
    function texting() {
        // number of loaded images for preloader progress
        var loadedCount = 0; //current number of images loaded
        var imagesToLoad = $('.bcg').length; //number of slides with .bcg container
        var loadingProgress = 0; //timeline progress - starts at 0

        $('.bcg').imagesLoaded({
            background: true
        }).progress( function( instance, image ) {
            loadProgress();
        });

        //progress timeline
        var progressTl = new TimelineMax({
            paused: true,
            onUpdate: progressUpdate,
            onComplete: loadComplete
        });

        progressTl
            //tween the progress bar width
            .to($('.progress span'), 1, {width:100, ease:Linear.easeNone});

        //as the progress bar width updates and grows we put the percentage loaded in the screen
        function progressUpdate()
        {
            //the percentage loaded based on the tween's progress
            loadingProgress = Math.round(progressTl.progress() * 100);

            //we put the percentage in the screen -- seto progress percentage!
            $(".txt-perc").text(loadingProgress + '%');

        }

        function loadComplete() {
            // preloader out
            var preloaderOutTl = new TimelineMax();

            preloaderOutTl
                .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
                .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
                .set($('body'), {className: '-=is-loading'})
                .set($('#intro'), {className: '+=is-loaded'})
                .to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
                .set($('#preloader'), {className: '+=is-hidden'})
                .from($('#intro .title'), 1, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.2')
                .from($('#intro p'), 0.7, {autoAlpha: 0, ease:Power1.easeOut}, '+=0.2')
                .from($('.scroll-hint'), 0.3, {y: -20, autoAlpha: 0, ease:Power1.easeOut}, '+=0.1');

            return preloaderOutTl;
        }
    };
});