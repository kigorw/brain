Session.set('signal', null);

Template.signals.signals = function () {
	console.log("Signals", Signals.find().count())
	return Signals.find();
}

Template.signal_item.events = {
	"click a": function(e) {
		var url = e.target.dataset.url
		Router.setSignal(url);
		Session.set("signal", url)
		e.preventDefault();
	}
}

Template.signals.signal_selected = Template.signal.signal_selected = function () {
    return !Session.equals('signal', null);
}

Template.signal.signal = function() {
	var url = Session.get('signal');
	if(!url) return {}
	var signal = Signals.findOne({url: url})
	return signal 
}

Template.signal_filter.events = {
    "click a": function(e) {
        var type = e.target.dataset.type
        Router.setSignalFilter(type, true);
        e.preventDefault();
    }
}
