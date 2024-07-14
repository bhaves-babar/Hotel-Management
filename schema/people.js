const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let peopelmodel = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    work:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phno:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
});

peopelmodel.pre('save',async function (next){
    const person = this;

    if(!person.isModified('password'))
        return next();

    try
    {
        const salt = await bcrypt.genSalt(10);

        // console.log('salt generated');

        const hashedPass = await  bcrypt.hash(person.password , salt);
        person.password = hashedPass;
        next();
    }
    catch(err)
    {
       return next(err);
    }
})

// peopelmodel.methods.comparePassword = async function(cpassword)
// {
//     try
//     {
//         const ismatch = await bcrypt.compare(cpassword,this.password);
//         // const match = await bcrypt.compare(this.password,password);
//         // console.log(bcrypt);
//         return ismatch;
//     }
//     catch(err)
//     {
//         throw err;
//     }
// }



peopelmodel.methods.Dcompare = async function (enteredPass){
    try
    {
        const ismatch = await bcrypt.compare(enteredPass,this.password);
        return ismatch;
    }
    catch(err)
    {
        throw(err);
    }
}

// })

const people=mongoose.model('person',peopelmodel);
module.exports=people;


// {  
//   "name": "bhavesh",
//   "work":"manager",
//   "age":20,
//   "email":"bhavesh@gmail.com",
//   "phone":9782132614
//   }

// changes in auth.js 52.00