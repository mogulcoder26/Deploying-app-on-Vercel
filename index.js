const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var upc_task = "";

var listnew=[];

var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? " PM" : " AM";
    var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem;
    var dateformat= dayOfWeek + "," + dayOfMonth + " of " + curMonth +"," + curYear;
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render("index", { date: today,dateformat:dateformat, newitem: listnew })
})
app.post('/', (req, res) => {
    listnew.push(req.body.upcomingtask);
    console.log('post req');
    res.redirect('/');
})



app.listen(PORT, () => {
    console.log(`Server live @ ${PORT}`)
})