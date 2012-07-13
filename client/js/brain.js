Meteor.autosubscribe(function () {

	var user = Meteor.user();
	if(!user) return;

	Meteor.subscribe('signals', Session.get("signal_filter") , function () {

	});


	Meteor.subscribe('comments', Session.get("signal") , function () {

	});

	Meteor.subscribe('users', function () {

	});

	Meteor.subscribe('tags', function () {

	});



});

Meteor.subscribe('favorites');