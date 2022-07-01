const express = require('express');
const router = express.Router();
const User = require('../model/register');
const mongoose = require('mongoose');
const bcrypt=require("bcrypt");


router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1)
        {
            res.status(404).json({
                message:'faculty not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    message:'email or password are incorrect'
                })
            }
            if(result)
            {
                return res.status(401).json({
                    message:'login successful'
                })
            }

            
        })

        }
    )
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
        
});

module.exports=router;