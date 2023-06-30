const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./models/Task');  // Import your model
const path = require('path');

// Set MongoDB connection string
const uri = "mongodb+srv://ryanrpaul22:Socrates2023@cluster0.xxzuevw.mongodb.net/?retryWrites=true&w=majority";

// Connect to your MongoDB database using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB!");

    // Initialize Express
    const app = express();

    // Use CORS middleware here
    app.use(cors());
    
    // Configure Express to parse JSON
    app.use(bodyParser.json());

    // POST /tasks - Add a new task
    app.post('/api/tasks', async (req, res) => {
      const task = new Task(req.body);
      await task.save();
      res.send(task);
    });

    // GET /tasks - Get all tasks
    app.get('/api/tasks', async (req, res) => {
      const tasks = await Task.find();
      res.send(tasks);
    });

    // PUT /tasks/:id - Update a task by id
    app.put('/api/tasks/:id', async (req, res) => {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.send(task);
    });

    // DELETE /tasks/:id - Delete a task by id
    app.delete('/api/tasks/:id', async (req, res) => {
      await Task.findByIdAndDelete(req.params.id);
      res.send({ message: 'Task removed' });
    });

    // Then place this middleware
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    // Any GET requests not handled by an earlier route will be passed to your React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });

    // Start the server
    const port = 3001;  // Or whichever port you'd like
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  })
  .catch(err => console.error(err));
