//'use strict';

var $window = jQuery(window);

!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof module&&module.exports?module.exports=b():a.WhenInViewport=b()}(this,function(){function a(a,b,c){j.setup(),this.registryItem=i.addItem(a,"function"==typeof b?f(c||{},{callback:b}):b),i.processItem(this.registryItem)}function b(){return"innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight}function c(){return"pageYOffset"in window?window.pageYOffset:document.documentElement.scrollTop||document.body.scrollTop}function d(a){return a.getBoundingClientRect().top+c()}function e(a,b,c){for(var d in a)if(a.hasOwnProperty(d)&&!1===b.call(c,a[d],d))break}function f(a){for(var b=1;b<arguments.length;b++)e(arguments[b],function(b,c){a[c]=b});return a}var g,h;a.prototype.stopListening=function(){i.removeItem(this.registryItem),j.removeIfStoreEmpty()},a.defaults={threshold:0,context:null},f(a,{setRateLimiter:function(a,b){return j.rateLimiter=a,b&&(j.rateLimitDelay=b),this},checkAll:function(){return h=c(),g=b(),i.adjustPositions(i.processItem),j.removeIfStoreEmpty(),this},destroy:function(){return i.store={},j.remove(),delete j.scrollHandler,delete j.resizeHandler,this},registerAsJqueryPlugin:function(b){return b.fn.whenInViewport=function(c,d){var e,f=function(a){return function(c){a.call(this,b(c))}};return e="function"==typeof c?b.extend({},d,{callback:f(c)}):b.extend(c,{callback:f(c.callback)}),this.each(function(){e.setupOnce?!b.data(this,"whenInViewport")&&b.data(this,"whenInViewport",new a(this,e)):b.data(this,"whenInViewport",new a(this,e))})},this}});var i={store:{},counter:0,addItem:function(b,c){var e="whenInViewport"+ ++this.counter,g=f({},a.defaults,c,{storeKey:e,element:b,topOffset:d(b)});return this.store[e]=g},adjustPositions:function(a){e(this.store,function(b){b.topOffset=d(b.element),a&&a.call(i,b)})},processAll:function(){e(this.store,this.processItem,this)},processItem:function(a){h+g>=a.topOffset-a.threshold&&(this.removeItem(a),a.callback.call(a.context||window,a.element))},removeItem:function(a){delete this.store[a.storeKey]},isEmpty:function(){var a=!0;return e(this.store,function(){return a=!1}),a}},j={setuped:!1,rateLimiter:function(a,b){return a},rateLimitDelay:100,on:function(a,b){return window.addEventListener?window.addEventListener(a,b,!1):window.attachEvent&&window.attachEvent(a,b),this},off:function(a,b){return window.removeEventListener?window.removeEventListener(a,b,!1):window.detachEvent&&window.detachEvent("on"+a,b),this},setup:function(){var a=this;this.setuped||(h=c(),g=b(),this.scrollHandler=this.scrollHandler||this.rateLimiter(function(){h=c(),i.processAll(),a.removeIfStoreEmpty()},this.rateLimitDelay),this.resizeHandler=this.resizeHandler||this.rateLimiter(function(){g=b(),i.adjustPositions(i.processItem),a.removeIfStoreEmpty()},this.rateLimitDelay),this.on("scroll",this.scrollHandler).on("resize",this.resizeHandler),this.setuped=!0)},removeIfStoreEmpty:function(){i.isEmpty()&&this.remove()},remove:function(){this.setuped&&(this.off("scroll",this.scrollHandler).off("resize",this.resizeHandler),this.setuped=!1)}};if("undefined"!=typeof window){var k=window.jQuery||window.$;k&&a.registerAsJqueryPlugin(k)}return a});

function check_if_in_view() {
  var $animation_elements = jQuery('[data-animation="1"]');
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  jQuery.each($animation_elements, function() {
    var $element = jQuery(this);
	  var $class = $element.attr('data-animation-class');

	   var $time = $element.attr('data-animation-time');
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {

		setTimeout(function() {
			$element.addClass('animated ' + $class).removeClass('animated-element');
      $element.removeAttr("data-animation").removeAttr("data-animation-class").removeAttr("data-animation-time");
		}, $time);

    } /* else {
		$element.removeClass('in-view');
    }*/
  });
}
$window.on('load',function(){
	check_if_in_view();
});

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');


jQuery(document).ready(function ($) {
	
	$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
	var $offsettop = 10;
	if ($('body').hasClass('admin-bar')) $offsettop = 32;
    if (scroll > 10) {
        $("#header").addClass("clearHeader");
    } else {
        $("#header").removeClass("clearHeader");
    }
	});

// toTop button 
	$(window).scroll(function () {
		if ( $(this).scrollTop() !== 0 ) $('#toTop').fadeIn();
		else $('#toTop').fadeOut();
	});
	$('#toTop').click(function () {
		$('body,html').animate({scrollTop: 0}, 500);
	});


// responsive menu
	var $window = $(window),
		$nav = $('#menu'),
		$button = $('#button-menu'),
		$search_button = $('#searchform button');

	$button.on('click', function (event) {
		event.stopPropagation();
		if ($window.width() < 992) {
			$button.toggleClass('is-active');
			$nav.toggleClass('is-visible');
			//$nav.toggle();
			$('body').toggleClass('no-overflow');
		}
	});
	
	$search_button.on('click', function (event) {
		event.stopPropagation();
		if ($window.width() < 575){
			if($('#searchform #s').hasClass("is-visible")) {
				return true;
			} else {
				$('#searchform #s').addClass("is-visible");
				return false;
			}
		} else {
			return true;
		}
	});

	$window.on('resize', function () {
		if ($window.width() >= 992) {
			$button.removeClass('is-active');
			$nav.removeClass('is-visible');
			//$nav.show();
			$('body').removeClass('no-overflow');
		}
	});
	
	$window.on('click',function(event) { 
	var $target = $(event.target);
	if(!$target.closest('#menu').length &&  $('#menu').is(":visible") && $window.width() < 992) {
			$('#button-menu').removeClass('is-active');
			$('#menu').removeClass('is-visible');
			$('body').removeClass('no-overflow');
			//$('#menu').hide();
	} 
	if(!$target.closest('#searchform').length &&  $('#searchform #s').hasClass("is-visible") && $window.width() < 575) {
			$('#searchform #s').removeClass('is-visible');
	} 	
	});

// mobile sub-menus
	var $sub_menus = $nav.find('.sub-menu');
	$nav.find('.open-submenu').on( 'click', function () {
		$(this).parent().toggleClass('submenu-opened');
		$(this).siblings('.sub-menu').toggleClass('closed');
	});
	set_sub_menu_classes( $window.width() );
	$window.on('resize', function () {
		set_sub_menu_classes( $window.width() );
	});
	function set_sub_menu_classes( w ){
		if ( w < 992 ) {
			$sub_menus.addClass('closed');
		} else {
			$sub_menus.removeClass('closed');
			$nav.find('.submenu-opened').removeClass('submenu-opened');
		}
	}

$(document).on('click','.scroll-to > a, a.scroll-to',function(){
var scrollToEl = $(this).attr('href');
var $offsetTop = 60;
if ($('body').hasClass('single-product')) $offsetTop += 70;
if ($('body').hasClass('admin-bar')) $offsetTop +=32;
if ($(window).width()<768)   $offsetTop=54;
  $('html').animate(
    {
      scrollTop: $(scrollToEl).offset().top - $offsetTop,
    },
    800 //speed
  );

});


if ($('.faq-item').length>0){
	$(document).on('click','.faq-item .faq-question',function(){
		//$('.faqs .item.open .item-text').slideToggle();
		//$('.faqs .item.open').removeClass('open');
		
		$(this).siblings('.faq-answer').slideToggle();
		$(this).parents('.faq-item').toggleClass('open');
	});
}

document.addEventListener('wpcf7submit', function(event) {
    if (event.detail.status === 'mail_sent') {
		
		 if ($.magnificPopup) {
            $.magnificPopup.close();
        }
		
        var thank_message = event.detail.apiResponse ? event.detail.apiResponse.message : 'Дякуємо, повідомлення надіслано!';
        var html = '<div id="modal-success">';
            html += '<div class="inner">';
            html += '<button role="button" class="close"></button>';
            html += thank_message;
            html += '<br/><img src="/wp-content/themes/sm/img/form-success.svg" alt="" width="70" height="70">';
            html += '</div>';
            html += '</div>';
        $('body').append(html);

        $('#modal-success').fadeIn(300,function(){
            $('#modal-success img').addClass('successAnimation');
        });

        setTimeout(function() {
            if ($('#modal-success').length >0 ) {
                $('#modal-success').fadeOut(300,function(){
                    $('#modal-success').remove();
                });
            }
        }, 5000);
    }
}, false);

$(document).on('click','#modal-success',function(){
	$('#modal-success').fadeOut(300,function(){
        $('#modal-success').remove();
	});
});


if(window.location.hash) {
     var elem = window.location.hash;
	 var $offset_top = 56;
	 if ($('body').hasClass('admin-bar')) $offset_top += 32;
	 if ($('body').hasClass('.single-product')) $offset_top += 70;
     $('html,body').animate({
          scrollTop: $(elem).offset().top-$offset_top
        }, 1000);
        return false;
}


if ($('.brands-carousel').length>0){
	$('.brands-carousel').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		nav: false,
		dots: false,
		infinite: true,
		centerMode:false,
		prevArrow:"",
        nextArrow:"",
		 responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
       settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
		centerMode:true
      },
    },
  ],
});
}

