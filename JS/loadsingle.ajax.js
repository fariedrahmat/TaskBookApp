// load single book


var urlParams = new URLSearchParams(window.location.search);
const CURRENTID = urlParams.get('task');
console.info('Task ID: ', CURRENTID);


function getDate(object) {

	var options = {
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	var taskDate = new Date(object.date);
	var date =
	'<div class="task-date">' +
	'Task created ' +
	'<time>' +
	taskDate.toLocaleDateString("en-us", options) +
	'</time>' +
	'</div>';

	var modifiedDate = new Date(object.modified);
	var modified = '';
    // Set modified only if taskDate and modifiedDate are different:
    if ( object.date != object.modified ) {
    	modified =
    	'<div class="task-date">' +
    	'Task updated ' +
    	'<time>' +
    	modifiedDate.toLocaleDateString("en-us", options) +
    	'</time>' +
    	'</div>';
    }

    return date + modified;
}

//convert number to value

function getLevel(objectLevel){
	switch (objectLevel){
		case '3':
		return 'Sulit';
		break;
		case '2':
		return 'Sedang';
		break;
		case '1':
		return 'Mudah';
		break;
	}
}




//get detail book

function createTask(object) {

	$('.single-task').empty().append( '<article class="task"></article>' );

	var task =
	'<h2 class="task-title">' +
	object.title.rendered +
	'</h2>' +
	'<div class="task-meta">' +
	getDate(object) +
	'</div>' +
	'<div class="task-description task-block">' +
	object.content.rendered +
	'</div>' +
	'<h3 class="task-sub">' +
	'Tingkatan Buku' +
	'</h3>' +
	'<div class="task-pre-level level">' +
	getLevel(object.cmb2.taskbook_metabox.taskbook_pre_level) +
	'</div>' +
	'</div><!-- .book -->';

	$('.single-task article').append(task);
}


function getTask(taskRoute){
	$(".task-list").append('<div class="loader"><img src="JS/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: taskRoute
		
	})

	.done(function(object) {
		createTask(object)
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {
		$('.loader').remove();
	})
}



if ( CURRENTID !== null){
	let taskRoute = RESTROUTE + CURRENTID;
	console.info('taskRoute: ', taskRoute);
	getTask(taskRoute);
} else {
	window.location.href = "/tasklist.html";
}