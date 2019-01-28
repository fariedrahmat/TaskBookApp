/**
 * Script for loading the Task list.
 *
 * Constant RESTROUTE and variable token inherited from oauth.js.
 */

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
 	$('.task-list').empty().append('<ul></ul>');

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
 	console.info(object);
 }
 function getTaskList() {

 	$(".task-list").append('<div class="loader"><img src="JS/spinner.svg" class="ajax-loader" /></div>');

 	jso.ajax({
 		dataType: 'json',
 		url: RESTROUTE
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

 if ( token !== null ) {
 	getTaskList();
 } else {
 	window.location.href = "/";
 }