//scripts_js
var byclickStep=0,
	stepWidth=300,
	slideTo=0,
	frameCount=0,
	step=0;

$(document).ready(function () {

	$('#slider-container').thisCarousel({
		speed:300,
		stepWidth:300,
		timeout:2000,
		arrow:$('.arrow')
	});
	
});
