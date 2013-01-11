define(['jquery', 'backbone', 'app/models/Model', 'app/views/View'], 
    function ($, Backbone, Model, View) {
        var Router = Backbone.Router.extend({
            initialize: function () {
                Backbone.history.start();  
            },

            routes: {
                '': 'index',
                'test': 'test'
            },

            index: function () {
            },
            test: function () {
                new View();
            }
        
        });    
        return Router;
    }
);
