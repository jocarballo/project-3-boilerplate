const mongoose = require('mongoose')

const MONGO_URI = "mongodb://localhost/planty";

console.log("Connecting to", MONGO_URI);

// connect to mongoose
mongoose.connect(MONGO_URI)
	.then(db => console.log(`connected to database ${db.connections[0].name}`))
	.catch(err => console.log(err))


const Plant = require('../models/Plant')
const User = require('../models/User')
const Note = require('../models/Note')
const Question = require('../models/Question')
const Event = require('../models/Event')

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
		"image": "peperomia",
		"description": "Peperomia obtusifolia is a bushy upright plant that is native to southern Florida and the Caribbean. As a houseplant, it typically grows on thick erect stems to 12” tall. Waxy, elliptic, thick dark green leaves (to 6” long). Small greenish-white flowers on spikes (to 5” long)."
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
		"image": "watermelon",
		"description": "Watermelon peperomia is the common name used for a popular species from the Peperomia genus named Peperomia argyreia. Named watermelon for its similarity of appearance to the rind (skin) of a watermelon."
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
		"image": "croton",
		"description": "Croton, also called “garden croton,” are native to the tropical forests of southeast Asia and Oceania. In the wild, they grow as large shrubs, reaching up to 10 feet tall (in the home or garden, they stay a lot smaller)."
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
		"image": "bird_nest",
		"description": "Bird's nest ferns (Asplenium nidus) are naturally epiphytic, meaning they grow on the surface of other plants. In their rainforest homes, they can be found growing high in the crooks of trees. They form a series of erect, spoon-shaped, bright green fronds that rise from a central rosette. Healthy plants can have fronds up to 5 feet long, but bird's nest ferns kept as houseplants typically have fronds that grow only about 2 feet long. These ferns have a slow growth rate. They're best planted in the spring, though houseplants generally can be started year-round."
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
		"image": "cactus",
		"description": "Opuntia basilaris, the beavertail cactus or beavertail pricklypear, is a cactus species found in the southwest United States. It occurs mostly in the Mojave, Anza-Borrego, and Colorado Deserts, as well as in the Colorado Plateau and northwest Mexico. It is also found throughout the Grand Canyon and Colorado River region as well as into southern Utah and Nevada, and in the western Arizona regions along the Lower Colorado River Valley."
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
		"image": "aloe_vera",
		"description": "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plants central stem. The margin of the leaf is serrated with small teeth."
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
		"image": "boston_fern",
		"description": "Boston ferns (Nephrolepis exaltata) are popular houseplants and proper Boston fern care is essential to keeping this plant healthy. Learning how to take care of a Boston fern isn’t difficult, but it is specific. Below we have listed a few care tips for a Boston fern so that you can provide everything your fern needs to be happy and beautiful."
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

const events = [
	{
		"title": "Cutting Plants",
		"description": "Join to this workshop on how to cut your plants correctly!",
		"date": "2020-05-10",
		"image_url": "/images/worshop2.jpg"
	},
	{
		"title": "Winter Bouquet",
		"description": "Learn all the tips to build a winter bouquet.",
		"date": "2020-05-15",
		"image_url": "/images/workshop1.jpg"
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
})
.catch(err => console.log(err))

Event.insertMany(events)
	.then(events => {
		console.log("Inserted events:", events)
		mongoose.connection.close();
	})
	.catch(err => console.log(err))



