import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import SupplierRouter from './Routes/SuppilerRoutes.js';
import itemRouter from './Routes/ItemRoutes.js';
import PurchaseOrderRoute from './Routes/PurchaseOrderRoutes.js';
import dotenv from "dotenv";
dotenv.config();

const app=express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
   methods: ["GET", "POST","PATCH","PUT" ],
   credentials: true,
 }));
 app.use("/", SupplierRouter);
 app.use('/item',itemRouter)
 app.use('/purchase',PurchaseOrderRoute)

const PORT=process.env.PORT


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT} `);
    
})

mongoose.connect('mongodb://localhost:27017/decasync').then(result=>{
    console.log('mongo db connected');
  }).catch(err=>{
    console.log(err);
  });