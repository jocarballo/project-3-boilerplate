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
        _id: "123456789012345678901234",
        common_name: "Common dandelion",
        scientific_name: "Taraxacum officinale",
        description: "Taraxacum officinale, the dandelion or common dandelion, is a flowering herbaceous perennial plant of the dandelion genus in the family Asteraceae (syn. Compositae). The common dandelion is well known for its yellow flower heads that turn into round balls of many silver-tufted fruits that disperse in the wind. These balls are usually called <clocks> in both British and American English.",
    },
    {   
        
        common_name: "Mijdiejde",
        scientific_name: "deoidjewodj officinale",
        description: "Taraxacum officinale, the dandelion or common dandelion, is a flowering herbaceous perennial plant of the dandelion genus in the family Asteraceae (syn. Compositae). The common dandelion is well known for its yellow flower heads that turn into round balls of many silver-tufted fruits that disperse in the wind. These balls are usually called <clocks> in both British and American English.",
    },
    {   
        
        common_name: "cdsicjosdjc",
        scientific_name: "chasijcxpasikpoask",
        description: "cmidjcoijcmosj officinale, the dandelion or common dandelion, is a flowering herbaceous perennial plant of the dandelion genus in the family Asteraceae (syn. Compositae). The common dandelion is well known for its yellow flower heads that turn into round balls of many silver-tufted fruits that disperse in the wind. These balls are usually called <clocks> in both British and American English.",
    }, 
    {   
        
        common_name: "pkspaowi",
        scientific_name: "qpwosqwsub",
        description: "swpskqwpolspqoks officinale, the dandelion or common dandelion, is a flowering herbaceous perennial plant of the dandelion genus in the family Asteraceae (syn. Compositae). The common dandelion is well known for its yellow flower heads that turn into round balls of many silver-tufted fruits that disperse in the wind. These balls are usually called <clocks> in both British and American English.",
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


