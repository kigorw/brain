Handlebars.registerHelper("date_ago", function(date) {
	var dt = new Date(date)
	return DateUtil.dateTimeToString(dt)
})

Handlebars.registerHelper("html", function(str) {
	return new Handlebars.SafeString(str);
})

