const mongo = require ('mongoose');
require('dotenv').config();

//db link
const url=process.env.DB_URL;

//set up MONGOdb connection
mongo.connect(url);

const db = mongo.connection;
// event listeners for database connection

// on connected
db.on('connected',()=>{
    console.log('DB Connect ho gaya');
});

db.on('error',(err)=>{
    console.error('Error',err)
});

db.on('disconnected',()=>{
    console.log('Disconnected');
});

module.exports = db;