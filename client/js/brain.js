Meteor.autosubscribe(function () {

	var user = Meteor.user();
	if(!user) return;

	Meteor.subscribe('signals', function () {

	});

	Meteor.subscribe('users', function () {

	});

	Meteor.subscribe('tags', function () {

	});

});
