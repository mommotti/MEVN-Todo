const mongodb = require('mongodb')
const express = require('express')
const router = express.Router()
require('dotenv').config()

// Get Todos
router.get('/', async (req, res) => {
    const todos = await loadTodosCollection()
    res.send(await todos.find({}).toArray())
})

// Add Todo
router.post('/', async (req, res) => {
    const todos = await loadTodosCollection()
    await todos.insertOne({
        title: req.body.title,
        completed: false,
        editing: false,
        createdAt: new Date()
    })
    res.status(201).send()
})

// Delete Todo
router.delete('/:id', async (req, res) => {
    const todos = await loadTodosCollection()
    await todos.deleteOne({ _id: mongodb.ObjectID(req.params.id) })
    res.status(204).send()
})

// Update Todo 
router.patch('/:id', async (req, res) => {
    const todos = await loadTodosCollection()
    await todos.updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: { "title": req.body.title } })
    res.status(200).send()
})


// Connect to Todos collection
async function loadTodosCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://mommotti:${process.env.MONGO_PASSWD}@mommotticloud-dpwsv.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    return client.db('mern-todo').collection('todos')
}

module.exports = router

