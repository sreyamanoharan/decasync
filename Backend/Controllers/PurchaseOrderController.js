import express from 'express';
import PurchaseOrder from '../Models/PuchaseOrderModel.js'
import { v4 as uuidv4 } from "uuid";


export const createOrder=async (req, res) => {
  const {
    orderDate,
    supplierName,
    itemTotal,
    discount,
    netAmount,
    quantity
  } = req.body;

  const orderNo = uuidv4();
  

  try {
    const newOrder = new PurchaseOrder({
      orderNo,
      orderDate,
      supplierName,
      itemTotal,
      discount,
      netAmount,
      quantity
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export const AllOrders = async (req, res) => {
  try {
      const orders = await PurchaseOrder.find().sort({ orderDate: -1 });
      
      res.status(200).json(orders);
  } catch (error) {
      console.error( error);
      res.status(500).json({ error: 'Server error' });
  }
};


