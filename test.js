if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.pick.helpers({
    hex : function () {
      return Session.get('pickerHex');
    },
    rgba : function () {
      return Session.get('pickerRGBA');
    }
  });

  Template.pick.events ({
    'click #picker': function (e) {
      selectColor('picker', e);
    }
  });

  Template.pick.onRendered (function () {
    this.autorun (function () {
      gradientCanvas('picker');
    });
});
}
