// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const todosRouter = require('./routes/todos');


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
console.error('MongoDB connection error:', err.message);
process.exit(1);
});


app.use('/api/todos', todosRouter);






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));