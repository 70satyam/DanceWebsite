const express= require("express");
const path =require('path')
const app =express();
const bodyparser=require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true });
const port=80;
// define mongoos schema
var contactSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  number: String,
  dance: String,
});
var contact = mongoose.model('contact',contactSchema);
// Express specific stuff
app.use('/static',express.static('static'));//  for serving static files
app.use(express.urlencoded())

// Pug specific stuff
app.set('view engine', 'pug')// set the template engine as pug

app.set('views',path.join(__dirname,'views'))// set view directory

// end points

app.get("/", (req, res)=> {
    
    const sat={}
    res.status(200).render('home.pug',sat)
  })
app.get("/contact", (req, res)=> {
    
    const sat={}
    res.status(200).render('contact.pug',sat)
  })
app.post("/contact", (req, res)=> {
    
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
      res.send('this item is sumbitted')

    }).catch(()=>{
      res.status(400).send('item was not sumbitted ')
    })
  })

  // Start the server
app.listen(port,()=>{
    console.log(`this application is successfully started ${port}`)
});