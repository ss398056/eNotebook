const connectToMongo = require('./db')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

//Used for getting data in react app
app.use(cors())
//Used for getting data in request body
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello Sandeep!')
})

//Setting routes mapping 
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`eNotebook app listening on port ${port}`)
})

connectToMongo();
