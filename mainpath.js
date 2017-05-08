

require.config( {
    paths: {
       'jquery': 'jquery',		
		'underscore':'underscore',
		'backbone':'backbone',
        'backbone.validation':'backbone-validation',
        'backbone.stickit':'backbone.stickit.min',		
		'text': "text",		
        'router':'../router',       
        'bootstrap':'bootstrap.min'
        
    },
    shim:{
    	'backbone': ['underscore', 'jquery'],
    	'backbone.validation' :['backbone', 'backbone.stickit'],
        'backbone.stickit':['backbone'],
        'backbone.localStorage':['backbone'],
        'bootstrap':['jquery']
    },
    baseUrl: 'libs'
} );


var App = {
    router:{},
    storage:{ username:"", password:""}
}
require(['router'],function(App){
 
});