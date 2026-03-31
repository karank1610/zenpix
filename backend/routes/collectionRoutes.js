const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.status(400).json({
                message: "name is required"
            });
        }
        const newCollection = new Collection({ name });
        await newCollection.save();
        res.status(201).json(newCollection);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const collections = await Collection.find();
        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id/add-image", async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const collection = await Collection.findById(req.params.id);
        if(!collection){
            return res.status(404).json({message:"Collection not found!"});
        }
        if(!collection.images.includes(imageUrl)){
            collection.images.push(imageUrl);
            await collection.save();
        }
        res.json(collection);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.patch("/:id/remove-image",async (req,res)=>{
    const {imageUrl} = req.body;
    const collection = await Collection.findByIdAndUpdate(
        req.params.id,
        { $pull: {images: imageUrl}},
        {new:true}
    );
    res.json(collection);
})

module.exports = router;