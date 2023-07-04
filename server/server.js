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
      // Count the current number of tasks
      const count = await Task.countDocuments();

      // Add the new task with an order that puts it at the end of the list
      const task = new Task({
        ...req.body,
        order: count,
      });

      await task.save();
      res.send(task);
    });

    // GET /tasks - Get all tasks
    app.get('/api/tasks', async (req, res) => {
      const tasks = await Task.find().sort('order');
      res.send(tasks);
    });

    // PUT /tasks/:id - Update a task by id
    app.put('/api/tasks/:id', async (req, res) => {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.send(task);
    });

    // PUT /tasks/order - Update order of tasks
    app.put('/api/tasks/order', async (req, res) => {
      const { order } = req.body;

      // Find all tasks from DB
      const tasks = await Task.find({}).exec();

      // Update each task's order
      const updates = tasks.map(task => {
        const orderIndex = order.indexOf(task._id.toString());
        if (orderIndex > -1) {
          task.order = orderIndex;
          return task.save();  // Save task with new order
        }
        return null;
      });

      // Wait for all tasks to finish updating
      await Promise.all(updates);

      res.json({ success: true });
    });

    // DELETE /tasks/:id - Delete a task by id
    app.delete('/api/tasks/:id', async (req, res) => {
      const taskToRemove = await Task.findById(req.params.id);
      
      // Remove the task
      await taskToRemove.remove();

      // Find all tasks that have a higher order than the removed task
      const tasksToUpdate = await Task.find({ order: { $gt: taskToRemove.order } });

      // Decrease their order by 1
      const updates = tasksToUpdate.map(task => {
        task.order -= 1;
        return task.save();
      });

      // Wait for all tasks to finish updating
      await Promise.all(updates);

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
