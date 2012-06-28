Meteor.startup(function () {
/*
	Signals.remove({});
	Tags.remove({});
	Meteor.users.remove({});
*/
	console.log("start", Signals.find().count())

	if (Signals.find().count() != 0) return;

	var users = [
		{
			username: "kigorw",
			emails: "kigorw@gmail.com",
			pass: "password",
			name: "Igor Kononuchenko",

		},
		{
			username: "zheneva",
			emails: "e.chechurin@gmail.com",
			pass: "password",
			name: "Eugene Chechurin"
		},
		{
			username: "maycry",
			emails: "byorickq@gmail.com",
			pass: "password",
			name: "Yuri Tansky"
		}
	];

	var timestamp = (new Date()).getTime();
	var signals = {
		kigorw: [
			{
				title: "Дерби против Метеора",
				url: "derby-vs-meteor",
				text: "Автор дерби написал хорошую статью о сравнении подходов http://blog.derbyjs.com/2012/04/14/our-take-on-derby-vs-meteor",
				users: ["maycry", "zheneva"],
				private: true,
				tags: ["JavaScript", "Derby", "Meteor", "Toolbox"],
				date: timestamp
			},
			{
				title: "Книга о жизни",
				url: "life-book",
				users: ["maycry", "zheneva"],
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар",
				tags: ["Reading"],
				date: timestamp+1000
			}
		],

		zheneva: [
			{
				title: "Роль JavaScript в Асане",
				url: "asana-js",
				users: ["kigorw", "maycry"],
				text: "В Асане особо важную роль играет понимание процессов взаимодействия между фреймворком и байдой. Там юзают самые совершенные технологии",
				tags: ["JavaScript"],
				date: timestamp+2000
			},
			{
				title: "Книга про море",
				url: "book-see",
				private: true,
				users: ["kigorw", "maycry"],
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар",
				tags:["Meteor"],
				date: timestamp+3000
			}
		]

	};

	var tags = ["JavaScript", "Derby", "Meteor", "Toolbox", "Reading"];



	for (var i = 0; i < users.length; i++) {
		Meteor.users.insert(users[i])
		console.log("insert user", users[i]);
	}

	for(var username in signals) {
		var userSignals = signals[username];
		for (var i = 0; i < userSignals.length; i++) {
			var signal = userSignals[i]
			signal.user = username;
			Signals.insert(signal)
			console.log("insert signal", signal);
		}
	}

	for (var i = 0; i < tags.length; i++) {
		Tags.insert({"name": tags[i]});
		console.log("insert tag", tags[i]);
	}

	

});