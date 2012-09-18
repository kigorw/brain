Template.signal_add.users = function() {
    if(!Meteor.user()) return [];
    return Meteor.users.find({'username': {$ne:  Meteor.user().username}}).fetch()
}
Template.signal_add.signal_selected = function () {
    return !Session.equals('signal', null);
}
function getSignalFromSession() {
    var url = Session.get('signal');
    if(!url) return {}
    var signal = Signals.findOne({url: url})
    if(!signal) return {};

    signal.users = (signal.users || []).map(function(username){
        var user = Meteor.users.findOne({username: username});
        return {
            username: username,
            name: user.name
        }
    })

    return signal; 
}

Template.signal_add.signal = function() {
    return getSignalFromSession();
}

Template.signal_add.on_load = function() {
    Meteor.defer(function () {
        $('#recipients').chosen()
    })
    return
}

function getSignal() {
    var s = getSignalFromSession()
    var user = Meteor.user();
    var result = {
        title: $('input[name=title]').val(),
        url:  $('input[name=url]').val(),
        users:  $('select#recipients').val(),
        email: user.emails,
        text: $('textarea[name=body]').val(),
        tags: [],
        date: (new Date()).getTime(),
        user: user.username
    }

    if(s._id) result._id = s._id;

    return result
}

Template.signal_add.events = {
    'click button': function(e) {
        e.preventDefault()
        var btn = e.target;
        if(!$('[name=signal-add]')[0].checkValidity()) return;

        var signal = getSignal();
        console.log("save signal", signal)

        if(btn.id=="btnSaveDraft") { 
            signal.draft = true;

        }
        Meteor.call("saveSignal", signal)

        Router.signal(signal.url);
        Router.setSignal(signal.url)

    }
}


