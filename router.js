// Filename: router.js
require([
  'jquery',
  'underscore',
  'backbone', 
  '../pages/LoginPage',
  '../pages/SignUpPage',
  '../pages/HomePage' 
  
],function($, _, Backbone, LoginPageVIew, signUp, HomePageView){

  var AppRouter = new (Backbone.Router.extend({
      routes: { 
      '':'fnindex',
      'login': 'showLogin', 
      'signUp':'signUp',      
      'pages/:id':'homeNavigation',
      '*actions': 'defaultAction',

    },

    start:function(){
    	Backbone.history.start();
    },
    showLogin:function(){  

    	LoginPageVIew.render();
    },
    signUp:function(){
    	signUp.render();
    },
  	fnindex:function(){     	
       	this.navigate('login',{trigger:true});
  	},

  	homeNavigation:function(id){
     	if(localStorage.getItem("username") == App.storage.username){
  	   	HomePageView.loadPage(id);
      }else{
        this.fnindex();
      }
  	},
	defaultAction:function(actions){
 		console.log('No route:', actions);
	}


  }))();

    

  App.router.approuter = AppRouter;
	App.router.approuter.start();
  

});