const bodyParser = require('body-parser');
const Task = require('./models/Task');  // Import your model

const express = require('express');
const app = express();
const path = require('path');

// Place your API routes here, before the middleware for serving the static React app
app.get('/api/tasks', (req, res) => {
    // POST /tasks - Add a new task
    app.post('/tasks', async (req, res) => {
        const task = new Task(req.body);
        await task.save();
        res.send(task);
    });

    // GET /tasks - Get all tasks
    app.get('/tasks', async (req, res) => {
        const tasks = await Task.find();
        res.send(tasks);
    });

    // PUT /tasks/:id - Update a task by id
    app.put('/tasks/:id', async (req, res) => {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(task);
    });

    // DELETE /tasks/:id - Delete a task by id
    app.delete('/tasks/:id', async (req, res) => {
        await Task.findByIdAndDelete(req.params.id);
        res.send({ message: 'Task removed' });
    });
});

// Then place this middleware
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});



const port = 3001;  // Or whichever port you'd like
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ryanrpaul22:Socrates2023@cluster0.xxzuevw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
