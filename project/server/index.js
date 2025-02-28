import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { userRoutes } from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    let connectionString = process.env.MONGODB_URI;
    
    // If no connection string is provided, use MongoDB Memory Server
    if (!connectionString) {
      console.log('No MongoDB URI provided, using in-memory MongoDB');
      const mongoServer = await MongoMemoryServer.create();
      connectionString = mongoServer.getUri();
      // Store the mongoServer instance globally to prevent garbage collection
      global.__MONGO_SERVER__ = mongoServer;
    }
    
    await mongoose.connect(connectionString);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

export { app, connectDB };