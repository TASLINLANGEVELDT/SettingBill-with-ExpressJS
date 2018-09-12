const express = require("express");

const app = express();

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');


 //let settingsBill = require('./settings.js');

 let setBill = settingsBill();




app.engine('handlebars', exphbs({

  defaultLayout: 'main'

}));




app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({

  extended: false

}));


app.use(bodyParser.json());


app.use(express.static('public'));


app.get('/', function(req, res) {

  res.render('home', setBill.returnAll());

});


app.post('/settings', function(req, res) {


  setBill.value_Call(req.body.callInput);

  setBill.value_Sms(req.body.smsInput);

  setBill.value_Warning(req.body.warningInput);

  setBill.value_Critical(req.body.criticalInput);


  res.redirect('/');

});


app.post('/action', function(req, res) {


  let type = req.body.billItemType;


  setBill.calculate_CallSms(type);

  setBill.calculate_Total();


  res.redirect('/');


});


app.post('/clear', function(req, res) {

  setBill.clearAll();

  res.redirect('/');

});


app.get('/actions', function(req, res) {

  res.render('actions', {

    actionsList: setBill.returnAll().actions,

  });

});


app.get('/actions/:type', function(req, res) {

  res.render('filter', {

    actionFilter: setBill.filterActions(req.params.type),

    totalForAction: setBill.actionTotal(req.params.type)

  });

});

let PORT = process.env.PORT || 3300;

app.listen(PORT, function() {

  console.log('App starting on port', PORT);

});
