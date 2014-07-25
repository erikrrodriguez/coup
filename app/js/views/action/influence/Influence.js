define([
  'marionette',
  'models/action/influence/AbilityCollection',
  'views/action/influence/Ability',
  'hbs!templates/influence'
], function (Marionette, AbilityCollection, AbilityView, influenceTemplate) { 
  var InfluenceView = Marionette.CompositeView.extend({
    initialize: function (options) {
      this.collection = new AbilityCollection(this.model.abilities);
    },
    classname: 'c-influence-view',
    template: influenceTemplate,
    childView: AbilityView,
    childContainer: '.c-influence-abilities'
  });

  return InfluenceView;
});