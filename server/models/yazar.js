const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const yazarSchema=new Schema({
    isim:String,
    yas:Number
});

module.exports=mongoose.model('Yazar',yazarSchema);