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

					if(plugInBase.settings.animation == 'fade')
					{
						plugInBase.fadeOutInAnimation(plugInBase.settings.animationDirection);
					}
					else
					{
						plugInBase.manualanimateSlide(plugInBase.settings.animationDirection);
					}

			},plugInBase.settings.timeout);
		};

		plugInBase.navarrowaction = function(){
			plugInBase.settings.arrow.each(function(index){
				navArrowBase = $(this);

				navArrowBase.click(function(){
					if(plugInBase.settings.animation == 'fade')
					{
						plugInBase.fadeOutInAnimation(index);
					}
					else
					{
						plugInBase.manualanimateSlide(index);
					}
				});

				navArrowBase.hover(function(){
					clearInterval(timer);
				},function(){
					plugInBase.autoanimateCarousel(settings);
				});
			});
		};

		plugInBase.manualanimateSlide = function(flag){
			//******************  SWIPE TRANSITION  ************************/
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
		};

		plugInBase.fadeOutInAnimation = function(flag){
			//*****************  FADE OUT TRANSITION  ***********************
			$('#slider-container').fadeOut(plugInBase.settings.speed, function(){
				if(flag == 0)
					$('.slideshow-frame').eq((totalFrames-1)).insertBefore($('.slideshow-frame').eq(0));
				else if(flag == 1)
					$('.slideshow-frame').eq(0).insertAfter($('.slideshow-frame').eq((totalFrames-1)));
				$('#slider-container').fadeIn(plugInBase.settings.speed);
			});
		};

		plugInBase.init(plugInBase.settings);
	};

	$.fn.thisCarousel.defaults = {
		speed : 500,
		stepWidth : 300,
		timeout: 3000,
		arrow: '.left-arrow',
		animation: 'swipe',	//
		animationDirection: 1 //0 for animate elements from right to left 1 to animate elements from left to right
	};

}) (jQuery);
//end
