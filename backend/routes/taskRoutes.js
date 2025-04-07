import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all tasks for current user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get task by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    
    // Make sure user owns the task
    if (task.user.toString() !== req.user.userId.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, location, time, status, date } = req.body;
    
    console.log('Received task data:', req.body);
    console.log('User ID from token:', req.user.userId);
    
    if (!title || !location || !time || !date) {
      console.error('Missing required task fields');
      return res.status(400).json({ message: 'Missing required task fields' });
    }
    
    const newTask = new Task({
      title,
      location,
      time,
      status: status || 'pending',
      date,
      user: req.user.userId
    });
    
    console.log('Creating task:', newTask);
    const task = await newTask.save();
    console.log('Task created successfully:', task);
    
    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const { title, location, time, status, date } = req.body;
  
  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (location) taskFields.location = location;
  if (time) taskFields.time = time;
  if (status) taskFields.status = status;
  if (date) taskFields.date = date;
  
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    
    // Make sure user owns task
    if (task.user.toString() !== req.user.userId.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );
    
    res.json(task);
  } catch (err) {
    console.error('Update task error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    
    // Make sure user owns task
    if (task.user.toString() !== req.user.userId.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await Task.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error('Delete task error:', err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
