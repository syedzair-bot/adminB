const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables FIRST before any other imports that use them
dotenv.config();

const authRoutes = require('./src/routes/authRoutes');
const universityRoutes = require('./src/routes/universityRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Distribution Tech API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/universities', universityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
