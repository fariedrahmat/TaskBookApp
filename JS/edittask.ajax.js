function createTask(formData){
	jso.ajax({
		dataType: 'json',
		url: RESTROUTE,
		method: 'POST',
		data: formData
	})

	.done(function(object) {
		alert("done !");
		window.location.href = "/tasklist.html";

	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {
		
	})
}


function generateJSON(){
	let formData = {
		"status": "publish",
		"title" : $('input[name=title]').val(), //.val value
		"content": $('textarea[name=description]').val(),
		"cmb2": {

			"taskbook_metabox": {
				"taskbook_text": $('input[name=kategori]').val(),
				"taskbook_pre_level": $('input[name=pre-level]:checked').val()
			}
		},

		"task_status": false
	};




	createTask(formData);

}


$(document).on('submit', '#task-form', function(event){
	event.preventDefault();
	generateJSON();
})