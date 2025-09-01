// server/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


// GET /api/todos - list all
router.get('/', async (req, res) => {
try {
const todos = await Todo.find().sort({ createdAt: -1 });
res.json(todos);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// POST /api/todos - create
router.post('/', async (req, res) => {
try {
const { title } = req.body;
if (!title) return res.status(400).json({ message: 'Title is required' });
const todo = new Todo({ title });
await todo.save();
res.status(201).json(todo);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// PUT /api/todos/:id - update (toggle completed or update title)
router.put('/:id', async (req, res) => {
try {
const { id } = req.params;
const updates = req.body; // { title?, completed? }
const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
if (!todo) return res.status(404).json({ message: 'Todo not found' });
res.json(todo);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// DELETE /api/todos/:id
router.delete('/:id', async (req, res) => {
try {
const { id } = req.params;
const todo = await Todo.findByIdAndDelete(id);
if (!todo) return res.status(404).json({ message: 'Todo not found' });
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});


module.exports = router;