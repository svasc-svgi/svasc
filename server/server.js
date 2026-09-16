const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection 
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/college-website';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully 🚀'))
    .catch(err => console.error('MongoDB Connection Error ❌:', err.message));


// Routes
const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
