import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});














// const mongoose = require('mongoose');
// 
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connection hogaya reee');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };
// 
// module.exports = connectDB;