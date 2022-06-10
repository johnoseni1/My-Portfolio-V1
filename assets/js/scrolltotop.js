$(function() {

    "use strict";
		
		var progressPath = document.querySelector('.progress-parent path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
        if ($(this).scrollTop() > offset) {
            $('.progress-parent').addClass('active-progress');
        } else {
            $('.progress-parent').removeClass('active-progress');
        }
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > offset) {
				$('.progress-parent').addClass('active-progress');
			} else {
				$('.progress-parent').removeClass('active-progress');
			}
		});				
		$('.progress-parent').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
});