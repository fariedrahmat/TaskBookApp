function getTaskList(){

$(".task-list").append('<div class="loader"><img src="JS/spinner.svg" class="ajax-loader"/> </div>')

}

if ( token !== null ) {
	getTaskList();
} else {
	window.location.href = "/";
}