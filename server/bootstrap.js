Meteor.startup(function () {

	var users = [
		{
			username: "kigorw",
			pass: "password",
			name: "Igor Kononuchenko",

		},
		{
			username: "zheneva",
			pass: "password",
			name: "Eugene Chechurin"
		},
		{
			username: "maycry",
			pass: "password",
			name: "Yuri Tansky"
		}
	];


	var signals = {
		kigorw: [
			{
				title: "Дерби против Метеора",
				url: "derby-vs-meteor",
				text: "Автор дерби написал хорошую статью о сравнении подходов http://blog.derbyjs.com/2012/04/14/our-take-on-derby-vs-meteor"
			},
			{
				title: "Книга о жизни",
				url: "life-book",
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар"
			}
		],

		zheneva: [
			{
				title: "Роль JavaScript в Асане",
				url: "asana-js",
				text: "В Асане особо важную роль играет понимание процессов взаимодействия между фреймворком и байдой. Там юзают самые совершенные технологии"
			},
			{
				title: "",
				url: "",
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар"
			}
		]

	}



});