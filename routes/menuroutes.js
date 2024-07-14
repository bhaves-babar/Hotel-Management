const express = require('express');

const router = express.Router();

const menu = require('../schema/menu');

// menu end points 
// Inserting data
router.post('/',async(req,res)=>{
    try
    {
        const data = req.body;
        console.log("inside menu post");
        const newitem =  new menu(data);
        const savem = await newitem.save();    
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
    }
})

// fatching data
    router.get('/',async(req,res)=>{
    try
    {
        const data = await menu.find();
        console.log("inside menu get");

        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
    }
    });


// fatching menu iteam according to dish type
router.get('/:type',async(req,res)=>{
    try
    {
        const typev = req.params.type;
        if(typev == 'main dish' || typev == 'starter' || typev == 'dessert' )
        {
            const data = await menu.find({dishtype:typev});
            console.log("inside menu get acc to type");
            res.status(200).json(data);
        }
        else
        {
            res.send('Invalid Dish Type');
        }
    }
    catch(err)
    {
        console.log(err);
    }
});


// home-work  create curd oppration for  menu 
router.put('/:id',async(req,res)=>{
    try
    {
        const iid = req.params.id;
        const udata = req.body;
    
        const saved = await menu.findByIdAndUpdate(iid,udata,{
            new:true,
            runValidators:true
        });
        if(!saved)
        {
            return res.status(404).json({error : "Item Not Found"})
        }
        console.log('data update');
        res.status(200).json(saved);
    }
    catch(err)
    {
        console.log(err);
    }
});

router.delete('/:id',async(req,res)=>{
    try
    {
        const iid = req.params.id;
        const ddata = await menu.findByIdAndDelete(iid);
        if(!ddata)
        {
            return res.status(404).json({message :'Item not found'});
        } 
        console.log('Item Removed');
        res.status(200).json({message : 'data removed succesfully'});
    }
    catch(err)
    {
        console.log(err);
    }
});

module.exports = router;