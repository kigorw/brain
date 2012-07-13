Session.set('signal', null);

Template.signals.signals = function () {
	console.log("Signals", Signals.find().count())
	return Signals.find();
}

Template.signal_info.favorited = function() {
    return this.favorites.indexOf(Meteor.user().username)!=-1;
}

Template.signal_info.events = {
    "click .star-ico": function(e) {
        var el = $(e.target);

        var signalEl = el.parents(".info").find("a");
        var signalId = signalEl.data("id");
        var user = Meteor.user();
        var modifier = el.hasClass("active-star-ico")?"$pull": "$push";
        var obj = {};
        obj[modifier] = {favorites: user.username};
        // $push: {supporters: "Traz"}
        // $pull : { field : _value } }

        Signals.update({_id: signalId}, obj);

    }   
}


Template.signal_item.events = {
	"click a": function(e) {
		var url = e.target.dataset.url
        var id = e.target.dataset.id
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
<<<<<<< HEAD
=======

>>>>>>> 5449ef599f7c964035a34da62002b66501e1e7ce
