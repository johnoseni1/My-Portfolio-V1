$(function() {

	"use strict";

	// ========================================================================= //
  //  Loading
  // ========================================================================= //

	function HideLoad() {
        $('.preloader').fadeOut(700, function () {
			$(this).remove();
		});
		$("body").css( {
			overflow: "auto",
			"overflow-x" : "hidden"
	    });
    }

	$(window).on("load", function () {
		setTimeout(function(){
			HideLoad(); // call out animations.
		}, 500);
	});
	
     // ========================================================================= //
  //  Cursor
  // ========================================================================= //

	if ($("body").hasClass("cursor-effect")) {
		$(".parallax-item").wrap('<div class="parallax-wrap"></div>');
		
		if ($("parallax-item").length) {
			$("parallax-item").addClass("not-hide-cursor");
		}

		var $mouse = { x: 0, y: 0 }; // Cursor position
		var $pos = { x: 0, y: 0 }; // Cursor position
		var $ratio = 0.15; // delay follow cursor
		var $active = false;
		var $circle = $("#circle");

		var $circleWidth = 34; // Circle default width
		var $circleHeight = 34; // Circle default height
		var $circleScale = 1; // Circle default scale
		var $circleOpacity = 0.5; // Circle default opacity
		var $circleBorderWidth = 2; // Circle default border width

		gsap.set($circle, {  // scale from middle and style circle
			xPercent: -50, 
			yPercent: -50, 
			width: $circleWidth,
			height: $circleHeight,
			borderWidth: $circleBorderWidth, 
			opacity: $circleOpacity 
		});

		document.addEventListener("mousemove", mouseMove);

		function mouseMove(e) {
			$mouse.x = e.clientX;
			$mouse.y = e.clientY;
		}

		gsap.ticker.add(updatePosition);

		function updatePosition() {
			if (!$active) {
				$pos.x += ($mouse.x - $pos.x) * $ratio;
				$pos.y += ($mouse.y - $pos.y) * $ratio;

				gsap.set($circle, { x: $pos.x, y: $pos.y });
			}
		}

		$(".parallax-wrap").mousemove(function(e) {
			parallaxCursor(e, this, 2); // parallax circle = low number is more attractive
			callParallax(e, this);
		});

		function callParallax(e, parent) {
			parallaxIt(e, parent, parent.querySelector(".parallax-item"), 25); // parallax area = higher number is more attractive
		}

		function parallaxIt(e, parent, target, movement) {
			var boundingRect = parent.getBoundingClientRect();
			var relX = e.clientX - boundingRect.left;
			var relY = e.clientY - boundingRect.top;

			gsap.to(target, {
				duration: 0.3, 
				x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
				y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
				ease: Power2.easeOut
			});
		}

		function parallaxCursor(e, parent, movement) {
			var rect = parent.getBoundingClientRect();
			var relX = e.clientX - rect.left;
			var relY = e.clientY - rect.top;
			$pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
			$pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
			gsap.to($circle, {duration: 0.3, x: $pos.x, y: $pos.y });
		}

		// Parallax item hover.
		$(".parallax-wrap").on("mouseenter", function(e) {
			gsap.to($circle, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $circleOpacity });
			$active = true;
		}).on("mouseleave", function(e) {
			gsap.to($circle, { duration: 0.3, scale: $circleScale, borderWidth: $circleBorderWidth, opacity: $circleOpacity });
			gsap.to(this.querySelector(".parallax-item"), { duration: 0.3, x: 0, y: 0, clearProps:"all" });
			$active = false;
		});

		// Alternative cursor style on hover.
		$(".cursor-alter")
		.not(".parallax-item") // omit from selection.
		.on("mouseenter", function() {
			gsap.to($circle, {
				duration: 0.3, 
				borderWidth: 0, 
				opacity: 0.2, 
				backgroundColor: "#CCC", 
				width: "100px", 
				height: "100px", 
			});
		}).on("mouseleave", function() {
			gsap.to($circle, {
				duration: 0.3, 
				borderWidth: $circleBorderWidth, 
				opacity: $circleOpacity, 
				backgroundColor: "transparent", 
				width: $circleWidth, 
				height: $circleHeight, 
				clearProps:"backgroundColor" 
			});
		});

		// Overlay menu caret hover.
		$(".site-navbar .main-nav .menu-content li .parallax-wrap").on("mouseenter", function() {
			gsap.to($circle, { duration: 0.3, scale: 1.3, borderWidth: $circleBorderWidth });
		}).on("mouseleave", function() {
			gsap.to($circle, { duration: 0.3, scale: $circleScale });
		});

		$(".gallery-item").each(function() {
			var $piItem = $(this);
			if ($(this).find(".cover-bg").length) {
				$piItem.find("a").on("mouseenter", function() {
					gsap.to($circle, {
						duration: 0.3, 
						borderWidth: 0,
						backgroundColor: "#000",
						opacity: 1, 
						width: "68px", 
						height: "68px", 
					});
					$circle.html("<i class='fa fa-search-plus'></i>");

				}).on("mouseleave", function() {
					gsap.to($circle, {
						duration: 0.3, 
						borderWidth: $circleBorderWidth, 
						opacity: $circleOpacity, 
						backgroundColor: "transparent", 
						width: $circleWidth, 
						height: $circleHeight, 
						clearProps:"backgroundColor" 
					});
					$circle.html("");
				});
			}
		});

		$(".portfolio .grid__item").each(function() {
			var $piItem = $(this);
			if ($(this).find(".cover-bg").length) {
				$piItem.find(".not-hide-cursor").on("mouseenter", function() {
					gsap.to($circle, {
						duration: 0.3, 
						borderWidth: 0,
						backgroundColor: "#000",
						opacity: 1, 
						width: "68px", 
						height: "68px", 
					});
					$circle.html("<i class='fa fa-search-plus'></i>");

				}).on("mouseleave", function() {
					gsap.to($circle, {
						duration: 0.3, 
						borderWidth: $circleBorderWidth, 
						opacity: $circleOpacity, 
						backgroundColor: "transparent", 
						width: $circleWidth, 
						height: $circleHeight, 
						clearProps:"backgroundColor" 
					});
					$circle.html("");
				});
			}
		});
			
		// Hide on hover.
		$("a, button") // class "hide-cursor" is for global use.
		.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
		.not(".cursor-alter") // omit from selection
		.on("mouseenter", function() {
			gsap.to($circle, { duration: 0.3, scale: 0, opacity: 0 });
		}).on("mouseleave", function() {
			gsap.to($circle, { duration: 0.3, scale: $circleScale, opacity: $circleOpacity });
		});

		// Show/hide on document leave/enter.
		$(document).on("mouseleave", function() {
			gsap.to("#cursor", { duration: 0.3, autoAlpha: 0 });
		}).on("mouseenter", function() {
			gsap.to("#cursor", {duration: 0.3, autoAlpha: 1 });
		});

		// Show as the mouse moves.
		$(document).mousemove(function() {
			gsap.to("#cursor", {duration: 0.3, autoAlpha: 1 });
		});
	}

	 // ========================================================================= //
  //  Navbar Animation On Scroll
  // ========================================================================= //

    function activeNavbar() {
        
        if ($(window).scrollTop() > 70) {
            $(".site-navbar").addClass("active-navbar");
        } else {
            $(".site-navbar").removeClass("active-navbar");
        }
    }
    
    activeNavbar();
    
    $(window).on("scroll", function () {
        activeNavbar();
    });

	// ========================================================================= //
  //  Submenu Caret
  // ========================================================================= //

    $(".site-navbar .menu-icon").on("click", function() {
        $("body").toggleClass("menu-open");
    });

    $(".site-navbar .menu-icon").on("click", function() {
        $(".site-navbar .main-nav .menu-content li .submenu-caret .arrow i").removeClass("top");
        $(".site-navbar .main-nav .menu-content li .submenu").slideUp();
    });

    $(".site-navbar .main-nav .menu-content li").on("click", function() {
		$(".site-navbar .main-nav .menu-content li .submenu-caret .arrow i").not($(this).find(".submenu-caret .arrow i")).removeClass("top");
        $(this).find(".submenu-caret .arrow i").toggleClass("top");
		$(".site-navbar .main-nav .menu-content li .submenu").not($(this).find(".submenu")).slideUp();
        $(this).find(".submenu").slideToggle();
    });

	  // ========================================================================= //
  //  Navigation
  // ========================================================================= //
	var navigation = new TimelineLite({
		paused: true,
		reversed: true,
	});
	navigation
		.to(".main-nav", 0.5, {
		opacity: 1,
		visibility: "visible",
		transform: "translateY(0)",
		
		})
		.to(".site-navbar .menu-overlay", 0.5, {
			opacity: 1,
			visibility: "visible",
			transform: "translateY(0)"
		},
		"-=0.4"
		)
		.to(
			".site-navbar .menu-icon .icon .bar-content",
			0.3,
			{
				width: '20px',
			},
			"-=0.4"
		)
		.to(
			".site-navbar .menu-icon .icon span.top-bar",
			0.3,
			{
				top: 0,
				width: "20px",
				transform: "rotate(45deg)",
			},
			"-=0.4"
		)
		.to(
			".site-navbar .menu-icon .icon span.bottom-bar",
			0.3,
			{
				bottom: 0,
				width: "20px",
				transform: "rotate(-45deg)",     
			},
		"-=0.4"
		)
		.to(
			".site-navbar .menu-icon .menu-txt-btn .menu-txt",
			0.3,
			{
				display: "none",
				visibility: "hidden",
				opacity: 0,
			},
		"-=0.4"
		)
		.to(
			".site-navbar .menu-icon .menu-txt-btn .close-txt",
			0.3,
			{
				display: "inline-block",
				visibility: "visible",
				opacity: 1,
			},
		"-=0.4"
		)
		.to(
		".site-navbar .main-nav .menu-content li a .menu-title",
		0.5,
		{
			opacity: 1,
			visibility: "visible",
			transform: "translateY(0)",
		},
		"-=0.1"
		)
		.to(
			".site-navbar .main-nav .menu-content li .submenu-caret",
			0.5,
			{
			opacity: 1,
			visibility: "visible",
			transform: "translateY(0)",
			},
			"-=0.5"
		)
		.to(
		".site-navbar .main-nav .menu-content li a .menu-number",
		0.25,
		{
			opacity: 1,
			visibility: "visible",
		},
		"+=0.1"
		)

	$(".site-navbar .menu-icon").click(function () {
		navigation.reversed() ? navigation.play() : navigation.reverse();
	});
	

	// ========================================================================= //
  //  Facts Accordion
  // ========================================================================= //

	$(".facts .accordion-item .accordion-head").on("click", function() {
		$(".facts .accordion-item .accordion-head").not($(this)).removeClass("current");
		$(this).toggleClass("current");
		$(".accordion-body").not($(this).next(".accordion-body")).slideUp(400);
		$(this).next(".accordion-body").slideToggle(400);
	});

	// ========================================================================= //
  //  Gallery Magnigic Popup
  // ========================================================================= //

	if ($('.gallery .gallery-item')[0]) {

		$('.gallery .gallery-item').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick:!1,
			closeBtnInside:!1,
			gallery:{enabled:!0},
			zoom:{enabled:!0,duration:400,easing:"cubic-bezier(0.36, 0, 0.66, -0.56)"}
			
		});
	}

	// ========================================================================= //
  //  Portfolio Grid Item Animation On Hover
  // ========================================================================= //

    $('.grid__item a').each(function() {
        $(this).on('mouseenter', function() {
            var portfolioTitle = $('.item-title');
            if ($(this).data('title')) {
                portfolioTitle.html($(this).data('title') + '<span class="item-category">' + $(this).data('category') + '</span>');
                portfolioTitle.addClass('visible');
            }
            $(document).on('mousemove', function(e) {
                $('.item-title').css({
                    left: e.clientX - 10,
                    top: e.clientY + 25
                });
            });
        }).on('mouseleave', function() {
            $('.item-title').removeClass('visible');
        });
    });

	// ========================================================================= //
  //  Portfolio Filter
  // ========================================================================= //

	$(".portfolio .portfolio-filter .filter-wrap .filter button").on("click", function () {
        $(this).addClass("active").siblings("button").removeClass("active");
		var dataFilter = $(this).attr('data-filter');
        $('.grid').isotope({
            filter: dataFilter
        });
    });

	// ========================================================================= //
  //  Portfolio Magnific Popup
  // ========================================================================= //

	if ($('.portfolio .grid__item')[0]) {

		$('.portfolio .grid__item').magnificPopup({
			delegate: 'a.not-hide-cursor',
			type: 'image',
			closeOnContentClick:!1,
			closeBtnInside:!1,
			gallery:{enabled:!0},
			zoom:{enabled:!0,duration:400,easing:"cubic-bezier(0.36, 0, 0.66, -0.56)"}
		});
	}

	// ========================================================================= //
  //  Testimonials Owl Carousel
  // ========================================================================= //

	$(".testimonials .owl-carousel").owlCarousel({
		items: 1,
		nav: true,
		dots: false,
		autoplay: false,
		smartSpeed: 500,
		navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
		margin: 30,
		loop: true,
		autoplayHoverPause: true,
		responsiveClass: true,
	});

});