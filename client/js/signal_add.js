Template.signal_add.users = function() {
    console.log(Meteor.users.find())
    return Meteor.users.find().fetch()
}

Template.signal_add.on_load = function() {
    Meteor.defer(function () {
        $('#recipients').chosen()
    })
    return
}

Template.signal_add.events = {
    'click button': function(e) {
        var user = Meteor.user(),
            signal = {
            title: $('input[name=title]').val(),
            url:  $('input[name=url]').val(),
            users:  $('select#recipients').val(),
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
