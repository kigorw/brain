Template.head.events = {
    "keyup input": function(e) {
        var el = $(e.target);
        
        Router.setPage("search?q="+el.val(), "search");

        Session.set("signal", null)   
        e.preventDefault();
    },
    
    "blur input": function(e) {
    	var el = $(e.target);
    	if(el.val().trim()!="") el.addClass("focused"); 
    	else el.removeClass("focused");
    }
}
