define(['jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../pages/templates/homePage.html',
    'text!../pages/templates/header.html'],
    function($, _, Backbone, Boot, HomePage, Header) {
        var homepageModel = Backbone.Model.extend({
        });

        var Pages = Backbone.Collection.extend({
            model: homepageModel,
            url: "dataModel/pages.json",
            parse: function(rs) {
                return rs.pages;
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
            }

        });


        var HomePageView = Backbone.View.extend({
            el: $("#pageContainer"),
            pageId: 'home',
            subPageURL: "Module",
            initialize: function(options) {
                this.template = options.template
                this.collection = options.collection;

            },
            render: function(id) {

                console.log(this.collection.models);
                this.loadTemplate(this.collection.models);

            },
            loadPage: function(id) {
                this.pageId = id;
                this.render();

            },
            loadTemplate: function(res) {
                var element = this.$el;
                var pageID = this.pageId;
                var that = this;
                that.loadString;
                res.forEach(function(key, value) {

                    if (key.get("page_id") == pageID) {


                        that.subPageURL = key.get("pageURL");
                        var template = _.template(HomePage);
                        element.html(template(key.toJSON()));

                        if (key.get("moduleJS") != "") {

                            require([
                                "text!../" + that.subPageURL,
                                "../" + key.get("moduleJS")
                            ], function(tplString) {
                                element.find("#partials").html(tplString);
                            });

                        }
                        else {
                            require([
                                "text!../" + that.subPageURL
                            ], function(tplString) {
                                element.find("#partials").html(tplString);
                            });
                        }

                        that.loadHeader();
                    }

                });
            },
            loadHeader: function() {
                var template = _.template(Header);
                console.log(this.$el.find("#main-header"));
                this.$el.find("#main-header").html(template);

            }

        });


        return new HomePageView({ template: HomePage, el: $("#pageContainer"), collection: new Pages() });
    });