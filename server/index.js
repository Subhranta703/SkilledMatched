const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

const resumeRoutes = require('./routes/resume');

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));