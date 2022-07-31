const express = require('express');
const fetchUserId = require('../Middleware/fetchUserId');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../Models/Notes');

router.post('/addnotes', fetchUserId, [
    body('title', 'Title should be atleast 3 characters long').isLength({ min: 3 }),
    body('description', 'Description should be atleast 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, error: errors.array()[0] });
        }
        const {title, description} = req.body;
        let tag = req.body.tag;
        if (tag === '')
        {
            tag = 'General';
        }
        const note = new Notes({title,description, tag,user:req.user});
        const saved = await note.save();
        success = true;
        res.json({success, saved});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({success, error:'Interanl Server Error'});
    }
});

router.get('/getnotes', fetchUserId, async (req, res) => {
    let success = false;
    try {
        const notes = await Notes.find({user:req.user});
        success = true;
        res.json({success, notes});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({success, error:'Interanl Server Error'});
    }
});

router.put('/updatenotes/:id', [
    body('title', 'Title should be atleast 3 characters long').isLength({ min: 3 }),
    body('description', 'Description should be atleast 5 characters long').isLength({ min: 5 })
],fetchUserId, async (req, res) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array()[0] });
        }
        const notesid = req.params.id;
        if (!notesid)
        {
            return res.status(404).json({success, error:'Not Found'});
        }
        let notes = await Notes.findById(notesid);
        if (req.user !== notes.user.toString())
        {
            return res.status(401).json({success, error:'Invalid Authentication'});
        }
        notes = {};
        const {title, description} = req.body;
        let tag = req.body.tag;
        if (title)
        {
            notes.title = title;
        }
        if (description)
        {
            notes.description = description;
        }
        if (tag)
        {
            notes.tag = tag;
        }
        else
        {
            notes.tag = "General";
        }
        notes = await Notes.findByIdAndUpdate(notesid,{$set: notes}, {new:true});
        success = true;
        res.status(200).json({success, notes});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({success, error:'Internal Server Error'});
    }
});

router.delete('/deletenotes/:id', fetchUserId, async (req, res) => {
    let success = false;
    try {
        const notesid = req.params.id;
        if (!notesid)
        {
            return res.status(404).json({success, error:'Not Found'});
        }
        let notes = await Notes.findById(notesid);
        if (!notes)
        {
            return res.status(404).json({success, error:'Not Found'});
        }
        if (req.user !== notes.user.toString())
        {
            return res.status(401).json({success, error:'Invalid Authentication'});
        }
        notes = await Notes.findByIdAndDelete(notesid);
        success = true;
        res.json({success,notes});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({success, error:'Interanl Server Error'});
    }
});

module.exports = router