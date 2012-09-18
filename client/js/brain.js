
Meteor.autosubscribe(function () {

	var user = Meteor.user();
	if(!user) return;

	
	Meteor.subscribe('signals', Session.get("signal_filter") , function () {
		Session.set('signalsLoading', false); 
		console.log("signals from server", Session.get("signal_filter"), Signals.find().count())
	});


	Meteor.subscribe('comments', Session.get("signal") , function () {
		
	});

	Meteor.subscribe('users', function () {

	});

	Meteor.subscribe('tags', function () {

	});
	Meteor.subscribe('signal-counts', function() {
		
	});


});

Meteor.subscribe('favorites');
