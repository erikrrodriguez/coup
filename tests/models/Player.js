var expect = require('chai').expect,
    Player = require('../../models/Player'),
    Card = require('../../models/Card'),
    BaseController = require('../../controllers/Base'),
    emitter = require('../../emitter'),
    MockPlayerController,
    player;

// Use this to intercept the Player object's attempt to communicate with
// the client. Mock the client choosing their first uneliminated card.
MockPlayerController = BaseController.extend({
  events: {
      'select own influence': function selectInfluence(options, callback) {
        var influences = player.influences,
            key;

        // Select the player's card for them
        for (key in influences) {
          if (!influences[key].eliminated) {
            callback(undefined, { id: influences[key].id });
            return;
          }
        }

        callback(player.name + ' has no uneliminated influences.');
      }
   }
});

describe('Player', function () {
  var controller,
      influences;

  beforeEach(function (done) {
    player = new Player({ name: 'Frank', socket: null });
    influences = [
      new Card({ name: 'Ambassador' }),
      new Card({ name: 'Contessa' })
    ];
    player.influences = influences;
    controller = new MockPlayerController({ emitter: emitter });

    done();
  });

  afterEach(function (done) {
    controller.stop();
    done();
  });

  describe('#chooseEliminatedCard', function () {
    it('should offer the user a choice of which card to remove (the first one)', function () {
      player.chooseEliminatedCard(function (err) {
        expect(err).to.equal(undefined);
        expect(influences[0].eliminated).to.equal(true);
      });
    });
  });

  describe('#hasInfluence', function () {
    it('should return true if the player has an influence and it is not eliminated', function () {
      expect(player.hasInfluence('Contessa')).to.equal(true);
    });

    it('should return false if the player does not possess an influence card', function () {
      expect(player.hasInfluence('Assassin')).to.equal(false);
    });

    it('should return false if the player possesses the card, but it is eliminated', function () {
      var ambassador = influences.filter(function (card) { return card.name === 'Ambassador'; }).pop();

      expect(player.hasInfluence(ambassador.name)).to.equal(true);
      ambassador.eliminated = true;
      expect(player.hasInfluence(ambassador.name)).to.equal(false);
    });
  });

  describe('#eliminateCard', function () {
    it('should set the card with the given id to eliminated', function () {
      var ambassador = influences.filter(function (card) { return card.name === 'Ambassador'; }).pop();

      expect(ambassador.eliminated).to.equal(false);
      player.eliminateCard(ambassador.id);
      expect(ambassador.eliminated).to.equal(true);
    });

    it('should eliminate the player when they have eliminated all influence', function () {
      var ambassador = influences.filter(function (card) { return card.name === 'Ambassador'; }).pop(),
          contessa = influences.filter(function (card) { return card.name === 'Contessa'; }).pop();

      expect(player.eliminated).to.equal(false);

      player.eliminateCard(ambassador.id);
      player.eliminateCard(contessa.id);

      expect(player.eliminated).to.equal(true);
    });
  });

  describe('#getClientObject', function () {
    it('should not expose uneliminated cards to other users', function () {
      var clientObject = player.getClientObject({ privileged: false }),
          key;

      for (key in clientObject.influences) {
        expect(clientObject.influences[key].dummy).to.equal(true);
      }
    });

    it('should expose eliminated cards to other users', function () {
      var clientObject,
          key,
          i;
      for (i = 0; i < influences.length; i++) {
        influences[i].eliminated = true;
      }

      clientObject = player.getClientObject({ privileged: false });
      for (key in clientObject.influences) {
        expect(clientObject.influences[key].dummy).to.equal(false);
      }
    });

    it('should expose all cards to the player who owns them', function () {
      var clientObject = player.getClientObject({ privileged: true }),
          key;

      for (key in clientObject.influences) {
        expect(clientObject.influences[key].dummy).to.equal(false);
      }
    });
  });

});