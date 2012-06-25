var bootstrap = function () {

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
				url: "derby-vs-meteor"
				text: "Автор дерби написал хорошую статью о сравнении подходов http://blog.derbyjs.com/2012/04/14/our-take-on-derby-vs-meteor/"
			},
			{
				title: "Книга о жизни",
				url: "life-book"
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар"
			}
		],

		zheneva: [
			{
				title: "Роль JavaScript в Асане",
				url: "asana-js"
				text: "Автор дерби написал хорошую статью о сравнении подходов http://blog.derbyjs.com/2012/04/14/our-take-on-derby-vs-meteor/"
			},
			{
				title: "Книга о жизни",
				url: "life-book"
				text: "Замечательная книга о том как крутой чел был в море и потом купил себе велосипед потом поехал домой и выпустил пар"
			}
		],

	}









	var mat = Users.findOne({username: "mathieu"});
	var jon = Users.findOne({username: "jon"});
	var darren = Users.findOne({username: "darren"});

	if (mat === undefined) {
		mat = Users.findOne({_id: createUser("Mathieu Bouchard", "mathieu", "password")});
	}

	if (jon === undefined) {
		jon = Users.findOne({_id: createUser("Jon Eng", "jon", "password")});
	}

	if (darren === undefined) {
		darren = Users.findOne({_id: createUser("Darren Schnare", "darren", "password")});
	}

	if (Notes.find().count() === 0) {
		createNote("Mat's private note #1", mat._id, true);
		createNote("Mat's private note #2", mat._id, true);
		createNote("Mat's public note", mat._id, false);

		createNote("Jon's private note", jon._id, true);
		createNote("Jon's public note #1", jon._id, false);
		createNote("Jon's public note #2", jon._id, false);
		createNote("Jon's public note #3", jon._id, false);

		createNote("Darren's private note", darren._id, true);
		createNote("Darren's public note", darren._id, false);
	}
};