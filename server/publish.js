var AllowedEmails = [
  "k1igorw@gmail.com",
  "e.chechurin@gmail.com",
  "byorickq@gmail.com"
]

function userAllowed(request, userId) {
	var user = Meteor.users.findOne({_id: userId || request.userId()})
	for (var i = 0; i < AllowedEmails.length; i++) {
		var email = AllowedEmails[i];
		if(!user) return null;
		if(user.emails.indexOf(email)!=-1) return user;
	}
	return null;
}




Meteor.methods({
	registered:function (userId) {
		if(!userAllowed(this)) return "Your email is not authorized";
		return true
	}
})

/*
  // Always publish the current user's record to the client.
Meteor.publish(null, function() {
    if (this.userId())
      return userAllowed(this.userId())
    else
      return null;
}, {is_auto: true});
*/

Meteor.publish('signals', function () {
  if(!userAllowed(this)) return [];
  return Signals.find();
});

Meteor.publish("tags", function () {
	if(!userAllowed(this)) return [];
	return Tags.find();
});

Meteor.publish("users", function() {
	if(!userAllowed(this)) return [];
	return Meteor.users.find();
})
