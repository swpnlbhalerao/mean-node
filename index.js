const express = require('express');
const bodyParser = require('body-parser')
var path = require('path');
const keys = require('./keys')
const mongoose = require('mongoose')
const cors = require('cors');

const businessRoute = require('./Api/gstapi');
const userRoutes=require('./Api/userapi');

let port = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/business', businessRoute);
app.use('/user', userRoutes);
/* app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  }); */



app.listen(port, () => console.log(`Running on port ${port}`));


mongoose.connect(keys.mongoDb.dbUrl,
    { useNewUrlParser: true, useFindAndModify: false },
    (error) => {
        if (!error)
            console.log("Connected Successfully");
        else
            console.log("Error message " + error.message);
    });


