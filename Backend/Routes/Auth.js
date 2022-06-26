const { urlencoded } = require('express');
const express = require('express')
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/createuser', body('email','Enter a valid email').isEmail(), body('username', 'Username must be atleast 3 characters long').isLength({ min: 3 }), body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 }), body('password',' Password must be atleast 5 characters long').isLength({ min: 5 }), 
async (req, res) => {
    const errors = validationResult(req);
    const JWTSecret = '@#$!(jt8D%FdFDdj8?::"hn@jfd8(*';
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.findOne({username:req.body.username});
    const er = [];
    if (user)
    {
        er[er.length] = 'Username already exists. Please choose a different Username';
    }
    user = await User.findOne({email:req.body.email});
    if (user)
    {
        er[er.length] = 'Email already exists. Please provide a different Email';
    }
    if (er.length)
    {
        return res.status(400).json({errors: er});
    }
    const salt = await bcrypt.genSalt(10);
    const securepassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: securepassword,
        email: req.body.email
    })
    const data = {
        user: user.id
    }
    const token = jwt.sign(data,JWTSecret)
    res.status(200).json(token);
    }
    catch{
        res.status(500).send('Something went wrong. Please try again');
    }
})
module.exports = router