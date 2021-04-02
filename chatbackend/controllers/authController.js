const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config  = require('../config/app');
const {validationResult} = require('express-validator'); 



exports.login = async(req,res)=>{
    const {email,password} = req.body;
    
    try{

        //find user with this email adress
        const user = await User.findOne({
            where:{
                email
            }
        })
        
        //check if user is found
        if(!user) return res.status(404).json({message:"User not found!"})
        //check if password provided
        if(!bcrypt.compareSync(password,user.password)) return res.status(401).json({message:"Incorects Password!"})
        //generate auth token
        const userWithToken = generateToken(user.get({raw:true}));
        userWithToken.user.avatar = user.avatar;
        return res.send(userWithToken)
    }catch(e){
       return res.status(500).json({message:e.message});
    }


}

exports.register = async(req,res)=>{
    const errors = validationResult(req);
  
    
    try{
        const user  = await User.create(req.body);

        const userWithToken = generateToken(user.get({raw:true}));
        return res.send(userWithToken)
    }catch(e){
        return res.status(500).json({message:e.message});
    }
}

const generateToken = (user) =>{
    delete user.password;

    const token = jwt.sign(user,config.appKey,{expiresIn:86400});

    return {...{ user },...{token} }
}