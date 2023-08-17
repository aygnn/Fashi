import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import Asyncerror from 'express-async-handler'
import sendJwttoClient from '../helpers/auth/tokenHelpers.js'
import validateInputs from '../helpers/auth/inputHelpers.js'
//Register
 export const postUser=Asyncerror(async(req,res,next)=>{
  const {
    username,isAdmin,password,userwishlist,usercheckout,posts,email,subtotal,basketCount

  }=req.body
  const user=await User.create({ username,isAdmin,password,userwishlist,usercheckout,posts,email,subtotal,basketCount})
  sendJwttoClient(user,res)
})





//login

 export const login=Asyncerror(async(req,res,next)=>{
  const {
    username,password
  }=req.body

  if(!validateInputs(username,password)){
    return next (res.send({ message: "This user does not exist!" }));
  }
  const user=await User.findOne({username}).select("+password")
  // console.log(user.password);
  if(password!==user.password){
    return next (res.status(400).json({ message: "Password not correct!",success:false }));

  }

  sendJwttoClient(user,res)
})

//get users

export const getUsers=Asyncerror(async(req,res,next)=>{
  User.find({}, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.status(404).json({ message: err });
      res.send({ message: "not found" });
    }
  })
})






