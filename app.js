const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postionRoutes = require('./routes/position');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const analyticsRoutes = require('./routes/analytics');
const app = express();

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/position', postionRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/analytics', analyticsRoutes)




module.exports = app;