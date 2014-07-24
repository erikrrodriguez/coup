define(['backbone'], function (Backbone) {
  var ActionModel = Backbone.Model.extend({
    defaults: {
      title: 'Untitled Action',
      text: 'This action doesn\'t do anything!',
      choices: [
        { id: 'ok', title: 'OK', action: function action() { console.log('YOU CHOSE OK.'); }}
      ]
    },

    initialize: function (options) {
      options = options || {};

      var i,
          condition,
          choices = this.attributes.choices,
          ability = options.ability;

      if (options.ability) {
        for (i = 0; i < choices.length; i++) {
          condition = choices[i].condition;

          if (ability && ability[condition] === false) {
            choices.splice(i, 1);
          }
        }
      }
    }
  });

  return ActionModel;
});
