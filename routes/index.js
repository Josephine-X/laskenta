var express = require('express');
const mongoose=require('mongoose');
const db=require('../DB/db.js');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
const doc=new db.tyomaat({
  nimi:'Hämeenkatu',
  osiot:[],
})
await doc.save();
const tyomaatlista=await db.tyomaat.find({}).exec();

//const lista=await db.osiot.find({}).exec();
res.redirect(`/tyomaat/${tyomaatlista[0]._id}`)
 // res.render('index', { tyomaatlista },{ osiot:tyomaatlista[0].osiot });
});

router.get("/tyomaat/:id",async function(req,res,next){
  const doc=await db.tyomaat.findOne({'_id':req.params.id}).exec();
  const lista=await db.tyomaat.find({}).exec();
  console.log(req.params.id)
  res.render('index',{ 'lista':lista, 'osiot':doc });
})

router.get("/:id/:tunnus",async function(req,res,next){
  const docs=await db.tyomaat.find({'_id':req.params.id}).exec();
  const doc=docs[0];
  const osio = doc.osiot.id(req.params.tunnus);
  const vaiheet=osio.vaiheet;
  let arr=[];
  let leveys=0;
  for(let i=0;i<vaiheet.length;i++){
    leveys=leveys+Math.abs(vaiheet[i].tyyppi);
  }
  let left=0;
  let fill;
  for(let i=0;i<vaiheet.length;i++){
    let tyyppi=Math.abs(vaiheet[i].tyyppi)
    arr.push({'width':1200*(tyyppi/leveys),'left':left,'text':left+1200*(tyyppi/(2*leveys)),'tyyppi':tyyppi})
    left=left+1200*(tyyppi/leveys);
  }
  console.log(arr)
  res.render('osio',{ 'osio':osio, 'doc':doc, 'palkki':arr });
})

router.post("/uusiosio",async function(req,res,next){
  const doc=await db.tyomaat.findOne({'_id':`${req.body.id}`}).exec();
  const osio={'nimi':req.body.nimi,'vaiheet':[]};
  doc.osiot.push(osio);
  const id=doc.osiot[doc.osiot.length-1]._id;
  await doc.save();
  res.send(id);
})

router.post("/lisaavaihe",async function(req,res,next){
  console.log(req.body.tunnisteet);
  const doc=await db.tyomaat.findOne({'_id':req.body.id}).exec();
  let uus={'tyyppi':req.body.tyyppi,'aihe':req.body.aihe,'nimi':req.body.nimi,'tunniste':[]};
  const tunnisteetarr=req.body.tunnisteet.split(",")
  for(let i=0;i<tunnisteetarr.length;i++){
    uus.tunniste.push(tunnisteetarr[i])
  }
  const osio=doc.osiot.id(req.body.osioid);
  osio.vaiheet.push(uus);
  const id=osio.vaiheet[osio.vaiheet.length-1]._id;
 // osio.vaiheet.push(uus);
  //osio.vaiheet[osio.vaiheet.length-1].tunniste.concat(req.params.tunnisteet);
  const uusdoc=await doc.save();
  console.log(uusdoc);
  res.send(id);
})

router.post("/poistavaihe",async function(req,res,next){
  const docs=await db.tyomaat.find({"_id":req.body.docid}).exec();
  docs[0].osiot.id(req.body.osioid).vaiheet.id(req.body.vaiheid).deleteOne();
  await docs[0].save();
  res.send('ok');
})

router.post("/poistaosio",async function(req,res,next){
  const docs=await db.tyomaat.find({"_id":req.body.docid}).exec();
  docs[0].osiot.id(req.body.osioid).deleteOne();
  await docs[0].save();
  res.send('ok');
})

module.exports = router;
