const express = require ('express');
const app = express();

const db= require ('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bp = require('body-parser');
app.use(bp.json());

const passport = require('./auth');
app.use(passport.initialize());
const localauth = passport.authenticate('local',{session:false});
// const localauth = passport.authenticate('local');

app.get('/home',localauth,function (req,res){
    res.send("Hello Everyone...");
});

const personroutes = require('./routes/peopleroutes');
app.use('/people',personroutes);

const menuroutes = require('./routes/menuroutes');
app.use('/menu',localauth,menuroutes);

// const menuroutes = require('./routes/menuroutes');
// app.use('/menu',menuroutes);

app.listen(PORT,()=>{
    console.log("Server chalu hee");
});