if ($('.advantages').length>0){
	$('.advantages').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		nav: true,
		dots: false,
		infinite: true,
		centerMode:false,
		prevArrow:"<button class='slick-prev slick-arrow'><i class='ic ic-arrow-left'></i></button>",
        nextArrow:"<button class='slick-next slick-arrow'><i class='ic ic-arrow-right'></i></button>",
		 responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
       settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
}

if ($('.news-carousel').length>0){
	$('.news-carousel').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		nav: true,
		dots: false,
		infinite: true,
		centerMode:false,
		prevArrow:"",
        nextArrow:"<button class='slick-next slick-arrow'><i class='ic ic-angle-right'></i></button>",
		 responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
       settings: {
        slidesToShow: 1.3,
		infinite:false,
        slidesToScroll: 1,
		nav: false
      },
    },
  ],
});
}


$('.slick-slider').find('[aria-hidden]').removeAttr('aria-hidden');

    // Устанавливаем aria-hidden="false" для всех слайдов при смене слайдов
    $('.slick-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        setTimeout(() => {
            slick.$slides.removeAttr('aria-hidden');
        }, 0);
    });
	
	if ($('.subscribe-code .mc4wp-form').length > 0){
		var lang = $('html').attr('lang');
		
		if (lang == 'ru-RU'){
			$('.subscribe-code .mc4wp-form .mc4wp-form-fields input#email').attr('placeholder','Введите ваш email')
			$('.subscribe-code .mc4wp-form .mc4wp-form-fields button[type="submit"]').text('Подписаться');
		}
		
		if (lang == 'en-GB'){
			$('.subscribe-code .mc4wp-form .mc4wp-form-fields input#email').attr('placeholder','Enter your email')
			$('.subscribe-code .mc4wp-form .mc4wp-form-fields button[type="submit"]').text('Subscribe');
		}
	}

});