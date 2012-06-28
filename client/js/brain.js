Template.signals.signals = function () {
	console.log("Signals", Signals.find().count())
	return Signals.find();
}
/*
Handlebars.registerHelper("foo", function() {
  return "blah"; // (calculate value here)
});
*/





Meteor.subscribe('registered', function() {
	Session.set('registered', Meteor.user());
})
	function registeredCb(error, result){ 
		console.log(result);
	}


Template.registered.registered = function () {


	if( Meteor.user()) {
		Meteor.call("registered", Meteor.user()._id, function(error, result){ 
			$("#registerStatus").html(result);
		})
	}
}


Template.registered.user = function () {
	var u = Meteor.user();
	if(u) return u.name
}


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


