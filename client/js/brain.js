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


var BrainRouter = Backbone.Router.extend({
  routes: {
  	"signals/" : "index",
    "signals/:url": "signal",
  },
  signal: function (url) {
  	//hee
    Session.set("signal", url);
    Session.set("tag_filter", null);
  },
  index: function() {
  	Session.set("signal", null);
  },
  setSignal: function(url) {
  	this.navigate("/signals/"+url)
  }

});

Router = new BrainRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});

