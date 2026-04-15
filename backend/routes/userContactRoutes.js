const express = require('express');
const router = express.Router();
const UserContact = require('../models/UserContact');

router.post("/", async (req, res) => {
    try {
        const { name, email, companySize, subject, message } = req.body;
        const newContact = new UserContact({
            name, email, companySize, subject, message
        });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;