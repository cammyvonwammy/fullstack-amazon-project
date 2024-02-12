// server/app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Use routes
app.use('/api/users', userRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Only start the server if MongoDB connects successfully
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));

