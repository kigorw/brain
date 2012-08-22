
function caption(val) {
    document.title = val;
}

BrainRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "login": "login",
        "login/": "login",
        "search/:query": "search",
        "signals/" : "index",
        "signals/sent": "sent",
        "signals/inbox": "inbox",
        "signals/favorites": "favorites",
        "signals/add": "add",
        "signals/:url": "signal"
        
    },

    login: function() {
        this.pageClass("login"); 

    },

    sent: function() {
        this.setSignalFilter("sent")
    },
    inbox: function() {
        this.setSignalFilter("inbox")
    },
    search: function(query) {
        var val = decodeURI(query);
        this.setSearch(val);
        if(val) {
            $("#txtSearch").val(val).addClass("focused");  
        }
        
    },
    favorites: function() {
        this.setSignalFilter("favorites")
    },
    clearInnerNav: function() {
        var wrap = $("body > .wrapper");
        wrap.removeClass("p-sent p-inbox p-favorites");
    },
    setSearch: function(val, navigate) {
        if(!val) {
            Router.setPage("signals", "signals");
            this.removeClass("search");
            return Router.index()
        }

        Router.removeClass("signals")
        if(navigate) Router.setPage("search/"+val, "search");
        Router.addClass("search")
        Session.set("signal_filter", {search: val}); 
        Session.set("signal", null)   
    },

    setSignalFilter: function(type, navigate) {
        this.pageClass("signals");
        Session.set("signal", null);

        this.clearInnerNav();
        if(type!="*") this.addClass(type);

        

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
    addClass: function(page) {
        $("body > .wrapper").addClass("p-"+page);
    },
    removeClass: function(page) {
        $("body > .wrapper").removeClass("p-"+page);
    },
    pageClass: function(page) {
        var wrap = $("body > .wrapper");
        var prevPage = wrap.data("page");
        Session.set("page", page)
        wrap.removeClass("p-"+prevPage)
            .addClass("p-"+page)
            .data("page", page);
    }

});

Router = new BrainRouter;
