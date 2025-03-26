import mongoose from 'mongoose';
import env from './environment';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
