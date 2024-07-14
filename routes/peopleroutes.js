const express = require('express');
const router = express.Router(); 
const people = require('../schema/people');
const {jwtautmiddleware, gene} = require('./../jwt');

// inserting data
router.post('/',async (req,res)=>{
    try{
         const data =req.body;
         const newUser = new people(data);
         // console.log('Try ke andar hu')
         const savep = await newUser.save();
         // console.log('insert ho gaya');
        const payload ={
            id:savep.id,
            username:savep.username
        }

         const token = gene(payload);
         console.log('Token is generated :: ' , token);
         res.status(200).json({ response:savep,Token:token});
    }
    catch(err)
    {
         console.log('nahi hua');
         res.status(500).json(err);
    }
 });

// retrive the data of user
router.get('/',jwtautmiddleware,async(req,res)=>{
    try
    {
        const data = await people.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
    }
});

// profile

router.get('/profile',jwtautmiddleware,async(req,res)=>{
    try
    {
        const userdata = req.body;
        console.log("user Data :" ,userdata);
        const userid =userdata.id;
        const user = await people.findById(userid);
        res.status(200).json({user});
    }
    catch(err)
    {
        console.log(err);
    }
});


//login routes

router.post('/login',async(req,res)=>{
    try
    {
        const {username ,password} = req.body;

        const user = await people.findOne({username:username});
        const pass = await user.Dcompare(password);
        if(!user || !pass)
            return res.status(401).json({error : 'username or password invalid'});
        const payload ={
            id : user.id,
            username : user.username
        }
        const token = gene(payload);
        res.json({token});
    }
    catch(err)
    {
        console.error(err);
    }
});

router.get('/:work',async(req,res)=>{
    try
    {  
        const workv = req.params.work;
        if(workv == "Chef" || workv =="Manager" || workv =="waiter")
        {
            
            const data = await people.find({work:workv});
            res.status(200).json(data);
            console.log(`Data of ${workv}(s) featched`);
        }
        else
        {
            res.send('Invalid Work type');
        }
    }
    catch(err)
    {
        console.log(err);
    }
});

// update person information

router.put('/:id',async(req,res)=>{
    try
    {
        const pid = req.params.id;
        const udata = req.body;
        const saved = await people.findByIdAndUpdate(pid,udata,{
            new :true, // return updated document 
            runValidators:true, // run mongodb validator
        });
        if(!saved)
            {
                 return  res.status(404).json({error:'Person Not found'})
            }
        console.log('data updated');
        res.status(200).json(saved);
    }
    catch(err)
    {
        console.log(err);
    }
});

// Delete Person information 

router.delete('/:id',async(req,res)=>{
    try
    {
        const pid = req.params.id;
        const ddata = await people.findByIdAndDelete(pid);
        // according to tutorial but give an error so we use above function
        // const ddata = await people.findByIdAndRemove(pid) 
        if(!ddata)
        {
          return  res.status(404).json({error : 'Person Not found'});
        }
        console.log('Document Deleted');
        res.status(200).json({Message : 'Person Information Deleted'});
    }
    catch(err)
    {
        console.log(err);
    }
});

module.exports = router;