Template.head.events = {
  "click [role=menu-item]": function(e) {
    var el =  $(e.target);

    Router.setPage(el.attr("href"), el.data("page"));
    
    Session.set("signal", null)   
    e.preventDefault();
  }

}


BrainRouter = Backbone.Router.extend({
  routes: {
    "": "index",
  	"signals/" : "index",
    "signals/add": "add",
    "signals/:url": "signal",
  },
  signal: function (url) {
  	//hee
    this.pageClass("signal");
    Session.set("signal", url);
    Session.set("tag_filter", null);
  },
  index: function() {
    this.pageClass("signals");
  	Session.set("signal", null);
  },
  add: function() {
    this.pageClass("add");
    Session.set("signal", null);
  },
  setSignal: function(url) {
    this.setPage("/signals/"+url, "signal")
  },
  setPage: function(url, page) {
    this.pageClass(page);    
    this.navigate(url);
  },
  pageClass: function(page) {
    var wrap = $("body > .wrapper");
    var prevPage = wrap.data("page");

    wrap.removeClass("p-"+prevPage)
        .addClass("p-"+page)
        .data("page", page);
  }

});

Router = new BrainRouter;
