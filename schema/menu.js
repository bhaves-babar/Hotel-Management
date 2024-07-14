const mongoose = require('mongoose');

let menuschema = new mongoose.Schema({

    dishname:{
        type:String,
        require:true,
        unique:true
    },
    price:{
        type:Number,
        require:true,
    },
    taste:
    {
        type:String,
        require:true
    },
    dishtype:
    {
        type:String,
        require:true   
    }
})

const menu = mongoose.model('Menu',menuschema);
module.exports = menu;