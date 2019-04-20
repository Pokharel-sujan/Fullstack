const mongoose = require('mongoose');

//the mongoose object has the property Schema, take that property and assign to new variable schema, curly bracket 
const {Schema}= mongoose;

const userSchema = new Schema({
    googleId: String
});
//mongoose will create if there is not aba user ; will not over-ride the data
mongoose.model('users', userSchema);