


BrainRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "signals/" : "index",
        "signals/sent": "sent",
        "signals/inbox": "inbox",
        "signals/favorites": "favorites",
        "signals/add": "add",
        "signals/:url": "signal",
    },

    sent: function() {
        this.setSignalFilter("sent")
    },
    inbox: function() {
        this.setSignalFilter("inbox")
    },

    favorites: function() {
        this.setSignalFilter("favorites")
    },
    clearInnerNav: function() {
        var wrap = $("body > .wrapper");
        wrap.removeClass("p-sent p-inbox p-favorites");
    },

    setSignalFilter: function(type, navigate) {
        this.pageClass("signals");
        Session.set("signal", null);
        var wrap = $("body > .wrapper");
        this.clearInnerNav();
        if(type!="*") wrap.addClass("p-"+type)

        

        var url = "/"+type;
        
        if(type=="*") {
          Session.set("signal_filter", null);
          url = "";
        } else {
          Session.set("signal_filter", {type: type}); 
        }
    
        if(navigate) {
          this.navigate("/signals"+url);
        }

    },

    signal: function (url) {

        this.pageClass("signal");
        Session.set("signal", url);
    },
    index: function() {
        this.pageClass("signals");
        this.clearInnerNav();
        Session.set("signal", null);
        Session.set("signal_filter", null);
    },
    add: function() {
        this.pageClass("add");
        Session.set("signal", null);
        Session.set("signal_filter", null);
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
