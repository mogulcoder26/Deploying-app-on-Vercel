const express = require('express');
const bodyParser = require('body-parser');
const {join}=require('path')
const {today}=require('./date')
const {dateformat}=require('./date')
// const PORT = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',join(__dirname,'./views'));
app.set("view engine", "ejs");
app.use('/',express.static(__dirname+'/public'));

// var upc_task = "";

var listnew=[];

app.get('/', (req, res) => {
    res.render("index", { date: today,dateformat:dateformat, newitem: listnew })
})

app.post('/', (req, res) => {
    if(req.body.upcomingtask){
        listnew.push(req.body.upcomingtask);
        console.log('post req');
        res.redirect('/');
    }
    else{
        console.log('Please enter a valid Task!')
        res.redirect('/')
    }
})

app.listen(process.env.PORT||3000, () => {
    console.log(`Server live at localhost:3000 as well as @vercel`)
})
