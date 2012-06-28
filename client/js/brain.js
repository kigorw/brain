Template.signals.signals = function () {
	console.log("Signals", Signals.find().count())
	return Signals.find();
}

Meteor.subscribe('signals', function () {

});

Meteor.subscribe('users', function () {

});

Meteor.subscribe('tags', function () {

});

