const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

router.post("/",async (req,res)=>{
    try {
        const { name } = req.body;
        if(!name.trim()){
            return res.status(400).json({
                message:"name is required"
            });
        }
        const newCollection = new Collection({name});
        await newCollection.save();
        res.status(201).json(newCollection);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", async(req,res)=>{
    try {
        const collections = await Collection.find();
        res.json(collections);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

module.exports = router;