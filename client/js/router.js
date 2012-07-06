BrainRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "signals/" : "index",
        "signals/my": "my",
        "signals/add": "add",
        "signals/:url": "signal",
    },

    my: function() {
        this.setSignalFilter("my")
    },

    setSignalFilter: function(type, navigate) {
        this.pageClass("signals");
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
