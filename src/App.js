const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router/Customer');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use('/', router);


mongoose.connect(process.env.MONGODB_URI).then((result) => {
    app.listen(process.env.PORT);
})
    .catch((err) => { console.log(err) })

