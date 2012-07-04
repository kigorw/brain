BrainRouter = Backbone.Router.extend({
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
