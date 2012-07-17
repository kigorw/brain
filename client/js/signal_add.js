Template.signal_add.users = function() {
    if(!Meteor.user()) return [];
    return Meteor.users.find({'username': {$ne:  Meteor.user().username}}).fetch()
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
