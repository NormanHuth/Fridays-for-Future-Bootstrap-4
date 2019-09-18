//=include ../../../node_modules/jquery/dist/jquery.js
//=include ../popper.js
//=include ../../../node_modules/bootstrap/dist/js/bootstrap.js

$(document).ready(function() {
    const back_to_top_button = ['<a href="#body" class="back-to-top anchor btn btn-sm btn-primary" id="btn_ttt"><i class="fas fa-long-arrow-alt-up fa-fw"></i></a>'].join("");
    $("body").append(back_to_top_button);
    $(".back-to-top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });
    });
    const $root = $('html, body');
    $('a[href^="#"].anchor').click(function () {
        $root.animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top-60
        }, 800);
        return false;
    });
});