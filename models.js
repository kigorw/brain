Signals = new Meteor.Collection("signals");
SignalCounts = new Meteor.Collection("counts");

Tags = new Meteor.Collection("tags");
Comments = new Meteor.Collection("comments");
Favorites = new Meteor.Collection("favorites");


if(Meteor.is_server) {

	function typo(str) {
		var result = Meteor.http.call("GET", "http://www.kigorw.com/typo/",
		                                {params: {str: str}});
		if (result.statusCode === 200)
		    return result.content;

		return false;
	} 

	function getKeywords(signal) {
	  var keys = signal.title.toLowerCase().split(" ").concat(signal.text.toLowerCase().split(" "));

	  var except = "о как где в и у за до том не бы а куда между где там тут про к по ни но на да нет с что and or do in on if does with".split(" ");
	  return _.difference(keys, except);
	}

	function onAddedSignal(signal) {
	  if(signal.onAdd) return;//how to run onSave method once?
	  signal.onAdd = true;

	  var keys = getKeywords(signal);
	  signal._keywords = keys;
	  signal.text = typo(signal.text.trim());

	  Signals.update({_id: signal._id}, signal)
	  console.log("added", signal);

	}

	function onChangedSignal(signal) {
	  var keys = getKeywords(signal);
	  if(signal._keywords.join(" ")==keys.join(" ") ) return;
	  signal._keywords = keys;
	  signal.text = typo(signal.text.trim());
	  console.log("changed", signal);
	  Signals.update({_id: signal._id}, signal)
	}
	
	function onAddedComment(comment) {
		if(comment.onAdd) return;
		comment.onAdd = true;
		onChangedComment(comment);
	}

	function onChangedComment(comment) {
	 console.log("changed comments")
	  comment.text = typo(comment.text.trim());
	  Comments.update({_id: comment._id}, comment)
	}


	var signalHandle = Signals.find().observe({
	  added: onAddedSignal,
	  changed: onChangedSignal
	});

	var commentsHandle = Comments.find().observe({
	  added: onAddedComment,
	  changed: onChangedComment
	});


}