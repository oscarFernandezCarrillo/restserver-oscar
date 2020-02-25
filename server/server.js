require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const router = require('../routes/index-router');

const bodyParser = require('body-parser');

//procesar peticiones www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());

app.use('', router);

mongoose.connect(process.env.URLDB, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err, resp) => {
    if (err) console.log("error", err)
    console.log(`conectado a DB`)
});

app.listen((process.env.PORT), () => {
    console.log(`escuchando el puerto `, process.env.PORT);
});