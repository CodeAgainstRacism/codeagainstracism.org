require("dotenv").config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

//Middleware
app.use(bodyParser.json());
app.use(logger('dev'));

// Import Routes
const authRoutes = require('./routes/auth');
const organizationsRoutes = require('./routes/organizations');
const projectsRoutes = require('./routes/projects');
const usersRoutes = require("./routes/users")

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}...`));
