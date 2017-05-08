define(['jquery',
    'underscore',
    'backbone',
    'backbone.validation',
    'text!../pages/templates/signUpPage.html',
    'backbone.stickit'],
    function($, _, Backbone, backboneValiadtion, SignUpPage) {

        Backbone.Validation.configure({
            forceUpdate: true
        });

        _.extend(Backbone.Validation.callbacks, {
            valid: function(view, attr, selector) {

                var $el = view.$('[data-attribute=' + attr + ']'),
                    $group = $el.closest('.form-group');

                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function(view, attr, error, selector) {

                var $el = view.$('[data-attribute=' + attr + ']'),
                    $group = $el.closest('.form-group');


                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        var SignUpModel = Backbone.Model.extend({
            url: "dataModel/data.json",
            parse: function(rs) {
                return rs.users;
            },
            initialize: function() {
                this.fetch({
                    success: this.fnsuccess,
                    error: this.fnerror
                });
            },
            fnsuccess: function(res, options) {
                return options;
            },
            fnerror: function(res, xhr, option) {
                console.log(xhr);
            },

            validation: {
                name: {
                    required: true
                },
                lastname: {
                    required: true
                },
                username: {
                    required: true
                },

                mobilenum: {
                    length: 10
                },
                password: {
                    required: true,
                    minLength: 8
                },
                mail: [{
                    required: true,
                    msg: 'Please enter an email address'
                }, {
                        pattern: 'email',
                        msg: 'Please enter a valid email'
                    }]

            }


        });
        var SignUpView = Backbone.View.extend({
            initialize: function(options) {
                Backbone.Validation.bind(this, {
                    model: this.model
                });
                //this.render(options);				
            },

            bindings: {
                '[name=username]': {
                    observe: 'username',
                    setOptions: {
                        validate: true
                    }
                }, '[name=lastname]': {
                    observe: 'lastname',
                    setOptions: {
                        validate: true
                    }
                }, '[name=name]': {
                    observe: 'name',
                    setOptions: {
                        validate: true
                    }
                },
                '[name=mail]': {
                    observe: 'mail',
                    setOptions: {
                        validate: true
                    }
                },
                '[name=password]': {
                    observe: 'password',
                    setOptions: {
                        validate: true
                    }
                },

                '[name=mobilenum]': {
                    observe: 'mobilenum',
                    setOptions: {
                        validate: true
                    }
                }
            },
            render: function(options) {

                var template = _.template(SignUpPage, {})
                this.$el.html(template);
                this.stickit();
                //return this;
            },
            events: {
                'click button[uxf-id="create-account"]': 'createNewAccount'
            },
            createNewAccount: function(event) {

                event.preventDefault();
                var that = this;
                if (!this.model.isValid(true)) {
                    // this.model.save();
                    alert("Please Enter Valid values");
                } else {

                    var response = this.model.attributes;

                    var tc = $(event.currentTarget).closest("form").find("input");
                    var username = $(event.currentTarget).closest("form").find("input[name='username']").val();

                    var arrInput = new Object();

                    if (!this.checkTheUserName(response, username)) {

                        _.each(tc, function(k, v) {
                            var attr = $(k).attr("data-attribute");
                            arrInput[attr] = $(k).val();
                        });
                        this.model.save("{" + arrInput + "}");
                        alert("model save is called");
                        App.router.approuter.navigate('login', { trigger: true });

                    } else {

                        alert("username already exist");
                        return;
                    }
                }

            },
            checkTheUserName: function(resoponse, name) {
                var match = false;
                _.each(resoponse, function(k, v) {
                    if (k.username == name) {
                        match = true;
                    }

                });
                return match;


            },
            remove: function() {

                Backbone.Validation.unbind(this);
                return Backbone.View.prototype.remove.apply(this, arguments);
            }


        });

        return new SignUpView({ el: $("#pageContainer"), model: new SignUpModel() });

    });