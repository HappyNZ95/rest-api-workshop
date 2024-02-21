let express = require('express')
let app = express()
let personRoute = require('./routes/person')
let customerRoute = require('./routes/customer')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())

/*//Mongoose connection

const mongoose = require('mongoose');
const uri = "mongodb+srv://happynz:Nbe0b4JOg5CDPw9Q@cluster0.1zlf2lw.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  try {
    // Connect the client to the server
    await mongoose.connect(uri);
    
    // If connection is successful
    console.log("You successfully connected to MongoDB!");

  } catch (error) {
    // If there's an error while connecting
    console.error('Error connecting to mongodb', error);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.connection.close();
  }
}

run();*/

// middleware
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(personRoute)
app.use(customerRoute)
app.use(express.static('public'))

//Handler for 404 - Resource Not Found //
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
})

//Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)

    res.sendFile(path.join(__dirname, '../public/500.html'))
    
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))

