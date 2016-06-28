$(document).ready(function() {
	// var s = Snap('#drawingArea');
	// var colorCode = '../assets/color-block-code.svg';
	// var text = '../assets/designer-developer.svg';

	// Snap.load(colorCode, function(fragment) {
	// 	var element = fragment.select('svg');
	// 	s.append(element);
	// });

	// Snap.load(text, function(fragment) {
	// 	var element = fragment.select('svg');
	// 	s.append(element);
	// });
	var str = "text/javascript";
	console.log(str.length);

	/* mobile nav*/
	$('.menu-icon').click(function() {
		var icon = $(this);

		if( $('.mobile-nav').hasClass('open') ) {
			$('.mobile-nav').removeClass('open');
		} else {
			$('.mobile-nav').addClass('open');
		}
	});

	$('.mobile-nav').click(function() {
		$('.mobile-nav').removeClass('open');
	});

	$.fn.isOnScreen = function(){
	    var element = this.get(0);
	    var bounds = element.getBoundingClientRect();
	    return bounds.top < window.innerHeight && bounds.bottom > 0;
	}

	$(window).scroll(function() {
		var width = $(window).width();

		if ( $('.hero').isOnScreen() && width > 767 ) {
			$('.download').fadeOut(200);
		} 

		else if ( width <= 767 ) {
			$('.download').hide();
		}

		else {
			$('.download').fadeIn(200);
		}
	});

	$('.hero .arrow').click(function() {
		$('html, body').animate({
	        scrollTop: $("#synopsis").offset().top
	    }, 1000);
	});

	/* new */
	// function showProjects(projects) {
	// 	var projects = projects;

	// 	$(projects).each(function(i) {
	// 		var name = projects[i].name;
	// 		var type = projects[i].type;
	// 		var pic = projects[i].picture;
	// 		var desc = projects[i].description;
	// 		var role = projects[i].role;
	// 		var resp = projects[i].responsibilities;
	// 		var icons = projects[i].tool_icons;

	// 		var html = 
	// 		'<section class="project ' + type +'">' +
	// 			'<div class="container">' +
	// 				'<div class="col-sm-7 img-container">' +
	// 					'<img src="' + pic + '" alt="">' +
	// 				'</div>' +
	// 				'<div class="col-sm-5 description">' +
	// 					'<h2>' + name + '</h2>' +
	// 					'<h3>' + desc + '</h3>' +
	// 					'<p class="role">Role: ' + role + '</p>' + 
	// 					'<p class="resp">Responsibilities: ' + resp + '</p>' +
	// 					'<div class="tools">' ;
	// 						$(icons).each(function(index) {
	// 							var path = icons[index];

	// 							if ( path === 'assets/icon-jquery.png' ) {
	// 								var img = '<img src="' + path + '" class="smaller">';
	// 							} else {
	// 								var img = '<img src="' + path + '">';
	// 							}
								
	// 							html += img;
	// 						})
	// 						html +=
	// 					'</div>' +
	// 				'</div>' +
	// 			'</div>' +
	// 		'</section>';

	// 		$('.project-container-2').append(html);
	// 	});
	// };

	// if ( top.location.pathname === '/portfolio.html' ) {
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: '../projects.json',
	// 		success: function(projects) {
	// 			showProjects(projects);
	// 		}
	// 	});
	// }

	/* original */
	/* portfolio */
	// function adjustCss() {
	// 	$('.project:visible:even').css('background-color', '#fff')
	// 		.find('.img-container').css('float', 'left')
	// 		.siblings('.description').css('text-align', 'left');

	// 	$('.project:visible:odd').css('background-color', '#F0EFEF')
	// 		.find('.img-container').css('float', 'right')
	// 		.siblings('.description').css('text-align', 'right');
	// };

	// function showProjects(category, time) {
	// 	// var category = category;
	// 	// var projects = $('.project-container');

	// 	// projects.detach();

	// 	// projects.find('.project').hide();
	// 	// projects.find('.web').show();

	// 	// projects.find('.project:visible:even').css('background-color', 'red')
	// 	// 	.find('.img-container').css('float', 'left')
	// 	// 	.siblings('.description').css('text-align', 'left');

	// 	// projects.find('.project:visible:odd').css('background-color', '#F0EFEF')
	// 	// 	.find('.img-container').css('float', 'right')
	// 	// 	.siblings('.description').css('text-align', 'right');

	// 	// $('.project-filter').append(projects);


	// 	// if ( category === '*' ) {
	// 	// 	$('.project').fadeIn(time, function() { adjustCss(); });
	// 	// } 

	// 	// else if ( category === '.web' ) {
	// 	// 	console.log('web');

	// 	// 	$('.web').show();
	// 	// 	adjustCss(); 
	// 	// 	$('.project-filter').append(projects);
	// 	// }

	// 	// else if ( category === '.print' ) {
	// 	// 	$('.print').fadeIn(time, function() { adjustCss(); });
	// 	// }
	// };

	// $('.project-filter button').click(function() {
	// 	// var category = $(this).attr('data-filter');
	// 	// showProjects(category, 200);
	// });

	
});