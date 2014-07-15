require.config({
  paths : {
    backbone : 'ext/backbone',
    underscore : 'ext/underscore',
    jquery : 'ext/jquery-2.1.1',
    marionette : 'ext/backbone.marionette',
    handlebars: 'ext/handlebars-v1.3.0',
    hbs: 'ext/require-handlebars-plugin/hbs',
    knockout: 'ext/knockout-3.1.0',
    config: '/config',
    'socket.io': '/socket.io/socket.io'
  },
  shim : {
    jquery : {
      exports : 'jQuery'
    },
    underscore : {
      exports : '_'
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    }
  },
  hbs: {
    templateExtension: 'html'
  }
});

define([
  'jquery',
  'CoupApp',
  'controllers/CoupController'
], function ($, CoupApp, CoupController, SecondaryAction, TertiaryAction, PlayerCollection, PlayerCollectionView, PlayView) {
  var controller = new CoupController();

  CoupApp.start({ LandingController: controller });
});