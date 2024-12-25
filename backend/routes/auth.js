const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT_SECRET = "dgcxgfdgfdvgwreoypaxvnmpqpsdlzlf"

//This is post method which is used for create user or store details in database
router.post('/createuser', 
  //Validation of model attributes
  [
    body('name','name field not be blank').notEmpty(),
    body('email','Enter valid email').isEmail(),
    body('password','password must be at least 5 characters').isLength({min : 8})
  ], async (req, res)=>{
    //validation
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  try{
    //get user from database if exsits duplicate entry
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error : "duplicate user exists! try another email"})
    } 

    //create secure password by hashing
    const salt = await bcrypt.genSalt(10)
    secPassword = await bcrypt.hash(req.body.password, salt)

    //save new user details into database 
    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : secPassword
    })  
    //create payload for making of authtoken
    const data = {
      user : {
        id : user.id
      }
    }
    //set authentication token
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({authToken})
  }catch(err){
    res.status(500).send("someting went wrong!")
    console.log(err.message)
  }
  
})

//This router is for login
router.post('/loginuser',
  [
    body('email','Enter valid email').isEmail(),
    body('password','password must be at least 5 characters').isLength({min : 8})
  ] , async (req, res) =>{
    //check validation
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  let success = false;
  const {email, password} = req.body;

  try{
    //check user exist ito database or not
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error : "check your email please enter correct email"});
    }
    //check password into database by hashing
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error : "check your password please enter correct password"});
    }else{
      success = true;
    }

    //create payload for set authtoken
    const payload = {
      user : {
        id : user.id
      }
    }
    //set authentication token
    const authToken = jwt.sign(payload, JWT_SECRET)
    res.json({success, authToken})
    

  }catch(err){
    res.status(500).send("someting went wrong!")
    console.log(err.message)
  }

})

router.post('/getuser', fetchuser, async (req, res) =>{
  //console.log(req.user.id)
  try{
    userId = req.user.id;
    //get user from database by id
    const user = await User.findById(userId).select("-password")
    res.send({user});
  }catch(err){
    res.status(500).send("someting went wrong!")
    console.log(err.message)
  }

})

module.exports = router