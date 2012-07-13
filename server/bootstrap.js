
Meteor.startup(function () {
	if (Signals.find().count() != 0) return;

	var users = [
		{
			username: "kigorw",
			emails: "kigorw@gmail.com",
			pass: "password",
			name: "Igor Kononuchenko",
			gender: "male"

		},
		{
			username: "zheneva",
			emails: "e.chechurin@gmail.com",
			pass: "password",
			name: "Eugene Chechurin",
			gender: "male"
		},
		{
			username: "maycry",
			emails: "byorickq@gmail.com",
			pass: "password",
			name: "Yuri Tansky",
			gender: "male"
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
				favorites: ["zheneva"],
				email: "kigorw@gmail.com",
				private: true,
				tags: ["JavaScript", "Derby", "Meteor", "Toolbox"],
				date: timestamp,
				comments:0
			},
			{
				title: "Книга о жизни",
				url: "life-book",
				users: ["maycry", "zheneva"],
				favorites: ["kigorw"],
				email: "kigorw@gmail.com",
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар",
				tags: ["Reading"],
				date: timestamp+1000,
				comments:0
			}
		],

		zheneva: [
			{
				title: "Роль JavaScript в Асане",
				url: "asana-js",
				users: ["kigorw", "maycry"],
				favorites: ["maycry"],
				email: "e.chechurin@gmail.com",
				text: "В Асане особо важную роль играет понимание процессов взаимодействия между фреймворком и байдой. Там юзают самые совершенные технологии",
				tags: ["JavaScript"],
				date: timestamp+2000,
				comments:0
			},
			{
				title: "Книга про море",
				url: "book-see",
				private: true,
				users: ["kigorw", "maycry"],
				favorites: ["kigorw"],
				email: "e.chechurin@gmail.com",
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар",
				tags:["Meteor"],
				date: timestamp+3000,
				comments:0
			}
		]

	};

	var comments = [
		{
			user: "kigorw",
			email: "kigorw@gmail.com",
			text: "Учился в Петербурге, не в самом последнем ВУЗе. Немного работал со школьниками. Сейчас веду, как сказали бы у нас, упры и лабы по физике в одном из ТОП10 университетов мира (в США), будучи аспирантом.",
			date: timestamp+1000
		},
		{
			user: "zheneva",
			email: "e.chechurin@gmail.com",
			text: "Аффтар пишы исчо.",
			date: timestamp+89000
		}
		

	]

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
			//var u = users.filter(function(u) {return u.username == username;})[0];
			//signal.email = u.emails;
			Signals.insert(signal)
			console.log("insert signal", signal);
		}
	}

	var signal = Signals.findOne();
	for (var i = 0; i < comments.length; i++) {
		var c = comments[i];
		c.signal = signal._id;
		Comments.insert(c);
	}

	signal.comments = 2;
	Signals.update({_id:signal._id}, signal);

	for (var i = 0; i < tags.length; i++) {
		Tags.insert({"name": tags[i]});
		console.log("insert tag", tags[i]);
	}

	

});
