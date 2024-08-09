const mongoose=require('mongoose');

const vaihe=new mongoose.Schema({
    tyyppi:Number,
    aihe:String,
    nimi:String,
    tunniste:[String]
})
const osio=new mongoose.Schema({
    nimi:String,
    vaiheet:[vaihe]

})

const tyomaadoc=new mongoose.Schema({
    nimi:String,
    osiot:[osio]
})

exports.tyomaat=mongoose.model('tyomaa',tyomaadoc);
exports.osiot=mongoose.model('osio',osio);
exports.alaosiot=mongoose.model('vaihe',vaihe)