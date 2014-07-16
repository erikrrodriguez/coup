define([
  'marionette',
  'socket',
  'socket.io',
  'config',
  'CoupApp',
  'models/landing/Login',
  'views/landing/Login',
  'views/landing/Landing',
  'views/landing/Create',
  'views/Play'
], function (Marionette, socket, io, config, CoupApp, LoginCollectionModel, LoginView, LandingView, CreateView, PlayView) {

  CoupController = Marionette.Controller.extend({

    initialize: function (options) {
      this.socket = options.socket;

      this.listenTo(this, 'init', function () {
        CoupApp.main.show(landingView);

        landingView.login.show(loginView);
        landingView.create.show(new CreateView());
      });

      CoupApp.vent.on('game:create', function (data) {
        socket.emit('create game', data);
        this.trigger('game:join', data);
      });

      CoupApp.vent.on('game:join', function (data) {
        console.log('joining game');
        socket.emit('join user', data);
        socket.emit('ready');
      });
    }
  });

  socket.on('initialize', function (data) {
    console.log(data);
  });

  socket.on('gamejoiner', function (data) {
    console.log('Game joined.');
    CoupApp.main.show(new PlayView());
  });

  socket.on('push:games', function (data) { games.set(data); });

  var games = new LoginCollectionModel();

  var loginView = new LoginView({ collection: games });
  var landingView = new LandingView();

  return CoupController;
});