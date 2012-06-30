Meteor.subscribe('registered', function() {
	Session.set('registered', Meteor.user());
})

Template.registered.registered = function () {

	if( Meteor.user()) {
		Meteor.call("registered", Meteor.user()._id, function(error, result){ 
			$("#registerStatus").html(result);
		})
	}
}


Template.registered.user = function () {
	var u = Meteor.user();
	return u
}