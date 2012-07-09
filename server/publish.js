var AllowedEmails = [
  "kigorw@gmail.com",
  "e.chechurin@gmail.com",
  "byorickq@yandex.ru"
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




Meteor.publish('signals', function (clientFilter) {
  var user = userAllowed(this)
    console.log("client filter", clientFilter)
  if(!user) return [];
  var filter = {};
  if(clientFilter && clientFilter.type == "my") {
  	filter = {user: user.username};
  }
  console.log(filter)


  return Signals.find(filter, {
  	title:1, 
  	url: 1, 
  	date: 1, 
  	sort: {date: -1}
  });
  //только те которые имеет право видеть

});


/*
Meteor.publish('signal', function (url) {
  if(!userAllowed(this)) return [];
  console.log("signal url", url, Signals.findOne({
  	url: url
  }))
  return Signals.findOne({
  	url: url
  });
});
*/



Meteor.publish("tags", function () {
	if(!userAllowed(this)) return [];
	return Tags.find();
});

Meteor.publish("users", function() {
	if(!userAllowed(this)) return [];
	return Meteor.users.find();
})
