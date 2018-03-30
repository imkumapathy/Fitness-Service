import * as functions from 'firebase-functions';
// const http = require("http");
const express = require("express");
const controllers = require('../controllers');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('../config.json');
const bodyParser = require("body-parser");
const compression = require('compression');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

//enable express now
const app = express();
app.use(compression());
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded());
app.use(express.json());

//map all the routes here
controllers.init(app,db);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
app.get('/timestamp',(req,res)=>{
    res.send('whatever')
})
export const fitnessServiceApp = functions.https.onRequest(app);
