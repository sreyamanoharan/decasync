import express, { Router } from "express";
const PurchaseOrderRoute = express.Router();
import { createOrder,AllOrders } from "../Controllers/PurchaseOrderController.js";

PurchaseOrderRoute.post('/orders',createOrder)
PurchaseOrderRoute.get('/Allorders',AllOrders)


export default PurchaseOrderRoute