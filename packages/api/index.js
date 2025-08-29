const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const categoryRoutes = require('./routes/categories.routes');
const incomeRoutes = require('./routes/incomes.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/incomes', incomeRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


