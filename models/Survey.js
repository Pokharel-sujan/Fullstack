const mongoose = require('mongoose');
const {Schema } = mongoose;
const RecipientSchema= require('/Recipients');


const surveySchema = new Schema({
    title:String, 
    body:String,
    subject:String,
    recipients : [RecipientSchema],
    yes:{type:Number, default:0},
    no:{type:Number, default:0},

});

//name of the model class is surveys and second is the schema name
mongoose.model('surveys',surveySchema);