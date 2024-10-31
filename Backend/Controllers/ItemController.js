import Item from '../Models/ItemModel.js'
import Supplier from "../Models/SupplierModel.js";
import { v4 as uuidv4 } from "uuid";


export const createItem = async (req, res) =>{
  try {
    const {
      name,
      inventoryLocation,
      brand,
      category,
      supplier,
      stockUnit,
      unitPrice,
      images,
      status,
    } = req.body;

   
    const itemNo = uuidv4()


    const newItem = new Item({
      itemNo,
      name,
      inventoryLocation,
      brand,
      category,
      supplier,
      stockUnit,
      unitPrice,
      images, 
      status: status || 'Enabled',
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error creating item' });
  }
};





export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('supplier', 'name status');
   
    
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUniqueItemDetails = async (req, res) => {
  try {
    const { itemName } = req.params;

    


    const items = await Item.find({ name: itemName })
      .populate('supplier') 
      .exec();

    console.log("Items with populated suppliers:", items);

  
    const filteredItems = items.filter((item) => item.supplier !== null);

    res.status(200).json(filteredItems);

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


