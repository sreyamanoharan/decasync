import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  itemNo: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  inventoryLocation: {
    type: String
  },
  brand: {
    type: String
  },
  category: {
    type: String
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  stockUnit: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  images: [{ type: String }],
  status: {
    type: String,
    enum: ['Enabled', 'Disabled'],
    default: 'Enabled'
  },
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;
