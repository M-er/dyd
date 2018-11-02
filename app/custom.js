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
	$('.alert').delay( 800 ).fadeOut( 5000 );
	setTimeout(function(){
		$(".animate-flicker").removeClass('animate-flicker').addClass(' ');
	}, 5000);
});
