var uuid = require('node-uuid').v4,
    Card = require('./Card');

function Player(options) {
  options = options || {};

  this.id = options.id || uuid();
  this.socket = options.socket || null;
  this.name = options.name || 'Unnamed User';
  this.coins = options.coins || 2;
  this.influences = [];
}

var uneliminatedCard = new Card();

Player.prototype.hasInfluence = function (influence) {
  for (var i = 0; i < this.influences.length; i++) {
    if (this.influences[i].name === influence)
      return true;
  }
  return false;
};

Player.prototype.getClientObject = function () {
  return {
    id: this.id,
    name: this.name,
    coins: this.coins,
    influences: this.influences.map(function showEliminated(card) {
      if (card.eliminated) {
        return card;
      } else {
        return uneliminatedCard;
      }
    })
  };
};

module.exports = Player;
