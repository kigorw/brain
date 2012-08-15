
Template.comments.comments = function () {
	return Comments.find();
}

function sendForm(e) {
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

Template.comment_form.events = {
    'click button': sendForm,
    'keydown textarea':function(e) {
        if(e.keyCode==13 && (e.ctrlKey||e.metaKey)) {
            sendForm();
        }
    } 
}

Template.comments.events = {
    "click .btn-remove": function(e) {
        var id = e.target.dataset.id;
        Comments.update({_id:id}, {removed: true});
    }
}
