define(['jquery', 'underscore', 'backbone', 'bootstrap'], function($, _, Backbone, Boot) {

	localStorage.removeItem("username");
	localStorage.removeItem("password");
	App.storage.username = "";
	App.storage.password = "";
	
});
		