
Template.comments.comments = function () {
	return Comments.find();
}

Template.comment_form.events = {
    'click button': function(e) {
        var user = Meteor.user(),
            comment = {
            text: $("textarea").val(),
            url:  $('input[name=url]').val(),
            email: user.emails,
            date: (new Date()).getTime(),
            user: user.username
        }
        console.log("insert signal", signal)
        Signals.insert(signal)
    }
}
