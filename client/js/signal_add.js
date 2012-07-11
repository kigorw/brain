Template.signal_add.events = {
    'click button': function(e) {
        var user = Meteor.user(),
            signal = {
            title: $('input[name=title]').val(),
            url:  $('input[name=url]').val(),
            users:  $('input[name=users]').val().split(','),
            email: user.emails,
            text: $('textarea[name=body]').val(),
            tags: [],
            date: (new Date()).getTime(),
            user: user.username
        }
        console.log("insert signal", signal)
        Signals.insert(signal)
    }
}