const mongoose = require('mongoose')

// connect to mongoose
mongoose.connect('mongodb://localhost/planty')
	.then(db => console.log(`connected to database ${db.connections[0].name}`))
	.catch(err => console.log(err))


const Plant = require('../models/Plant')
const User = require('../models/User')
const Note = require('../models/Note')
const Question = require('../models/Question')

const plants = [
	{
        "_id": "123456789012345678901234",
		"common_name": "Peperomia",
		"botanical_name": "Peperomia ssp.",
		"care": "medium",
		"water_frequency": {
			"amount": "7-10",
			"cadence": "days"
		},
		"light": "partly_sun",
		"soil": "Average potting soil to rich loam; good drainage",
		"image": "peperomia"
	},
	{
		"common_name": "Watermelon Peperomia",
		"botanical_name": "Peperomia argyreia",
		"care": "easy",
		"water_frequency": {
			"amount": "2-3",
			"cadence": "week"
		},
		"light": "partly_sun",
		"soil": "Well-draining, loose soil",
		"image": "watermelon"
	},
	{
		"common_name": "Croton",
		"botanical_name": "Codiaeum Variegatum",
		"care": "medium",
		"water_frequency": {
			"amount": "2-3",
			"cadence": "week"
		},
		"light": "partly_sun",
		"soil": "Well-drained potting soil",
		"image": "croton"
	},
	{
		"common_name": "Bird Nest Fern",
		"botanical_name": "Asplenium nidus",
		"care": "medium",
		"water_frequency": {
			"amount": "2-3",
			"cadence": "days"
		},
		"light": "partly_shaded",
		"soil": "Peat-based potting mix",
		"image": "bird_nest"
	}, 
	{
		"common_name": "Beavertail Cactus",
		"botanical_name": "Opuntia basilaris",
		"care": "easy",
		"water_frequency": {
			"amount": "1-2",
			"cadence": "month"
		},
		"light": "full_sun",
		"soil": "Porous, sandy or pebbly potting soil",
		"image": "cactus"
	},
	{
		"common_name": "Aloe Vera",
		"botanical_name": "Aloe Vera, Aloe barbadensis",
		"care": "easy",
		"water_frequency": {
			"amount": "2-3",
			"cadence": "month"
		},
		"light": "full_sun",
		"soil": "Well-drained potting soil",
		"image": "aloe_vera"
	},
	{
		"common_name": "Boston Fern",
		"botanical_name": "Nephrolepis exaltata",
		"care": "easy",
		"water_frequency": {
			"amount": "2-3",
			"cadence": "week"
		},
		"light": "partly_sun",
		"soil": "Moist, humusy, well-drained soil",
		"image": "boston_fern"
	}
]

const users = [
    {
        _id: "62226621d62fe8e2cef5702a",
        username: "joana",
        email: "jo@iron", 
        password: "1234",
        plants: ["123456789012345678901234"],
        questions: ["123456789012345678901239"]
    },
    {
        username: "mateus",
        email: "mat@iron", 
        password: "1234",
        plants: [] 
    },
    {
        username: "fabio",
        email: "fa@iron", 
        password: "1234",
        plants: [] 
    },
    {
        username: "paula",
        email: "paula@iron", 
        password: "1234",
        plants: [] 
    }
]


const notes = [
    {
        text: "This plant is almost dying, need more attention", 
        watered: true, 
        soil_changed: false, 
        plant: "123456789012345678901234", 
        user: "62226621d62fe8e2cef5702a"
    }
]


const questions = [
    {
        _id: "123456789012345678901239",
        title: "Mysterious Botanic", 
        message: "Who is the person who answers our questions? I mean, who is the botanic?? Just for curiosity! Have a nice day!"
    },
    {
        title: "Update the plants", 
        message: "which is the frequency of your updates? I need to know if your library is constantly refreshing. Thanks a lot! "
    }
]



// Call the Plant model's create method with the array as argument.
Plant.insertMany(plants)
    .then(plants => {
        console.log('Here we got plants: ' + plants)
    })
    .catch(err => console.log(err))


// Call the Question model's create method with the array as argument.
Question.insertMany(questions)
.then(questions => {
    console.log('Here we got questions: ' + questions)
})
.catch(err => console.log(err))

// Call the User model's create method with the array as argument.
User.insertMany(users)
    .then(users => {
        console.log('Here we got users: ' + users)
    })
    .catch(err => console.log(err))


// Call the Note model's create method with the array as argument.
Note.insertMany(notes)
.then(notes => {
    console.log('Here we got notes: ' + notes)
    mongoose.connection.close();
})
.catch(err => console.log(err))


