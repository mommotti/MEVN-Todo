const express = require('express')
const cors = require('cors')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
const todos = require('./routes/api/todos')
app.use('/api/todos', todos)

// Server start
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`The app is running on port ${port}`))