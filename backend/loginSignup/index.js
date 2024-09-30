const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
require('./Models/db')
const AuthRouter=require('./Routes/AuthRouter')
port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("pong");
})
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use('/au',AuthRouter);

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})