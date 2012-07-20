Template.head.events = {
    "keyup input": function(e) {
        var el = $(e.target);
        var val = el.val().trim();
        Router.setSearch(val, true);
        e.preventDefault();
    },

    "blur input": function(e) {
    	var el = $(e.target);
    	if(el.val().trim()!="") el.addClass("focused"); 
    	else el.removeClass("focused");
    }
}
