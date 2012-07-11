
Template.comments.comments = function () {
	return Comments.find();
}

Template.comment_form.events = {
    'click button': function(e) {
        var signal = Signals.findOne({url: Session.get("signal")});

        var user = Meteor.user(),
            comment = {
            text: $("textarea").val(),
            url:  $('input[name=url]').val(),
            email: user.emails,
            date: (new Date()).getTime(),
            user: user.username,
            signal: signal._id 
        }

        Comments.insert(comment);
        Signals.update({_id: signal._id}, { $inc : { comments : 1 } })
        $("textarea").val("");
    }
}
