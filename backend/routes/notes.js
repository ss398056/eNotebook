const express = require('express')
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Get all the notes
router.get('/getallnotes', fetchuser, async (req, res)=>{
    try{
        //get all notes by user
        const notes = await Notes.find({user : req.user.id})
        res.json({notes});
        //console.log(notes)
    }catch(err){
        res.status(500).send("someting went wrong!")
        console.log(err.message)
    }
})

//Add the notes
router.post('/addnote', fetchuser, [body('title', 'title should be at least 3 characters').isLength({min : 3})], async (req, res)=>{
    console.log(req.body.title)
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const {title, description, tag} = req.body;
    
    try{
        //create new note 
        const note = new Notes({
            title , description, tag, user : req.user.id
        })
        //save create note into database
        const savenote = await note.save();
        res.send(savenote);
    }catch(err){
        res.status(500).send("someting went wrong!")
        console.log(err.message)
    }
})

//Update the note by id
router.put('/updatenote/:id', fetchuser, [body('title', 'title should be at least 3 characters').isLength({min : 3})], async (req, res)=>{
    //console.log(req.body.title)
    //Checking validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const {title, description, tag} = req.body;
    try{
        //create new note for set values given by user
        const note = {};
        note.title = title
        note.description = description
        note.tag = tag

        //Checking data from database it is exists or not
        let dbnote = await Notes.findById(req.params.id);
        if(!dbnote){
            res.status(404).send({ error: 'Note not found' })
        }else{
            //check user authentication
            if(dbnote.user.toString() !== req.user.id){
                res.status(401).send({ error: 'Unauthorized: Access denied' })
            }
            //update note to new values
            dbnote = await Notes.findByIdAndUpdate(req.params.id, {$set: note}, {new:true});
            res.send(dbnote);
        }
        
    }catch(err){
        res.status(500).send("someting went wrong!")
        console.log(err.message)
    }
})

//Delete the note by id
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    
    try{
        //Checking data from database it is exists or not
        let dbnote = await Notes.findById(req.params.id);
        if(!dbnote){
            res.status(404).send({ error: 'Note not found' })
        }else{
            //Checking user authentication
            if(dbnote.user.toString() !== req.user.id){
                res.status(401).send({ error: 'Unauthorized: Access denied' })
            }
            //delete or deleted note by id
            dbnote = await Notes.findByIdAndDelete(req.params.id);
            res.send({sucess : "note has been deleted",dbnote});
        } 
        
    }catch(err){
        res.status(500).send("someting went wrong!")
        console.log(err.message)
    }
})

module.exports = router