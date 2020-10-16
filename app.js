const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 80;

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
var Contact = mongoose.model('Contact', contactSchema);


//express specific
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

//pug specific
app.set('view engine', 'pug'); //set the templete engine at pug
app.set('views', path.join(__dirname, 'views')); //set view directory //here view is templete


// //our pug demo endpoint
// app.get('/demo', function (req, res) {
//     res.status(200).render('demo', { title: 'Hey chitvan', message: 'Hello there!' })
//   })
// app.get("/", (req, res)=>{ 
//     res.status(200).send("This is homepage of my first express app with Harry");
// });
// app.get("/about", (req, res)=>{
//     res.send("This is about page of my first express app with Harry");
// });
// app.post("/about", (req, res)=>{
//     res.send("This is a post request about page of my first express app with Harry");
// }); 
// app.get("/this", (req, res)=>{
//     res.status(404).send("This page is not found on my website cwh");
// });

//endpoints
app.get('/', (req, res) => {
    const param = { }
    res.status(200).render('home.pug', param);
});

app.get('/contact', (req, res) => {
    const param = { }
    res.status(200).render('contact.pug', param);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
})




//start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});



