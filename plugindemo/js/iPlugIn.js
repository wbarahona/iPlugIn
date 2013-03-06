(function($){

	//populate and autoanimate the carousel method
	$.fn.thisCarousel = function(settings){
		plugInBase = $(this);


		plugInBase.settings = settings;

		plugInBase.init = function(settings){
			plugInBase.parseJSON();
			plugInBase.autoanimateCarousel(settings);
			plugInBase.navarrowaction();
			plugInBase.clickToClose();
			plugInBase.lightboxListener();
		};

		//*****************************************************************************************************//
		//********************************         PARSE JSON FUNCTION         ********************************//
		//*****************************************************************************************************//

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
				} else if(typeof json[key] === "string" && key == 'lightbox') {
					$('body').append(json[key]);
				}
			}
			totalFrames = frameCount;
			frameCount=0;
		}

		//*****************************************************************************************************//
		//********************************    AUTO ANIMATION OF THE CAROUSEL   ********************************//
		//*****************************************************************************************************//

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

		//*****************************************************************************************************//
		//********************************       NEXT - PREVIOUS FUNCTION      ********************************//
		//*****************************************************************************************************//

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

		//*****************************************************************************************************//
		//********************************        SLIDE CAROUSEL MOTOR         ********************************//
		//*****************************************************************************************************//

		plugInBase.manualanimateSlide = function(flag){
			//******************  SWIPE TRANSITION  ************************/
			thisWidth=$('#slider-container').children().width();
			if(flag == 0){
				
				$('#slider-container').stop(1,1).animate({marginLeft: '0px'},plugInBase.settings.speed, function(){
					$('.slideshow-frame').eq((totalFrames-1)).insertBefore($('.slideshow-frame').eq(0));
					$('#slider-container').css({marginLeft: '-'+thisWidth+'px'});
				});
				$('#slider-container').stop(1,1).animate({marginLeft: '0px'},plugInBase.settings.speed);
			}
			if(flag == 1){
				$('#slider-container').stop(1,1).animate({marginLeft: '-'+thisWidth+'px'},plugInBase.settings.speed, function(){
					$('.slideshow-frame').eq(0).insertAfter($('.slideshow-frame').eq((totalFrames-1)));
					$('#slider-container').css({marginLeft: 0});
				});
			}
		};

		//*****************************************************************************************************//
		//********************************          FADE OUT IN MOTOR          ********************************//
		//*****************************************************************************************************//

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

		//*****************************************************************************************************//
		//********************************       CLOSE LIGHTBOX FUNCTION       ********************************//
		//*****************************************************************************************************//

		plugInBase.clickToClose = function(){
			$('#closebox').click(function(){
				plugInBase.closeLightBox();
			});

			$('#fade').click(function(){
				plugInBase.closeLightBox();
			});
		};

		plugInBase.closeLightBox = function(){
			$('#light').animate({height:'0'},400).animate({width:'0'},400).fadeOut(400,function(){
				$('#closebox').fadeOut(200);
				$('#fade').fadeOut(200);
			});
		};

		//*****************************************************************************************************//
		//********************************       LIGHTBOX FUNCTIONALITY        ********************************//
		//*****************************************************************************************************//
		plugInBase.lightboxListener = function(){
			var pupUpElement = $('.popup_lightbox');

			//fijo cambiara a each
			pupUpElement.each(function(index){
				thisFrame = $(this);

				thisFrame.click(function(){
					plugInBase.popLightbox($('.popup_lightbox').eq(0).prop("outerHTML"));
				});
			});

			pupUpElement.hover(function(){
				clearInterval(timer);
			},function(){
				plugInBase.autoanimateCarousel(settings);
			});
		};

		plugInBase.popLightbox = function(frameHTML){
			$('#fade').fadeIn(1000, function(){
				$('#light').fadeIn(800).animate({width:'50%'},400).animate({height:'50%'},400);
				$('#closebox').fadeIn();

				plugInBase.appendLightboxContent(frameHTML);
				$('#light .popup_lightbox').css({'height':'100%', 'width':'100%'});
			});
		}

		plugInBase.appendLightboxContent = function(frameHTML){
			$('#light').html(frameHTML);
		};

		plugInBase.init(plugInBase.settings);
	};

	$.fn.thisCarousel.defaults = {
		speed : 500, //speed of the swipe/fade animation
		timeout: 3000, //Set the timeout of the delay
		arrow: '.arrow', //define the single class of the navigation arrows
		animation: 'swipe',	//this will set the default animation to a swipe
		animationDirection: 1 //0 for animate elements from right to left 1 to animate elements from left to right
	};

}) (jQuery);
//end
