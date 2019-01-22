const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const kitapSchema=new Schema({
    isim:String,
    tur:String,
    yazarId:String
});

module.exports=mongoose.model('Kitap',kitapSchema);