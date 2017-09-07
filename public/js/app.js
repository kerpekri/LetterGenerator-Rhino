$(function () {
  var enablePageScroll = false;
  var alphabetType;

  $('#fullpage').fullpage({
    anchors: ['homeSection', 'chooseSection', 'generateSection'],
    onLeave: function(index, nextIndex, direction){
      if(nextIndex == 2 && (enablePageScroll == false)){
        return false;
        enablePageScroll = true;
      }
    }
  })

  $("#load_letter_section, #load_number_section").click(function(){
    var section_type = 'load_letter_section'

    if (this.id == 'load_number_section') {
      section_type = 'load_number_section'
    }

    loadTemplate(section_type);
    enablePageScroll = true;
    $('#choose_section').removeClass('hide');
    $.fn.fullpage.moveTo(2);
  })

  function loadTemplate(section_type) {
    $.ajax({
      url: '/choose_letters_or_numbers',
      data: {
        'type': section_type
      },
      type: "GET",
      dataType : "html",
      success: function (html) {
        $("#choose_section").html("").append(html);
      }
    })
    .fail(function(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
    })
    .done(function(xhr, status) {
      var single = $('#single');
      single.change(getValueFromSelectOnChange);
      initializeMaterializeSelect();
    })
  }

  function getValueFromSelectOnChange() {
    alphabetType = $("#single option:selected").val();
    if (alphabetType) {
      loadGenerateButton();
    }
  }

  function loadGenerateButton() {
    $.ajax({
      url: '/load_button',
      data: {},
      type: "GET",
      dataType : "html",
      success: function (html) {
        $("#load_button").html("").append(html);
      }
    })
    .fail(function(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
    })
    .done(function(xhr, status) {
    })
  }

  function initializeMaterializeSelect() {
    $('select').material_select();
  }

  $('body').on('click','#move_to_generate_section',function(){
    loadGenerateSection();
    $('#generate_section').removeClass('hide');
    $.fn.fullpage.moveTo(3);
  });

  function loadGenerateSection() {
    $.ajax({
      url: '/load_generate_section',
      data: {
        'alphabet_type': alphabetType
      },
      type: "GET",
      dataType : "html",
      success: function (html) {
        $("#generate_section").html("").append(html);
      }
    })
    .fail(function(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
    })
    .done(function(xhr, status) {
    })
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


    /*function setCookie() {
        Cookies.set('alphabetApp', 'visited', {expires: 0.1, path: ''});
    }*/

    /*function getCookie() {
        return Cookies.get('alphabetApp');
    }*/

    function insert_letter(random_letter) {
        var bodyTitle = $('h2#body_title');
        bodyTitle.replaceWith('<h2 id=body_title>' + random_letter + '</h2>');
    }

    function generate_letter(letter_list) {
        // add condition that previous letter dont generate again
        return letter_list[Math.floor(Math.random() * letter_list.length)];
    }
});