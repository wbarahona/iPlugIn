//scripts_js
var byclickStep=0,
	//stepWidth=300,
	slideTo=0,
	frameCount=0,
	step=0;


$(document).ready(function () {
	$('#slider-container').thisCarousel({
		//settings
		speed:1000,
		timeout:3000,
		arrow:$('.arrow'),
		//animation: 'fade',
		animationDirection: 0
	});
});
