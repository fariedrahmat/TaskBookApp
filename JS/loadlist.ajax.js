/**
 * Script for loading the Task list.
 *
 * Constant RESTROUTE and variable token inherited from oauth.js.
 */

 var pageCount = 1;



 function getDate(object){

 	// date format
 	let date;
 	let options = {
 		weekday: "long",
 		year: "numeric",
 		month: "short",
 		day: "numeric",
 		hour: "2-digit",
 		minute: "2-digit",
 	};

 	if ( !object.modified ){
 		let taskDate = new Date(object.date);
 		date = 'Buku dibuat <time datetime="' + object.date + '">' + taskDate.toLocaleDateString("en-us", options) + '</time>';
 	} else {
 		let taskModified = new Date(object.modified);
 		date = 'Buku Diubah <time datetime="' + object.modified + '">' + taskModified.toLocaleDateString("en-us", options) + '</time>';
 	}

 	return date;

 }

 function getStatus(status){

 	let taskStatus;

 	if (status){
 		taskStatus = 'Completed';
 	} else {
 		taskStatus = 'In Progress';
 	}

 	return taskStatus;

 }

 function createTaskList(object) {
 	// $('.task-list').empty().append('<ul></ul>');

 	for( let i=0; i<object.length; i++ ) {
 		let navListItem =
 		'<li>' +
 		'<a href="single.html?task=' + object[i].id + '">' +
 		'<h2 class="task-title">' + object[i].title.rendered + '</h2>' +
 		'<div class="task-date">' +
 		getDate(object[i]) + 
 		'</div>' +
 		'<div class="task-status">' + getStatus(object[i].task_status) + '</div>' +
 		'</a>' +
 		'</li>';

 		$('.task-list ul').append(navListItem);
 	}
 	// console.info(object);

 	$('.main-area').append('<button class="more">Memuat Buku</button>');
 	morePostsTrigger();

 }

 function getTaskList(listRoute) {

	$('.more').remove();

	$(".task-list").append('<div class="loader"><img src="JS/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: listRoute
	})

	.done(function(object) {
		createTaskList(object);
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {
		$('.loader').remove();
	})

}


// fungsi morePost

function morePostsTrigger() {

	var triggerPosition = $('.more').offset().top - $(window).outerHeight();

	$(window).scroll(function(event) {
		if ( triggerPosition > $(window).scrollTop() ){
			return;
		}

		pageCount++;

		listRoute = RESTROUTE + '?page=' + pageCount;

		getTaskList(listRoute);

		$(this).off(event);
	});
}



if ( token !== null ) {
	let listRoute = RESTROUTE;
	getTaskList(listRoute);
} else {
	window.location.href = "/";
}