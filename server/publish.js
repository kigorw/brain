Meteor.publish('signals', function () {
  return Signals.find();
});

Meteor.publish("tags", function () {
	return Tags.find();
});
Meteor.publish("users", function() {
	return Meteor.users.find();
})
