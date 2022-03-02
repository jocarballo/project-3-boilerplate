const mongoose = require('mongoose')

// connect to mongoose
mongoose.connect('mongodb://localhost/planty')
	.then(db => console.log(`connected to database ${db.connections[0].name}`))
	.catch(err => console.log(err))


const Plant = require('../models/Plant')
const User = require('../models/User')

const plants = [
    {
        common_name: "Common dandelion",
        scientific_name: "Taraxacum officinale",
        description: "Taraxacum officinale, the dandelion or common dandelion, is a flowering herbaceous perennial plant of the dandelion genus in the family Asteraceae (syn. Compositae). The common dandelion is well known for its yellow flower heads that turn into round balls of many silver-tufted fruits that disperse in the wind. These balls are usually called <clocks> in both British and American English.",
    }
]

const users = [
    {
        username: "joana",
        email: "jo@iron", 
        passwordHash: "12",

    },
    {
        username: "mateus",
        email: "mat@iron", 
        passwordHash: "12",

    },
    {
        username: "fabio",
        email: "fa@iron", 
        passwordHash: "12",

    }
] 


// Call the Plant model's create method with the array as argument.
Plant.insertMany(plants)
    .then(plants => {
        console.log('Here we got plants: ' + plants)
    })
    .catch(err => console.log(err))


// Call the User model's create method with the array as argument.
User.insertMany(users)
    .then(users => {
        console.log('Here we got users: ' + users)
        mongoose.connection.close();
    })
    .catch(err => console.log(err))