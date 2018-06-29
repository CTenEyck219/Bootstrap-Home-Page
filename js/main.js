var Layout = function () {
    'use strict';

    // handle group element heights
    var handleHeight = function() {
       $('[data-auto-height]').each(function() {
            var parent = $(this);
            var items = $('[data-height]', parent);
            var height = 0;
            var mode = parent.attr('data-mode');
            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', '');
                } else {
                    $(this).css('min-height', '');
                }

                var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
                if (height_ > height) {
                    height = height_;
                }
            });

            height = height + offset;

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', height);
                } else {
                    $(this).css('min-height', height);
                }
            });

            if(parent.attr('data-related')) {
                $(parent.attr('data-related')).css('height', parent.height());
            }
       });
    }
	
	//Carousel only height
	function carouselNormalization() {
		var items = $('#customCarousel .carousel-item'), //grab all slides
		heights = [], //create empty array to store height values
		tallest; //create variable to make note of the tallest slide

		if (items.length) {
			function normalizeHeights() {
				items.each(function() { //add heights to array
					heights.push($(this).height());
				});
				tallest = Math.max.apply(null, heights); //cache largest value
				items.each(function() {
					$(this).css('min-height', tallest + 'px');
				});
			};
			normalizeHeights();

			$(window).on('resize orientationchange', function() {
				tallest = 0, heights.length = 0; //reset vars
				items.each(function() {
					$(this).css('min-height', '0'); //reset min-height
				});
				normalizeHeights(); //run it again 
			});
		}
	}

    return {
        init: function () {
            handleHeight(); // initial setup for group element height
			carouselNormalization();
			
			if($('[data-auto-height]').length > 0) {
				window.addEventListener('resize', function(e) {
					handleHeight();
				});
			}
        }
    };
}();

$(document).ready(function() {
    Layout.init();
});
