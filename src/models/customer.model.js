let mongoose = require('mongoose')
const uri = "mongodb+srv://happynz:Nbe0b4JOg5CDPw9Q@cluster0.1zlf2lw.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)