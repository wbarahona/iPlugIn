(function($){

	//populate and autoanimate the carousel method
	$.fn.thisCarousel = function(settings){
		plugInBase = $(this);


		plugInBase.settings = settings;

		plugInBase.init = function(settings){
			plugInBase.parseJSON();
			plugInBase.autoanimateCarousel(settings);
			plugInBase.navarrowaction();
		};

		plugInBase.parseJSON = function(){
			for(var key in json){
				if(typeof json[key] === "object") {
						for(var i = 0; i < json[key].length; i++) {
							for(var property in json[key][i]) {
								//console.log(property + " = " + json[key][i][property]);
								$('#slider-container').append(json[key][i][property]);
								frameCount++;
							}
						}
				} else if(typeof json[key] === "string") {
					console.log('plain string found: ' +key + " = " + json[key]);
				}
			}
			totalFrames = frameCount;
			frameCount=0;
		}

		plugInBase.autoanimateCarousel = function(settings){

			plugInBase.settings = $.extend({}, $.fn.thisCarousel.defaults, settings)

			var slideTo=0;
			timer=self.setInterval(function(){

				//*****************  FADE OUT TRANSITION  ***********************
				// $('#slider-container').fadeOut(plugInBase.settings.speed, function(){
				// 	$('.slideshow-frame').eq(0).insertAfter($('.slideshow-frame').eq((totalFrames-1)));
				// 	$('#slider-container').fadeIn(plugInBase.settings.speed);
				// });
				// step++;

				/******************  SWIPE TRANSITION  ************************/
				plugInBase.manualanimateSlide(1);

			},plugInBase.settings.timeout);
		};

		plugInBase.navarrowaction = function(){
			plugInBase.settings.arrow.each(function(index){
				navArrowBase = $(this);

				navArrowBase.click(function(){
					plugInBase.manualanimateSlide(index);
				});

				navArrowBase.hover(function(){
					clearInterval(timer);
				},function(){
					plugInBase.autoanimateCarousel(settings);
				});
			});
		}

		plugInBase.manualanimateSlide = function(flag){
			if(flag == 0){
				$('.slideshow-frame').eq((totalFrames-1)).insertBefore($('.slideshow-frame').eq(0));
				$('#slider-container').stop(1,1).animate({marginLeft: '-300px'},plugInBase.settings.speed);
			}
			if(flag == 1){
				slideTo = -300;
			}
			$('#slider-container').stop(1,1).animate({marginLeft: slideTo+'px'},plugInBase.settings.speed, function(){
				if(flag == 1){
					$('.slideshow-frame').eq(0).insertAfter($('.slideshow-frame').eq((totalFrames-1)));
					$('#slider-container').css({marginLeft: 0});
					slideTo = 0;
				}	
			});
		}

		plugInBase.init(plugInBase.settings);
	};

	$.fn.thisCarousel.defaults = {
		speed : 500,
		stepWidth : 300,
		timeout: 3000,
		arrow: '.left-arrow'
	};

}) (jQuery);
//end
