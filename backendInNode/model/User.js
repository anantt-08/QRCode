const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// Create the User Schema
const UserSchema = new Schema({
    name: {
         type: String,
         required: true
     },
    admin:{
        type:Boolean,
        default:false
    },
     house:{
         type:String,
         default: ""
     },
     mobile:{
         type:Number,
         default:null
     },
     occupation:{
        type:String,
        default:""
     },
    birth : {
     type: String,
     required: true
 },
  qrcode:{
    type:String,
    default:""
  }
 ,
    canLogin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true, // Unique index. If you specify `unique: true`
        required: true
    },
    password: {
        type: String,
        required: true,
        min:4,
        max:20
    },
    status:{
        type:Boolean,
        default:1
    },
    token:{
        type:String,
        default:''
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: null
    }
});
module.exports = User = mongoose.model('users', UserSchema);