const express = require('express');
const router = express.Router();
const User = require('../model/register');
const mongoose = require('mongoose');
const bcrypt=require("bcrypt");


router.post('/register',(req, res, next) => {
    bcrypt.hash(req.body.password,10,(err,hash) => {
        if (err) 
        {
          return res.status(500).json({
            error:err
          });
        } 
        else
         {
          const user = new User({
              _id: new mongoose.Types.ObjectId,
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              email:req.body.email,
              password:hash,
          });
          user.save()
            .then((result) => {
              console.log(result);
              res.status(200).json({
                status:1,
                massage:"signing successfully",
                data:[result],
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      })



    
});

// router.post('/login',(req,res,next)=>{
//     User.find({email:req.body.email})
//     .exec()
//     .then(user=>{
//         if(user.length < 1)
//         {
//             res.status(404).json({
//                 message:'faculty not exist'
//             })
//         }
//         bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
//             if(!result)
//             {
//                 return res.status(401).json({
//                     message:'invalid password'
//                 })
//             }else{
            
//                 res.status(200).json({
//                     status:1,
//                     massage:"login successfully",
                    
//                   });

//             }
//         })

//         }
//     )
//     .catch(err=>{
//         res.status(500).json({
//             err:err
//         })
//     })
        
// });



module.exports=router;