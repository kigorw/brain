Handlebars.registerHelper("date_ago", function(date) {
	var dt = new Date(date)
	return DateUtil.dateTimeToString(dt)
});