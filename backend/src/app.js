const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('path');



// Routes
const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

require('dotenv').config({ path: __dirname + '/.env' });

const app = express();


console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport);
// public klasörünü statik olarak sun
app.use(express.static(path.join(__dirname, '../../frontend/public')));





app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => res.send('Quizz API'));

module.exports = app;
