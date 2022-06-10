$(function() {

	"use strict";

    var progressCheck = false;

    // ========================================================================= //
    //  Skills Progress
    // ========================================================================= //

    function skillsPogress() {
        $(".skills-item").each(function () {
            var progressBar = $(this).find(".item-progress");
            progressBar.css("height", progressBar.attr("data-height"));
        });
    }

    if (!progressCheck && $(this).scrollTop() >= $(".about-me").offset().top - 400) {
        skillsPogress();
        progressCheck = true;
    }

    $(window).on("scroll", function () {
        
        if (!progressCheck && $(this).scrollTop() >= $(".about-me").offset().top - 400) {
            skillsPogress();
            progressCheck = true;
        }
        
    });

});