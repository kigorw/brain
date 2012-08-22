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



	Meteor.methods({
		addSignal: function(signal) {
			var keys = getKeywords(signal);
			if((signal._keywords && signal._keywords.join(" "))==keys.join(" ") ) return;
			signal._keywords = keys;
			signal.text = typo(signal.text.trim());
			signal.title = typo(signal.title.trim()).replace(/(<([^>]+)>)/ig,"");
			Signals.insert(signal)

		},
		addComment: function(comment, signal) {
			comment.text = typo(comment.text.trim());
			Comments.insert(comment);
			Signals.update({_id: signal._id}, { $inc : { comments : 1 } })

		}
	})


}