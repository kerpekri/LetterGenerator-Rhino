$(function () {
  var enablePageScroll = false;

  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage'],
    onLeave: function(index, nextIndex, direction){
      if(nextIndex == 2 && (enablePageScroll == false)){
        return false;
        enablePageScroll = true;
      }
    }
  })

  $("#generate_letter, #generate_number").click(function(){
    var template_type = 'generate_letter'

    if (this.id == 'generate_number') {
      template_type = 'generate_number'
    }

    loadSecondSlideTemplate(template_type);
    enablePageScroll = true;
    $('#section1').removeClass('hide');
    $.fn.fullpage.moveTo(2);
  })

  function loadSecondSlideTemplate(template_type) {
    $.ajax({
      url: '/load_template',
      data: {
        'type': template_type
      },
      type: "GET",
      dataType : "html",
      success: function (html) {
        $("#section1").html("").append(html);
      }
    })
    .fail(function(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
    })
    .done(function(xhr, status) {
      var single = $('#single');
      single.change(singleChangeHandler);
      initAlphabetTypeSelect();
    })
  }

  function singleChangeHandler() {
    //TODO
    var singleValue = $("#single option:selected").val();
    alert('xxx:' + singleValue);
  }

  function initAlphabetTypeSelect() {
    $('select').material_select();
  }

    // sinatra cookie stuff?????
    /*var cookieExists = getCookie();

    if (cookieExists == null || cookieExists == undefined) {
        $("#preloader").removeClass("hidden");
        loadLoadingBar();
        setCookie();
    } else {
        $("button#side-nav-hamburger-button").removeClass("hidden");
    }*/


    $("#rotation_arrow").click(function () {
        var letter_list = "abcdefghijklmnoprstuvwxyz".toUpperCase();
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
        var bodyTitle = $('h2#body_title');
        bodyTitle.replaceWith('<h2 id=body_title>' + random_letter + '</h2>');
    }

    function generate_letter(letter_list) {
        // add condition that previous letter dont generate again
        return letter_list[Math.floor(Math.random() * letter_list.length)];
    }
});