const express = require('express');
const db = require('../database/config/db.config');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Test database
db.authenticate().then((result) => {
    console.log("database connected");
}).catch((err) => {
    console.log(err);
    console.log(process.env.DB_PASSWORD);
    console.log("Error");
});
// db.sync({ force: true });

// Define route
const authRoute = require('./api/auth/auth.route');
const userRoute = require('./api/user/user.route');
const requiredClassesRoute = require('./api/required-class/requiredClass.route');
const addressRoute = require('./api/address/address.route')
const classesRoute = require('./api/class/class.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Use route
app.use('/api/user/auth', authRoute);
app.use('/api/user/me', userRoute);
app.use('/api/required-classes', requiredClassesRoute);
app.use('/api/address', addressRoute);
app.use('/api/classes', classesRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));