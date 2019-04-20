const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport= require('passport');    // passport is to say use them to cookie
const keys = require('./config/keys')


require('./models/User'); // model being created first and passport the second
require("./services/passport");



//connceting to the moongoose database 
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);   // valid 
// mathi ko second function lee, immediately invokes the function that is required in.

const PORT = process.env.PORT || 5000;
app.listen(PORT);
