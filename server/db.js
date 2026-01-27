// server/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillmatched';
    
    console.log(`🔗 Attempting to connect to MongoDB...`);
    console.log(`📁 Database: ${mongoURI.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
  } catch (err) {
    console.error(`❌ MongoDB Connection Failed: ${err.message}`);
    console.log('💡 Tips:');
    console.log('   1. Check if MongoDB is running locally: mongod');
    console.log('   2. Verify Atlas connection string in .env');
    console.log('   3. Check internet connection for Atlas');
    
    // Don't exit process - allow server to run without DB
    console.log('⚠️  Server running without database connection');
  }
};

export default connectDB;