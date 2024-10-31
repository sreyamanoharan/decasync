import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
  orderNo:{
    type: String,
    unique: true,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  supplierName: {
    type: String,
    required: true
  },
  itemTotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  netAmount: {
    type: Number,
    required: true
  },
  quantity: {
    type:Number,
    required:true
  }
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
export default PurchaseOrder
