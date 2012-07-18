Signals = new Meteor.Collection("signals");
SignalCounts = new Meteor.Collection("counts");

Tags = new Meteor.Collection("tags");
Comments = new Meteor.Collection("comments");
Favorites = new Meteor.Collection("favorites");


if(Meteor.is_server) {

	function getKeywords(signal) {
	  return signal.title.split(" ").concat(signal.text.split(" "));
	}

	function onAddedSignal(signal) {
	  var keys = getKeywords(signal);
	  signal._keywords = keys;
	  Signals.update({_id: signal._id}, signal)
	  console.log("added", signal);

	}

	function onChangedSignal(signal) {
	  var keys = getKeywords(signal);
	  if(signal._keywords.join(" ")==keys.join(" ") ) return;
	  signal._keywords = keys;
	  console.log("changed", signal);
	  Signals.update({_id: signal._id}, signal)
	}


	var signalHandle = Signals.find().observe({
	  added: onAddedSignal,
	  changed: onChangedSignal
	});
}