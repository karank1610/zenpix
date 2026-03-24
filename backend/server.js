const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const collectionRoutes = require("./routes/collectionRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/collections",collectionRoutes);

app.get("/", (req, res) => {
    res.send("hello");
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.listen(5000, () => {
    console.log("server running on port 5000~");

})