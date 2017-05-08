define(['jquery',
    'underscore',
    'backbone',
    'text!../pages/templates/loginpage.html',
    'bootstrap'],
    function($, _, Backbone, LoginPage) {




        var LoginUpModel = Backbone.Model.extend({


            url: "dataModel/data.json",

            validate: function(attrs) {
                var errorMeg = "";
                if (!attrs.username) {
                    errorMeg = "Enter username";
                }
                if (!attrs.password) {
                    errorMeg += " Enter password";
                }
                return errorMeg;
            }
        });






        var LoginpageView = Backbone.View.extend({

            initialize: function(options) {
                //this.render(options);				
            },

            render: function(options) {

                var template = _.template(LoginPage, {})
                this.$el.html(template);
            },
            events: {
                'click button[uxf-id="log-in"]': "validatePage",
                'click button[uxf-id="sign-up"]': 'takeToSignUpPage',
            },
            validatePage: function(e) {
                e.preventDefault();
                this.model.set({ username: $("input[name='username']").val(), password: $("input[name='password']").val() })
                if (this.model.isValid(true)) {
                    this.model.fetch({
                        success: this.checkForSuccess,
                        error: this.Loginerror

                    })
                } else {
                    this.$el.find("[uxf-error='form-error']").html(this.model.validationError);
                }

            },
            checkForSuccess: function(response) {
                var that = this;
                var UserErromessage = false;
                _.each(response.attributes.users, function(res) {

                    if (response.attributes.username == res.username && response.attributes.password == res.password) {
                        UserErromessage = true;


                        App.storage.username = res.username;
                        App.storage.password = res.password;

                        localStorage.setItem("username", res.username);
                        localStorage.setItem("password", res.password);

                    }
                });
                if (UserErromessage) {

                    App.router.approuter.navigate('pages/home', { trigger: true });
                    return;

                } else {
                    alert("Please Enter correct Credentials");
                }
                /*this.$el.find("[uxf-error='form-error']").html("Wrong Credentials");	 */

            },
            takeToSignUpPage: function(e) {
                e.preventDefault();

                App.router.approuter.navigate('signUp', { trigger: true });
            },
            Loginerror: function(model, xhr, response) {
                this.$el.find("[uxf-error='form-error']").html("Error in service");

            }
        });


        return new LoginpageView({ el: $("#pageContainer"), model: new LoginUpModel() });



    });