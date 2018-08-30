$(document).ready(function() {
	$("#header").load("../paginas/header.html");
	$("#footer").load("../paginas/footer.html");
	$("#header").sticky({topSpacing:0, zIndex: '50'});
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrolltop').fadeIn();
		} else {
			$('.scrolltop').fadeOut();
		}
	});
});
