const $window = $(window);
const $body = $('body');

class Slideshow {
    constructor(userOptions = {}) {
        const defaultOptions = {
            $el: $('.slideshow'),
            showArrows: false,
            showPagination: false,
            duration: 10000,
            autoplay: false
        }

        let options = Object.assign({}, defaultOptions, userOptions);

        this.$el = options.$el;
        this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
        this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
        this.showPagination = options.showPagination;
        this.currentSlide = 1;
        this.isAnimating = false;
        this.animationDuration = 1200;
        this.autoplaySpeed = options.duration;
        this.interval;
        this.$controls = this.$el.find('.js-slider-home-button');
        this.autoplay = this.maxSlide > 1 ? options.autoplay : false;

        var paginationStart = 1;

        if (this.maxSlide > 9) {
            this.$el.find($(".pagination .pagination-total-number")).text(this.maxSlide);
        } else {
            this.$el.find($(".pagination .pagination-total-number")).text("0" + this.maxSlide);
        }

        this.$el.find($(".pagination .pagination-current-number")).text("0" + paginationStart);

        this.$el.find($(".pagination .pagination-progress .pagination-progressbar")).css({
            width: 100 / this.maxSlide * paginationStart + "%"
        });

        this.$el.on('click', '.js-slider-home-next', (event) => this.nextSlide());
        this.$el.on('click', '.js-slider-home-prev', (event) => this.prevSlide());

        this.$el.on('click', '.js-slider-home-next', (event) => this.$el.find($('.pagination .pagination-current-number')).text(this.currentSlide > 9 ? this.currentSlide : "0" + this.currentSlide ));
        this.$el.on('click', '.js-slider-home-prev', (event) => this.$el.find($('.pagination .pagination-current-number')).text(this.currentSlide > 9 ? this.currentSlide : "0" + this.currentSlide));

        this.$el.on('click', '.js-slider-home-next', (event) => this.$el.find($('.pagination .pagination-progress .pagination-progressbar')).animate({width: 100 / this.maxSlide * this.currentSlide + "%" }, 800));
        this.$el.on('click', '.js-slider-home-prev', (event) => this.$el.find($('.pagination .pagination-progress .pagination-progressbar')).animate({width: 100 / this.maxSlide * this.currentSlide + "%" }, 800));

        this.init();
    }

    init() {
        this.goToSlide(1);
        if (this.autoplay) {
            this.startAutoplay();
        }
    }

    preventClick() {
        this.isAnimating = true;
        this.$controls.prop('disabled', true);
        clearInterval(this.interval);

        setTimeout(() => {
            this.isAnimating = false;
            this.$controls.prop('disabled', false);
            if (this.autoplay) {
                this.startAutoplay();
            }
        }, this.animationDuration);
    }

    goToSlide(index) {
        this.currentSlide = parseInt(index);

        if (this.currentSlide > this.maxSlide) {
            this.currentSlide = 1;
        }

        if (this.currentSlide === 0) {
            this.currentSlide = this.maxSlide;
        }

        const newCurrent = this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]');
        const newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
        const newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');

        this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
        this.$el.find('.js-pagination-item').removeClass('is-current');

        if (this.maxSlide > 1) {
            newPrev.addClass('is-prev');
            newNext.addClass('is-next');
        }

        newCurrent.addClass('is-current');
        this.$el.find('.js-pagination-item[data-slide="' + this.currentSlide + '"]').addClass('is-current');
    }

    nextSlide() {
        this.preventClick();
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.preventClick();
        this.goToSlide(this.currentSlide - 1);
    }

    startAutoplay() {
        this.interval = setInterval(() => {
            if (!this.isAnimating) {
                this.nextSlide();
            }
        }, this.autoplaySpeed);
    }

    destroy() {
        this.$el.off();
    }
}

(function() {
    let loaded = false;
    let maxLoad = 3000;

    function load() {
        const options = {
            showPagination: true
        };

        let slideShow = new Slideshow(options);
    }

    function addLoadClass() {
        $body.addClass('is-loaded');

        setTimeout(function() {
            $body.addClass('is-animated');
        }, 600);
    }

    $window.on('load', function() {
        if (!loaded) {
            loaded = true;
            load();
        }
    });

    setTimeout(function() {
        if (!loaded) {
            loaded = true;
            load();
        }
    }, maxLoad);

    addLoadClass();
})();