requirejs.config({
    baseUrl: '/static/js',
    paths: {
        'jquery': 'lib/jquery',
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore',
        'text': 'lib/plugins/text',
        'App' : 'app/App',
        'views' : 'app/views',
        'routers' : 'app/routers',
        'models' : 'app/models',
        'templ' : '../templates'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});
requirejs(['jquery', 'backbone', 'underscore', 'App'], function ($, Backbone, _, App) { 
    App.start();
});
