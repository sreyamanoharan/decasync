import express, { Router } from "express";
const SupplierRouter = express.Router();
import {createSupplier, getActiveSuppliers}from '../Controllers/SupplierController.js'

SupplierRouter.post('/suppliers',createSupplier)
SupplierRouter.get('/active',getActiveSuppliers)

export default SupplierRouter;