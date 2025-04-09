import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import inspectionRoutes from './routes/inspectionRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001; // Changed to 5001 to avoid conflicts

// Check for critical environment variables
if (!process.env.MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in .env file');
  process.exit(1);
}

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',                      // Local React development
  'http://localhost:5173',                      // Local Vite development
  process.env.REACT_APP_FRONTEND_URL,           // Frontend URL from env
  'https://safetrack-app.netlify.app',          // Replace with your actual Netlify domain
  'https://*.netlify.app'                       // Allow all Netlify subdomains for preview deploys
].filter(Boolean); // Remove any undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches any allowed origin
    // Also check for wildcard subdomains on netlify.app
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin === '*') return true;
      if (allowedOrigin === origin) return true;
      
      // Handle wildcard subdomains
      if (allowedOrigin.includes('*.netlify.app') && 
          origin.endsWith('netlify.app')) {
        return true;
      }
      
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked for:', origin);
      callback(null, false); // Don't throw error, just block the request
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with error handling
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

mongoose.set('strictPopulate', false);

connectDB();

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/tasks', taskRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('SafeTrack API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;