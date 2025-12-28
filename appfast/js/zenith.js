
!(function( $ ){
    "use strict";

    $.fn.zenith = function(options){ 
         //setting defaults
         var settings = $.extend({
              layout      : 'default',
              direction   : 'horizontal',
              animation   : 'Slide',
              background  : '',
              activeIndex : 0,
              circleColor : 'cornsilkblue',
              iconColor   : '#fffff0',
              activeColor : 'crimson',
              autoplay    : true,
              autoplayStop : false,
              autoplayPause: true,
              autoplaySpeed: 3000,
              slideSpeed  : 500,
              bullets     : true,
              bulletsColor: '#f7f7f7',
              bulletsAC   : 'cornflowerblue',
              arrows      : true,
              prevSlide   : function(){},
              nextSlide   : function(){},
              firstSlide  : function(){},
              lastSlide   : function(){}, 
              animationEnd: function(){},
              markup      : ['.tf_container', '.tf_slide'],
              width       : '65%',
              height      : '320px',
              margin      : '60px',
              fullWidth   : false,
              style       : 'shadow',
              customStyle : [],
              customNavs  : ['#bullet-navs', 'li'],
              navPosition : 'bottom',
              thumbsBG	  : true,
              thumbsSize  : {
              		xsmall: 45,
              		small: 65, 
              		medium: 92,
              		large : 108,
              		xlarge: 128
              },
              fixedThumbs : true

         },options);

/* Developed by Anunzio International */
        //Set globals 
        var zis = this; 
        var parent = this;
        var lastHit = 0;
        var animation = [];
        var first = 0;
        var last = '';
        var wait = 0;
        var layout = settings.layout;
        var direction = settings.direction;

        // if any layout, exept slider, selected add animated class to children
        if( this.find('.hgi').length > 0 ){
            this.find('.hgi').addClass('animated');
        } 
        // if  slider layout selected add animated class to children
        if(  settings.layout === 'slider' ) {
          this.find(settings.markup[0] + ' ' + settings.markup[1]).addClass('animated'); 
        }

        if( layout === 'default' || layout === 'hand' || layout === 'screen' || layout === 'slider' && direction === 'horizontal' )
        {
	        if( settings.animation === 'Slide' ){
	        	animation['in_dir1'] = 'slideInLeft';
	            animation['in_dir2'] = 'slideInRight';
	            animation['out_dir1'] = 'slideOutLeft';
	            animation['out_dir2'] = 'slideOutRight';
	        } else if( settings.animation === 'Bounce' ){
	        	animation['in_dir1'] = 'bounceInLeft';
	            animation['in_dir2'] = 'bounceInRight';
	            animation['out_dir1'] = 'bounceOutLeft';
	            animation['out_dir2'] = 'bounceOutRight';
	        } else if( settings.animation === 'Fade' ){
	        	animation['in_dir1'] = 'fadeInLeft';
	            animation['in_dir2'] = 'fadeInRight';
	            animation['out_dir1'] = 'fadeOutLeft';
	            animation['out_dir2'] = 'fadeOutRight';
	        } else if( settings.animation === 'RotateDown' ){
	        	animation['in_dir1'] = 'rotateInDownLeft';
	            animation['in_dir2'] = 'rotateInDownRight';
	            animation['out_dir1'] = 'rotateOutDownRight';
	            animation['out_dir2'] = 'rotateOutDownLeft';
	        } else if( settings.animation === 'RotateUp' ){
	        	animation['in_dir1'] = 'rotateInUpLeft';
	            animation['in_dir2'] = 'rotateInUpRight';
	            animation['out_dir1'] = 'rotateOutUpRight';
	            animation['out_dir2'] = 'rotateOutUpLeft';
	        } else if( settings.animation === 'Zoom' ){
	        	animation['in_dir1'] = 'zoomInLeft';
	            animation['in_dir2'] = 'zoomInRight';
/* Developed by Anunzio International */
	            animation['out_dir1'] = 'zoomOutLeft';
	            animation['out_dir2'] = 'zoomOutRight';
	        } else if( settings.animation === 'Flip' ){
	        	animation['in_dir1'] = 'flipInY';
	            animation['in_dir2'] = 'flipInY';
	            animation['out_dir1'] = 'flipOutY';
	            animation['out_dir2'] = 'flipOutY';
	        }
	    } 
	    else if( layout === 'screen' || layout === 'slider' && direction === 'vertical' )
	    {
	    	if( settings.animation === 'Slide' ){
	        	animation['in_dir1'] = 'slideInUp';
	            animation['in_dir2'] = 'slideInDown';
	            animation['out_dir1'] = 'slideOutDown';
	            animation['out_dir2'] = 'slideOutUp';
	        } else if( settings.animation === 'Bounce' ){
	        	animation['in_dir1'] = 'bounceInUp';
	            animation['in_dir2'] = 'bounceInDown';
	            animation['out_dir1'] = 'bounceOutUp';
	            animation['out_dir2'] = 'bounceOutDown';
	        } else if( settings.animation === 'Fade' ){
	        	animation['in_dir1'] = 'fadeInUp';
	            animation['in_dir2'] = 'fadeInDown';
	            animation['out_dir1'] = 'fadeOutUp';
	            animation['out_dir2'] = 'fadeOutDown';
	        } else if( settings.animation === 'RotateDown' ){
	        	animation['in_dir1'] = 'rotateInDownLeft';
	            animation['in_dir2'] = 'rotateInDownRight';
	            animation['out_dir1'] = 'rotateOutDownLeft';
	            animation['out_dir2'] = 'rotateOutDownRight';
	        } else if( settings.animation === 'RotateUp' ){
	        	animation['in_dir1'] = 'rotateInUpLeft';
	            animation['in_dir2'] = 'rotateInUpRight';
	            animation['out_dir1'] = 'rotateOutUpLeft';
	            animation['out_dir2'] = 'rotateOutUpRight';
	        } else if( settings.animation === 'Zoom' ){
	        	animation['in_dir1'] = 'zoomInUp';
	            animation['in_dir2'] = 'zoomInDown';
	            animation['out_dir1'] = 'zoomOutUp';
	            animation['out_dir2'] = 'zoomOutDown';
	        } else if( settings.animation === 'Flip' ){
	            animation['in_dir1'] = 'flipInX';
	            animation['in_dir2'] = 'flipInX';
	            animation['out_dir1'] = 'flipOutX';
	            animation['out_dir2'] = 'flipOutX';
	        }
	    }

      // Function from David Walsh: http://davidwalsh.name/css-animation-callback
/* Developed by Anunzio International */
      function whichAnimationEvent(){
        var t,
            el = document.createElement("fakeelement");

        var animations = {
          "animation"      : "animationend",
          "OAnimation"     : "oAnimationEnd",
          "MozAnimation"   : "animationend",
          "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations){
          if (el.style[t] !== undefined){
            return animations[t];
          }
        }
      }
      var animationEvent = whichAnimationEvent();

      // MAIN FUNCTIONS
      var screenSlide = {
        next: function(){
            if( settings.layout != 'slider' ){
              var holder = '#mac-book';
              var item = '.hgi';
              var left = parent.find('#mac-book #left');
              var right = parent.find('#mac-book #right');     
            } else {
              var holder = settings.markup[0];
              var item = settings.markup[1];
              var left = parent.find('#left');
              var right = parent.find('#right');
            }
            var bts = settings.customNavs[0] + ' ' + settings.customNavs[1];
            var active = item + '.active';
            var container = holder + ' ' + item;
            var currAct = parent.find(holder + ' ' + active).data('index');
            var current = parent.find(holder + ' ' + item + '[data-index="'+ currAct +'"]');
            var bulletA = parent.find(bts + '.active');
            var next = parent.find(holder + ' ' + item + '[data-index="'+ parseInt( currAct - 1 ) +'"]'); 
            if( parseInt( currAct - 1 ) < 0 ){
                next = parent.find(item + '[data-index="'+ last +'"]');
            }  
            if( wait === 0 ){ 
              wait = 1;
              bulletA.removeClass('active');
              bullet.eq( parseInt( currAct - 1 ) ).addClass('active');           
              current.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass( animation['out_dir2']);
              next.addClass('active ' + animation['in_dir1']);
              parent.find(next).one(animationEvent, function(event) {
/* Developed by Anunzio International */
                current.removeClass(animation['out_dir2']); 
                if( parent.find(active).length > 1 ){  
                    next.siblings().removeClass('active' + ' ' + animation['in_dir1'] + ' ' + animation['in_dir2'] + ' ' + animation['out_dir1'] + ' ' + animation['out_dir2']);
                    wait = 0;
                } 
            
                //custom callback - when slide transition animation ends
                settings.animationEnd.call();
              });
              //custom callback - on first slide reached
              if(  parseInt( currAct - 1 ) === 0 ){
                 settings.firstSlide.call();
              }
              //custom callback - on next slide transition
              settings.nextSlide.call();
            }
          },
          prev: function(){ 
             if( settings.layout != 'slider' ){
                var holder = '#mac-book';
                var item = '.hgi';     
              } else {
                var holder = settings.markup[0];
                var item = settings.markup[1];
              }
              var bts = settings.customNavs[0] + ' ' + settings.customNavs[1];
              var active = item + '.active';
              var container = holder + ' ' + item;
              var currAct = parent.find(holder + ' ' + active).data('index'); 
              var current = parent.find(holder + ' ' + item + '[data-index="'+ currAct +'"]');
              var bulletA = parent.find(bts + '.active'); 
              var prev = parent.find(holder + ' ' + item + '[data-index="'+ parseInt( currAct + 1 ) +'"]');
              bulletA.removeClass('active'); 
              if( parseInt( currAct + 1 ) > parseInt( last ) ){
                  prev = parent.find(item + '[data-index="0"]'); 
                  bullet.eq(0).addClass('active');
                } else if( parseInt( currAct + 1 ) <= parseInt( last ) ){
                  bullet.eq( parseInt( currAct + 1 ) ).addClass('active'); 
              }
              current.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass( animation['out_dir1']);
              prev.addClass('active ' + animation['in_dir2']);              
              parent.find(prev).one(animationEvent, function(event) {
                 current.removeClass(animation['out_dir1']);
                 if( parent.find(active).length > 1 ){ 
                      prev.siblings().removeClass('active' + ' ' + animation['in_dir1'] + ' ' + animation['in_dir2'] + ' ' + animation['out_dir1'] + ' ' + animation['out_dir2']);
                 } 
                 //custom callback - when slide transition animation ends
                 settings.animationEnd.call();
               });
              //custom callback - on last slide reached
/* Developed by Anunzio International */
              if(  parseInt( currAct + 1 ) === parseInt( last ) ){
                 settings.lastSlide.call();
              }
              //custom callback
              settings.prevSlide.call();
          },
          bullets: function(el){ 
              var parent = zis; 
              var bulItem =  settings.customNavs[0] + ' ' + settings.customNavs[1];
              var bulEl = settings.customNavs[1]; 
              var bullet = parent.find(bulItem);
              if( settings.layout != 'slider' ){ 
                var active = '.hgi.active';
                var index = el.closest('li').data('index'); 
                var slideIdx = parent.find('#mac-book .hgi.active').data('index');
                var currSlide = parent.find('#mac-book .hgi[data-index="'+ slideIdx +'"]');
                var nextSlide = parent.find('#mac-book .hgi[data-index="'+ parseInt( index ) +'"]');
              } else {
                var active = settings.markup[1] + '.active';
                var container = settings.markup[0] + ' ' + settings.markup[1];
                var index = el.data('index');
                var slideIdx = parent.find(container + '.active').index(); 
                var currSlide = parent.find(container + '[data-index="'+slideIdx+'"]');
                var nextSlide  = parent.find(container).eq(parseInt( index ));
              }
              var current = parent.find(bulEl+ '.active');
              if( !el.hasClass('active') && wait === 0 ){
                  wait = 1;
                  current.removeClass('active');
                  parent.find(bulItem + '[data-index="'+ index +'"]').addClass('active'); 
                  if( parseInt( index ) > parseInt( current.data('index') ) ){
                      currSlide.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir1']);
                      nextSlide.addClass('active ' + animation['in_dir2']);              
                      parent.find(nextSlide).one(animationEvent, function(event) {
                        currSlide.removeClass(animation['out_dir1']);
                        if( parent.find(active).length > 1 ){ 
                            nextSlide.siblings().removeClass('active' + ' ' + animation['in_dir1'] + ' ' + animation['in_dir2'] + ' ' + animation['out_dir1'] + ' ' + animation['out_dir2']);
                            wait = 0;
                        } 
                      });
                  } else{
                      currSlide.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir2']);
                      nextSlide.addClass('active ' + animation['in_dir1']);              
                      parent.find(currSlide).one(animationEvent, function(event) {
                        currSlide.removeClass(animation['out_dir2']);
                        if( parent.find(active).length > 1 ){ 
                            nextSlide.siblings().removeClass('active' + ' ' + animation['in_dir1'] + ' ' + animation['in_dir2'] + ' ' + animation['out_dir1'] + ' ' + animation['out_dir2']);
                            wait = 0;
                        } 
                      });
/* Developed by Anunzio International */
                  }//else      
              }//if
          },
          init: function() {
            var ID = '#' + parent.attr('id');
            var item = ( settings.layout === 'slider' ) ? ( settings.markup[0] + ' ' + settings.markup[1] ) : '#mac-book .hgi';
            var actI = settings.activeIndex;
            var startUp = ( settings.layout === 'slider' ) ? parent.find( settings.markup[0] + ' ' + settings.markup[1] ).eq(actI) : parent.find('#mac-book .hgi[data-index="'+ actI +'"]')
            if( settings.layout != 'slider' ){
              var left = parent.find('#mac-book #left');
              var right = parent.find('#mac-book #right'); 
              var firstBul = '#bullet-navs ul li[data-index="'+ actI +'"]';
            } else {
              var left = parent.find('#left');
              var right = parent.find('#right'); 
              var firstBul = settings.customNavs[0] + ' ' + settings.customNavs[1] + '[data-index="'+ actI +'"]';
            }
            var idx = 0;
            if( settings.layout === 'screen' ){ 
              var blt = '<li data-index=""><span class="blt"></span></li>';
              parent.find('#bullet-navs').append('<ul></ul>');
              parent.find(item).each(function(){
                  $(this).attr('data-index', idx);
                  parent.find('#bullet-navs ul').append(blt);
                  parent.find('#bullet-navs ul li').last().attr('data-index', idx);
                  idx++;
              });
            } else { 
            	if( settings.customNavs[0] === '#bullet-navs' ) { 
            		var blt = '<li data-index=""><span class="blt"></span></li>';
              		parent.find('#bullet-navs').append('<ul></ul>');
              		parent.find(item).each(function(){
	                    $(this).attr('data-index', idx);
	                    parent.find('#bullet-navs ul').append(blt);
	                    parent.find('#bullet-navs ul li').last().attr('data-index', idx);
	                    idx++;
	                });
                } else {
	                parent.find(settings.customNavs[0] + ' ' + settings.customNavs[1]).each(function(){
	                  $(this).attr('data-index', idx); 
	                  idx++;
	                });
            	}
            	 idx = 0;
	             parent.find(item).each(function(){
	                $(this).attr('data-index', idx);
	                idx++;
	             });
            }
            first = 0;
/* Developed by Anunzio International */
            last = parent.find(item).last().data('index'); 
            var bullet = parent.find('#bullet-navs li');
            // printing dynamic style
            var style = '<style data-title="'+ ID +'" type="text/css">';
            style += ID + ' #bullet-navs ul li span{background: '+ settings.bulletsColor +'}';
            style += ID + ' #bullet-navs ul li.active span{background: '+ settings.bulletsAC +'}';
            style += ID + ' ' + settings.markup[0] + '{height: '+ settings.height +'}';
            style += ID + ' ' + settings.markup[0] + '{width: '+ settings.width +'}';
            style += ID + ' ' + settings.markup[1] + '{height: 100%}';
            style += ID + '{margin-top: '+ settings.margin +'; margin-bottom: '+ settings.margin +'}';
            style += ID + ' ' + item + '.animated{-webkit-animation-duration: '+ settings.slideSpeed +'ms; animation-duration: '+ settings.slideSpeed +'ms;}';
            if( settings.customNavs[0] === '#bullet-navs' ){
            	style += ID + ' ' + settings.customNavs[0] + '{height: auto; position: absolute;bottom: 0px; padding: 0 0.5%; padding-top: 2px; width: 90%;}';
            } else {
            	style += ID + ' ' + settings.customNavs[0] + '{height: auto; position: absolute;bottom: 0px; padding: 0 0.5%; padding-top: 2px; width: 100%;}';
            }
            if( settings.customStyle ){
            	$.each( settings.customStyle, function(i,val){
            		style += val;
            	});
            }
            style += '</style>';   
            parent.closest('html').find('head').append(style); 
            if( settings.bullets === false ){
               parent.find('#bullet-navs').remove();
            }
            if( settings.arrows === false ){
               parent.find('#left, #right').remove();
            }
            //setting active index
            startUp.addClass('active ' + animation['in_dir1']);
            parent.find(firstBul).addClass('active');
            var active = parent.find('#mac-book .hgi.active').data('index'); 

            //check for direction and set arrows and bullets accordingly
            if( settings.direction === 'vertical' ){
               zis.addClass('vertical'); 
            }
            //arrows click detection 
            //right arrow
            if( settings.direction === 'horizontal' ){
              right.click(function(){ 
                  screenSlide.prev();
              });//right.click()
              //left arrow
              left.click(function(){
                  screenSlide.next();
              });//left.click()
            } else {
              right.click(function(){ 
/* Developed by Anunzio International */
                  screenSlide.prev();
              });//right.click()
              //left arrow
              left.click(function(){ 
                 screenSlide.next();
              });//left.click()
            }//if()
          },
          thumbs: function() {
          	var width = $(window).outerWidth();
          	var ID = parent.attr('id');
          	var xsmall = 480;
          	var small = 960;
          	var medium = 1200;
          	var large = 1600;
          	var elements = settings.customNavs[0] + ' ' + settings.customNavs[1];
          	if( settings.customNavs[0] === '#bullet-navs' ){
          		elements = 'none';
          	}
          	var xs = settings.thumbsSize.xsmall;
          	var sm = settings.thumbsSize.small;
          	var md = settings.thumbsSize.medium;
          	var lg = settings.thumbsSize.large;
          	var xl = settings.thumbsSize.xlarge;
          	var padding = '';
          	//if mobile
          	if( width <= xsmall ){
          		parent.find(elements).css({width: xs, height: xs});
          		padding = xs;
          	} else if( width > xsmall && width <= small ){ //if smartphone with large screen
          		parent.find(elements).css({width: sm, height: sm});
          		padding = sm;
          	} else if( width > small && width <= medium ){ //if large tablet or PC, or laptop
          		parent.find(elements).css({width: md, height: md});
          		padding = md;
          	} else if( width > medium && width <= large ){ //if large screen PC or Laptop
          		parent.find(elements).css({width: lg, height: lg});
          		padding = lg;
          	} else if( width > large ){ //if very large screen over 1600px
          		parent.find(elements).css({width: xl, height: xl});
          		padding = xl;
          	}
          	padding = padding + 10;
          	var style = ''; 
          	if( settings.fixedThumbs === true ){ 
          		if( settings.navPosition === 'bottom' ) {
	          		var pdg = '#' + ID + ' ' + settings.markup[1];
	          		var hgt = $('#' + ID + ' ' + settings.markup[0]).outerHeight();
	          		$(pdg).css('height', hgt - padding + 7 );
          		} else if( settings.navPosition === 'top' ) {
/* Developed by Anunzio International */
          			var pdg = '#' + ID + ' ' + settings.markup[1];
	          		var hgt = $('#' + ID + ' ' + settings.markup[0]).outerHeight();
	          		$(pdg).css({ height: hgt - padding, marginTop: padding - 7 });
          		} else if( settings.navPosition === 'left' ) {
          			var pdg = '#' + ID + ' ' + settings.markup[1];
	          		var hgt = $('#' + ID + ' ' + settings.markup[0]).outerWidth();
	          		$(pdg).css({ width: hgt - padding, marginLeft: padding });
          		} else if( settings.navPosition === 'right' ) { 
          			var pdg = '#' + ID + ' ' + settings.markup[1];
	          		var hgt = $('#' + ID + ' ' + settings.markup[0]).outerWidth(); 
	          		$(pdg).css({ width: hgt - padding, marginRight: padding });
          		}
          	} else {
          		var chg = '#' + ID + ' ' + settings.markup[0] + ' ' + settings.customNavs[0];
          		if( settings.navPosition === 'bottom' ) {
	          		$(chg).css('margin-bottom', -padding +'px');
	          		$('#' + ID + ' ' +settings.markup[0]).hover(function(){$(chg).animate({marginBottom: 0 },350)}, function(){$(chg).animate({ marginBottom: -padding +'px' },350) }) 
          		} else if( settings.navPosition === 'top' ) {
          			$(chg).css('margin-top', -padding +'px');
	          		$('#' + ID + ' ' +settings.markup[0]).hover(function(){$(chg).animate({marginTop: 0 },350)}, function(){$(chg).animate({ marginTop: -padding +'px' },350) }) 
          		} else if( settings.navPosition === 'left' ) {
          			$(chg).css('margin-left', -padding +'px');
	          		$('#' + ID + ' ' +settings.markup[0]).hover(function(){$(chg).animate({marginLeft: 0 },350)}, function(){$(chg).animate({ marginLeft: -padding +'px' },350) }) 
          		} else if( settings.navPosition === 'right' ) {
          			$(chg).css('margin-right', -padding +'px');
	          		$('#' + ID + ' ' + settings.markup[0]).hover(function(){$(chg).animate({marginRight: 0 },350)}, function(){$(chg).animate({ marginRight: -padding +'px' },350) }) 
          		}
          	}
          }//thumbs;
        }//screenSlide;

        // AUTOPLAY
        var autoplay = {
        //FIrst layout autoplay
        first: function() {
            var currActive = zis.find('.hgi.active').data('index');
            var next = zis.find('.phone-holder').find('.hgi[data-index="'+ parseInt( currActive + 1 ) +'"]');
            var last = zis.find('.phone-holder').find('.hgi').last().data('index');
            var prevIndex = zis.find('.hgi.active').data('index');
            var prev = zis.find('.phone-holder').find('.hgi[data-index="'+ prevIndex +'"]');
            zis.find('.highlight.active').removeClass('active');
            if( parseInt( currActive + 1 ) <= parseInt( last ) ){
                $('#'+ ID +':not(.hand)').find('.highlight[data-index="'+ parseInt( currActive + 1 ) +'"]').addClass('active');
            } else{
                next = zis.find('.phone-holder').find('.hgi[data-index="0"]');
                zis.find('.highlight[data-index="0"]').addClass('active');
            }//else
            if( 0 === wait )
            {
            	wait = 1;
/* Developed by Anunzio International */
	            zis.find('.hgi.active').removeClass('active ' + animation['in_dir1'] + ' ' + animation['in_dir2']);
	            if( next.hasClass('hgh-linner') ){
	                prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir2']);
		            next.addClass('active ' + animation['in_dir1']);
	                parent.find(prev).one(animationEvent, function(event) {
		                   prev.removeClass(animation['out_dir2']);
		                   if( zis.find('.phone-holder .hgi.active').length > 1 ){ 
		                        prev.removeClass('active');
		                   } 
		                   wait = 0;
		                   //custom callback
	                       settings.prevSlide.call();
		            });
	            } else {
	                  prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir1']);
		              next.addClass('active ' + animation['in_dir2']);
		              parent.find(prev).one(animationEvent, function(event) {
			              prev.removeClass(animation['out_dir1']);
			              if( zis.find('.phone-holder .hgi.active').length > 1 ){ 
			                      prev.removeClass('active');
			              } 
		              	  wait = 0;
		              	  //custom callback
	                      settings.nextSlide.call();
		             });  
	            }//else
	        }//if(wait === 0)
        },
        //Second layout autoplay
        second: function() {
            var currActive = zis.find('.hgi.active').data('index');
            var next = zis.find('.phone-hand').find('.hgi[data-index="'+ parseInt( currActive + 1 ) +'"]');
            var back = zis.find('.phone-hand').find('.hgi[data-index="'+ parseInt( currActive - 1 ) +'"]');
            var last = zis.find('.phone-hand').find('.hgi').last().data('index');
            var prevIndex = zis.find('.phone-hand .hgi.active').data('index');
            var prev = zis.find('.phone-hand').find('.hgi[data-index="'+ prevIndex +'"]');
            zis.find('.highlight.active').removeClass('active');
            if( lastHit === 0 && wait === 0 ){
               wait = 1;
               if( parseInt( currActive + 1 ) <= parseInt( last ) ){
                    zis.find('.highlight[data-index="'+ parseInt( currActive + 1 ) +'"]').addClass('active');
                    prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir2']);
	                next.addClass('active ' + animation['in_dir1']);
	                parent.find(prev).one(animationEvent, function(event) {
	                     prev.removeClass(animation['out_dir2']);
	                     if( zis.find('.phone-hand .hgi.active').length > 1 ){ 
	                        prev.removeClass('active');
	                     } 
	                     wait = 0;
	                     //custom callback
/* Developed by Anunzio International */
	                     settings.prevSlide.call();
	                });
               } else {
                  lastHit = 1;
                  wait = 0;
               }
            }//if 
            if( lastHit === 1 && wait === 0 ){ 
            	wait = 1;
                if( parseInt( currActive - 1 ) >= 0 ){
                    zis.find('.highlight[data-index="'+ parseInt( currActive - 1 ) +'"]').addClass('active');
                    prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir1']);
	                back.addClass('active ' + animation['in_dir2']);
	                parent.find(prev).one(animationEvent, function(event) {
	                    prev.removeClass(animation['out_dir1']);
	                    if( zis.find('.phone-hand .hgi.active').length > 1 ){ 
	                       prev.removeClass('active');
	                     } 
	                     wait = 0;
	                     //custom callback
	                     settings.nextSlide.call();
	                });
                } else {
                  lastHit = 0;
                  wait = 0;
                }  
            }//if 
        },
        //Third layout autoplay        
        third: function() {
            if( settings.layout != 'slider' ){
              var holder = '#mac-screen';
              var item = '.hgi';     
            } else {
              var holder = settings.markup[0];
              var item = settings.markup[1];
            }
            var bts = settings.customNavs[0] + ' ' + settings.customNavs[1];
            var active = item + '.active';
            var currActive = parent.find(holder + ' ' + active).data('index');
            var next = parent.find(holder).find(item + '[data-index="'+ parseInt( currActive + 1 ) +'"]');
            var back = parent.find(holder).find(item + '[data-index="'+ parseInt( currActive - 1 ) +'"]');
            var last = parent.find(holder).find(item).last().data('index');
            var prevIndex = parent.find(holder + ' ' + active).data('index');
            var prev = parent.find(holder).find(item + '[data-index="'+ prevIndex +'"]');
            var currB = parent.find(bts + '.active');
            var bullet = parent.find(bts);
	        currB.removeClass('active');
	        if( lastHit === 0 && wait === 0 ){
	           wait = 1;	
/* Developed by Anunzio International */
	           if( parseInt( currActive + 1 ) <= parseInt( last ) ){
	                    parent.find(bts+ '[data-index="'+ parseInt( currActive + 1 ) +'"]').addClass('active');
	                    prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir1']);
	                    next.addClass('active ' + animation['in_dir2']);
	                    parent.find(next).one(animationEvent, function(event) {
	                        prev.removeClass(animation['out_dir1']);
	                        if( parent.find(holder + ' ' + active).length > 1 ){ 
	                           prev.removeClass('active');
				   			   wait =0;
	                        } 
	                    });
	                    //custom callback
	                    settings.nextSlide.call();
	           } else {
	                  lastHit = 1;
	                  wait = 0;	
	           }
	        } 
	        if( lastHit === 1 && wait === 0 ){ 
	        	wait = 1;
	            if( parseInt( currActive - 1 ) >= 0 ){
	                    parent.find(bts+ '[data-index="'+ parseInt( currActive - 1 ) +'"]').addClass('active');
	                    prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir2']);
	                    back.addClass('active ' + animation['in_dir1']);
	                    parent.find(prev).one(animationEvent, function(event) {
	                       prev.removeClass(animation['out_dir2']);
	                       if( parent.find(holder + ' ' + active).length > 1 ){ 
	                          prev.removeClass('active');
				  			  wait = 0;	
	                        } 
	                    });
	                    //custom callback
	                    settings.prevSlide.call();
	            } else {
	                  lastHit = 0;
	                  wait = 0;	
	                  parent.find(bts+ '[data-index="'+ parseInt( currActive ) +'"]').addClass('active');
	            }  
	         }//if()
        }//third()

       }//autoplay();
       /*=================================
                FIRST LAYOUT
       =================================*/
       if( settings.layout === 'default' ){
           
           var ID = this.attr('id');
           var style = '<style type="text/css" data-title="'+ ID +'">';
           style += '#'+ ID +' .highlight-title .fa{background: '+ settings.circleColor +'; color: '+ settings.iconColor +'}';
/* Developed by Anunzio International */
           style += '#'+ ID +' .highlight.active h3:after{background: '+ settings.activeColor +'}';
           style += '#'+ ID +' .highlight.active .fa{background: '+ settings.activeColor +'}';
           style += '#'+ ID +'{background: '+ settings.background +'}';
           style += '#'+ ID + ' ' + '.hgi.animated{-webkit-animation-duration: '+ settings.slideSpeed +'ms!important; animation-duration: '+ settings.slideSpeed +'ms!important;}';
           style += '</style>';
           //print styles
           this.closest('html').find('head').append(style);

           // setting the default active screen
           parent.find('.hgi').addClass('animated');
           parent.find('.hgi[data-index="'+ settings.activeIndex +'"]').addClass('active ' + animation['in_dir1']);
           parent.find('.highlight[data-index="'+ settings.activeIndex +'"]').addClass('active');

           var hIndex = '';
           parent.find('.highlight').mouseenter(function(){
             if( !$(this).hasClass('active') && wait === 0  ){
             	  wait = 1;
             	  var parent = zis;
                  parent.find('.highlight.active').removeClass('active')
                  $(this).addClass('active');
                  hIndex = $(this).closest('.highlight').data('index');
                  var hgi = parent.find('.phone-holder').find('.hgi[data-index="'+ hIndex +'"]');
                  var prevIndex = parent.find('.phone-holder .hgi.active').data('index');
                  var prev = parent.find('.phone-holder').find('.hgi[data-index="'+ prevIndex +'"]');
                  parent.find('.hgi.active').removeClass(animation['in_dir1'] + ' ' + animation['in_dir2'] + ' active');    
                  if( hgi.hasClass('hgh-linner') ){
                         prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir2']);
                         hgi.addClass('active ' + animation['in_dir1']);
                         parent.find(prev).one(animationEvent, function(event) {
                            prev.removeClass(animation['out_dir2']);
                            if( $('.hgi.active').length > 1 ){ 
                               prev.removeClass('active');
                            } 
                            wait = 0;
                         });
                  } else {
                         prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir1']);
                         hgi.addClass('active ' + animation['in_dir2']);
                         parent.find(prev).one(animationEvent, function(event) {
                            prev.removeClass(animation['out_dir1']);
                            if( $('.hgi.active').length > 1 ){ 
                               prev.removeClass('active');
                            } 
                            wait = 0;
                         });
                  }//else
             }// if !hasClass()
           });//mouseenter()

           // aligning the rows and phone
/* Developed by Anunzio International */
           parent.find('.row').each(function(){
              var height = $(this).outerHeight();
              var padding = ( height - 550 ) / 2;
              $(this).css('padding', padding + 'px 0px');
           });

           // First layout autoplay
           //if autoplay enabled
           if( settings.autoplay === true ){ 
             var play = setInterval(autoplay.first, parseInt( settings.autoplaySpeed) ); 
           }//if (autoplay === true)

           //pause autoplay on hover
           if( settings.autoplay === true ){
               zis.find('.highlight').hover(function(){ clearInterval(play) }, function(){ play = setInterval(autoplay.first, parseInt( settings.autoplaySpeed ) ); } );
           } 

           //stop autoplay on hover
           if( settings.autoplayStop === true ){ 
                 zis.find('.highlight').mouseenter(function(){
                      clearInterval(play);
                 });
           }

      }//if(layout === default);
      else if( settings.layout === 'hand' ){

          /*================================
                  SECOND LAYOUT
          =================================*/
           var ID = this.attr('id');
           var style = '<style type="text/css" data-title="'+ ID +'">';
           style += '#'+ ID +' .highlight-title .fa{background: '+ settings.circleColor +'; color: '+ settings.iconColor +'}';
           style += '#'+ ID +' .highlight.active h3:after{background: '+ settings.activeColor +'}';
           style += '#'+ ID +' .highlight.active .fa{background: '+ settings.activeColor +'}';
           style += '#'+ ID +'{background: '+ settings.background +'}';
           style += '#'+ ID + ' ' + '.hgi.animated{-webkit-animation-duration: '+ settings.slideSpeed +'ms; animation-duration: '+ settings.slideSpeed +'ms;}';
           style += '</style>';
           //print styles
           this.closest('html').find('head').append(style);
           var Parent = this;
           //setting the default active screen
           Parent.find('.hgi').addClass('animated');
           Parent.find('.hgi[data-index="'+ settings.activeIndex +'"]').addClass('active ' + animation['in_dir1']);
           Parent.find('.highlight[data-index="'+ settings.activeIndex +'"]').addClass('active');

           Parent.on('mouseenter', '.highlight',function(){
              if( !$(this).hasClass('active') && wait === 0 ){
              	 wait = 1;
                 zis.find('.highlight.active').removeClass('active')
/* Developed by Anunzio International */
                 $(this).addClass('active')
                 var Index = $(this).data('index');        
                 var parent = zis;
                 var current = parent.find('.phone-hand').find('.hgi[data-index="'+ Index +'"]');
                 var prevIndex = parent.find('.phone-hand .hgi.active').data('index');
                 var prev = parent.find('.phone-hand').find('.hgi[data-index="'+ prevIndex +'"]');
                 if( parseInt(Index) > parseInt(prevIndex) ){
                       prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir2']);
                       current.addClass('active ' + animation['in_dir1']);
                       parent.find(prev).one(animationEvent, function(event) {
                          prev.removeClass(animation['out_dir1'] + ' ' + animation['out_dir2']);
                          if( $('.zenith_slider.hand .hgi.active').length > 1 ){ 
                             prev.removeClass('active');
                          } 
                          wait = 0;
                       });
                 } else {
                       prev.removeClass(animation['in_dir1'] + ' ' + animation['in_dir2']).addClass('active ' + animation['out_dir1']);
                       current.addClass('active ' + animation['in_dir2']);
                       parent.find(prev).one(animationEvent, function(event) {
                          prev.removeClass(animation['out_dir1'] + ' ' + animation['out_dir2']);
                          if( zis.find('.hgi.active').length > 1 ){ 
                             prev.removeClass('active');
                          } 
                          wait = 0;
                       });
                }//else
              }//if
           });//mouseenter()

           // Second layout autoplay
           //if autoplay enabled
           if( settings.autoplay === true ){ 
             var play = setInterval(autoplay.second, parseInt( settings.autoplaySpeed) ); 
           }//if (autoplay === true)

           //pause autoplay on hover
           if( settings.autoplay === true ){
               zis.find('.highlight').hover(function(){ clearInterval(play) }, function(){ play = setInterval(autoplay.second, parseInt( settings.autoplaySpeed ) ); } );
           } 

           //stop autoplay on hover
           if( settings.autoplayStop === true ){ 
                 parent.find('.highlight').mouseenter(function(){
                      clearInterval(play);
                 });
           }

      } else if( settings.layout === 'screen' ) {

/* Developed by Anunzio International */
           /*================================
                    THIRD LAYOUT
          =================================*/      
          screenSlide.init();

          var bullet = parent.find('#bullet-navs li')
         
          //bullets-nav on click - change slides
          bullet.click(function(){
            var current = $(this)
              screenSlide.bullets(current);
          });//bullet.click()
          
           // Third layout autoplay
           //if autoplay enabled
           if( settings.autoplay === true ){ 
             var play = setInterval(autoplay.third, parseInt( settings.autoplaySpeed) ); 
           }//if (autoplay === true)

           //pause autoplay on hover
           if( settings.autoplayPause === true && settings.autoplay === true ){
               zis.find('#mac-screen').hover(function(){ clearInterval(play) }, function(){ play = setInterval(autoplay.third, parseInt( settings.autoplaySpeed ) ); } );
           }//if 

           //stop autoplay on hover
           if( settings.autoplayStop === true ){ 
                 zis.find('#mac-screen').mouseenter(function(){
                      clearInterval(play);
                 });
           }//if

           //Screen gestures, with the help of hammer.js 
           var Screen = document.getElementById('mac-screen');
           var touch = new Hammer(Screen);
           touch.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
           //if pan-ed to the left
            touch.on("swipeleft", function(ev) {
              if( settings.direction === 'horizontal' ){
                screenSlide.prev();
              }
            });
            //if pan-ed to the right
            touch.on("swiperight", function(ev) {
              if( settings.direction === 'horizontal' ) {
                  screenSlide.next();
              } 
            });
            //if pan-ed to the top
            touch.on("swipeup", function(ev) {
              if( settings.direction === 'vertical' ){
/* Developed by Anunzio International */
                screenSlide.prev();
              }
            });
            //if pan-ed to the bottom
            touch.on("swipedown", function(ev) {
              if( settings.direction === 'vertical' ){
                screenSlide.next();
              }
            });
            //if pressed inside the screen pause autoplay, if enabled
            touch.on("press", function(ev) {
                clearInterval(play)
            });
            // continue with autoplay after releases
            touch.on("pressup", function(ev) {
                play = setInterval(autoplay.third, parseInt( settings.speed ) )
            });
           
      } else if( settings.layout === 'slider' ) {

          /*================================
                   SLIDER LAYOUT
          =================================*/   
   
          //make preparation / initialize the slider   
          screenSlide.init();
          //check for screen size and determine the thumbs size
          if( settings.customNavs[0] === '#tf_thumbs' ) {
          	  screenSlide.thumbs();
          }
                   
          var ID = '#' + parent.attr('id');
		  var style = '';
          //check if slider if set to full width
          if( settings.fullWidth === true ){
          	parent.find(settings.markup[0]).css({ width: '100%', margin: 0, height: $(window).outerHeight() });
          	parent.css('margin', 0)
          }
          //check for navigation position
          if( settings.navPosition === 'top' && settings.fixedThumbs === false ){ 	 
          	 style += ID + ' ' + settings.customNavs[0] + '{top: 3px; }';      	
          } else if( settings.navPosition === 'top' && settings.fixedThumbs === true ){
          	 style += ID + ' ' + settings.customNavs[0] + '{top: 0px; bottom: auto!important}';
          } else if( settings.navPosition === 'left' && settings.direction === 'vertical' ){
          	  if( settings.customNavs[0] === '#tf_thumbs' ){
          	  	 style += ID + ' ' + settings.customNavs[0] + '{left: 0px;}';
          	  }	else {
          	 	 style += ID + ' ' + settings.customNavs[0] + '{left: 3px;}';
          	  }
          } else if( settings.navPosition === 'right' && settings.direction === 'vertical' ){
/* Developed by Anunzio International */
          	 if( settings.customNavs[0] === '#tf_thumbs' ){
          	  	 style += ID + ' ' + settings.customNavs[0] + '{right: 0px;}';
          	  }	else {
          	 	 style += ID + ' ' + settings.customNavs[0] + '{right: 3px;}';
          	  }
          }
          //prepend additional style so user custom style can still override any other rule
          parent.closest('html').find('head style[data-title="'+ ID +'"]').prepend(style);

          var bulEl = settings.customNavs[1]; 
          var bullet = parent.find(settings.customNavs[0] + ' ' + settings.customNavs[1]);

          parent.find(settings.markup[0]).addClass(settings.style);

          if( settings.thumbsBG === false ){
              parent.find('#tf_thumbs').addClass('no-bg');
           } 

          //bullets-nav on click - change slides
          bullet.click(function(){
              var current = $(this);
              screenSlide.bullets(current);
          });//bullet.click()

          //on screen resize
          $(window).resize(function(){
          	 if( settings.customNavs[0] === '#tf_thumbs' ) {
          	 	screenSlide.thumbs();
          	 }
          });
          
           // Third layout autoplay
           //if autoplay enabled 
           if( settings.autoplay === true ){
             var play = setInterval(autoplay.third, parseInt( settings.autoplaySpeed) ); 
           }//if (autoplay === true)

           //pause autoplay on hover
           if( settings.autoplayPause === true && settings.autoplay === true ){
               parent.find(settings.markup[0]).hover(function(){ clearInterval(play) }, function(){ play = setInterval(autoplay.third, parseInt( settings.autoplaySpeed ) ); } );
           }//if 

           //stop autoplay on hover
           if( settings.autoplayStop === true && settings.autoplay === true ){ 
                 parent.find(settings.markup[0]).mouseenter(function(){
                      clearInterval(play);
                 });
           }//if
           //Screen gestures, with the hel of hammer.js 
           var ID = parent.attr('id');
/* Developed by Anunzio International */
           var Screen = document.getElementById(ID);
           var touch = new Hammer(Screen);
           touch.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
           //if pan-ed to the left
            touch.on("swipeleft", function(ev) {
              if( settings.direction === 'horizontal' ){
                screenSlide.prev();
              }
            });
            //if pan-ed to the right
            touch.on("swiperight", function(ev) {
              if( settings.direction === 'horizontal' ){
                screenSlide.next();
              }
            });
            //if pan-ed to the top
            touch.on("swipeup", function(ev) {
              if( settings.direction === 'vertical' ){
                screenSlide.prev();
              }
            });
            //if pan-ed to the bottom
            touch.on("swipedown", function(ev) {
              if( settings.direction === 'vertical' ){
                screenSlide.next();
              }
            });
            //if pressed inside the screen pause autoplay, if enabled
            touch.on("press", function(ev) {
                clearInterval(play)
            });
            // continue with autoplay after releases
            touch.on("pressup", function(ev) {
                play = setInterval( autoplay.third, parseInt( settings.autoplaySpeed ) )
            });
           
      }//else
    }; //highlights();
})(jQuery);
