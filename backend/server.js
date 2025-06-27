require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mediaRoutes = require('./routes/media');
const mediaGroupRoutes = require('./routes/mediaGroup');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/media', mediaRoutes);
//Group
app.use('/group', mediaGroupRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
