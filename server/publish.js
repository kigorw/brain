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


Meteor.publish('comments', function (signalUrl) {
  if(!signalUrl) return;
  var user = userAllowed(this)
  if(!user) return [];

  var signal = Signals.findOne({url: signalUrl});
  return Comments.find({signal: signal._id, removed: null}, {
    sort: {date: 1}
  });

});


Meteor.publish("signal-counts", function() {
  var user = userAllowed(this)

  if(!user) return [];
  var me = this;
  var uuid = Meteor.uuid();
  var findCursor = Signals.find({read: {$ne:  user.username}, user: {$ne: user.username}, removed: null });
  var sendCount = function() {
    var count = findCursor.count();
    me.set("counts", uuid, {count: count});
    me.flush();
  }

  var signalHandle = findCursor.observe({
    added: sendCount,
    removed: sendCount
  });

  this.onStop(function () {
    signalHandle.stop();
    me.unset("counts", uuid, ["count"]);
    me.flush();
  });



})


Meteor.publish('signals', function (clientFilter) {
  var user = userAllowed(this)
    console.log("client filter", clientFilter)
  if(!user) return [];
  var filter = {removed:null};
  if(clientFilter) {
    if(clientFilter.type == "sent") filter = {user: user.username}
    if(clientFilter.type == "inbox") filter = {users: user.username}
    if(clientFilter.type == "favorites") filter = {favorites: user.username}
    if(clientFilter.search) filter = {_keywords: { $in: clientFilter.search.split(" ") } };
  }

  console.log(filter)

  var result = Signals.find(filter, {
    title:1, 
    url: 1, 
    date: 1, 
    read: 1,
    favorites:1,
    sort: {date: -1}
  });

  console.log(result.count());

  return result;
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
