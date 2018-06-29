$(function() {
	width = $(window).width();
	if (width > 767) {
		$(window).scroll(function() {
			if($(this).scrollTop() > 1) {
				$('#navigation').removeClass("navbar-light").addClass("navbar-dark bg-dark fixed-top");
			}
			else{
				$('#navigation').removeClass("navbar-dark bg-dark fixed-top").addClass("navbar-light");
			}
		});
	}
});