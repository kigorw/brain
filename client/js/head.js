Template.head.events = {
    "click [role=menu-item]": function(e) {
        var el =  $(e.target);

        Router.setPage(el.attr("href"), el.data("page"));

        Session.set("signal", null)   
        e.preventDefault();
    }
}

