const express = require('express');
const mongoose = require('mongoose'); 
const blogRoutes = require('./routes/blogRoutes');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then((res)=>{
        console.log("Connected to MongoDB successfully");
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB:", err);
    });
    

app.get("/",(req,res)=>{
    res.send("Welcome to the backend server!");
});


const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

