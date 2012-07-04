Handlebars.registerHelper("date_ago", function(date) {
	var dt = new Date(date)
	return DateUtil.dateTimeToString(dt)
});

Handlebars.registerHelper('content', function(){
    var view = Session.get('view') || 'signals'
    return Template[view]();
})
