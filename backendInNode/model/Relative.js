const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// Create the Relative Schema
const RelativeSchema = new Schema({
    name: {
         type: String,
         required: true
     },
     mobile:{
         type:Number,
         default:null
     },
    birth : {
     type: String,
     required: true
 },
    main : {
     type: String,
 },

 time:{
    type:String,
    required:true
 }
 ,
    status:{
        type:Boolean,
        default:1
    }
});
module.exports = Relative = mongoose.model('relatives', RelativeSchema);