const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./schema/people');

passport.use(new LocalStrategy(async (username,password,done)=>{
    try
    {
        console.log('Received login Info ');
        const user = await person.findOne({username:username});
        if(!user)
        {
            return done(null,false,{message:'username is incorrect'});
        }
        // const ispass =  user.password === password ? true : false ;
        const ispass = await user.Dcompare(password);
        if(ispass)
        {
            console.log("done authjs");
            return done(null,user);
        }
        else
        {
            console.log("not done authjs");
            return done(null,false ,{ message :'Incorrect Password' });
        }
    }
    catch(err)
    {
        console.log(err);
        return done(err);
    }
}));
module.exports = passport;