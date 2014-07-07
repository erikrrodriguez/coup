define(['backbone'], function (Backbone) {
  var TertiaryActionModel = Backbone.Model.extend({
    defaults: {
      title: 'Blocked!',
      text: 'Someone has attempted to block your move.',
      choices: [
        { title: 'Allow block', id: 'tertiary-allow' },
        { title: 'Doubt Influence', id: 'tertiary-doubt' }
      ]
    }
  });

  return TertiaryActionModel;
});