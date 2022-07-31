const { urlencoded } = require('express');
const express = require('express')
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSecret = PUT_YOUR_SECRET_HERE;
const fetchUserId = require('../Middleware/fetchUserId');
router.post('/createuser', [body('email', 'Enter a valid email').isEmail(), body('username', 'Username must be atleast 3 characters long').isLength({ min: 3 }), body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 }), body('password', ' Password must be atleast 5 characters long').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            let e = errors.array();
            return res.status(400).json({ success, error: e[0].msg });
        }
        try {
            let user = await User.findOne({ username: req.body.username });
            const er = [];
            if (user) {
                er[er.length] = 'Username already exists. Please choose a different Username';
            }
            user = await User.findOne({ email: req.body.email });
            if (user) {
                er[er.length] = 'Email already exists. Please provide a different Email';
            }
            if (er.length) {
                return res.status(400).json({ success,error: er[0] });
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
            const token = jwt.sign(data, JWTSecret);
            success = true;
            res.status(200).json({success, token});
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({success, error:'Interanl Server Error'});
        }
    });
router.post('/login', [body('username', 'Invalid Username').isLength({ min: 3 }), body('password', ' Password cannot be blank').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array()[0] });
        }
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success, error: 'Invalid Username/Password' });
        }
        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({success, error: 'Invalid Username/Password' });
            }
            const data = {
                user: user.id
            }
            const token = jwt.sign(data, JWTSecret)
            success = true;
            res.status(200).json({success,token});
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({success, error:'Interanl Server Error'});
        }
    });
router.get('/getuser', fetchUserId, async (req, res) => {
    let success = false;
    try {
        let userId = req.user;
        const user = await User.findById(userId).select("-password");
        success = true;
        res.json({success, user});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({success, user:'Interanl Server Error'});
    }
})
module.exports = router;
