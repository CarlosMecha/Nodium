requirejs.config({
    baseUrl: './js',
    paths: {
        'jquery': 'lib/jquery',
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore',
        'text': 'lib/plugins/text'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
    }
});
requirejs(['jquery', 'backbone', 'underscore', 'app/App'], function ($, Backbone, _, App) { 
    App.initialize();
    App.router;
});
