import express, { Router } from "express";
const itemRouter = express.Router();
import {createItem,getUniqueItemDetails,getAllItems}  from '../Controllers/ItemController.js'


itemRouter.post('/addItem',createItem)
itemRouter.get('/getItem',getAllItems)
itemRouter.get('/getItemsByName/:itemName',getUniqueItemDetails)


export default itemRouter;