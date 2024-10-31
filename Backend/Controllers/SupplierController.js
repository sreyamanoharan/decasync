import Supplier from "../Models/SupplierModel.js";
import { v4 as uuidv4 } from "uuid";

export const createSupplier = async (req, res) => {
  try {
    const { name, address, taxNo, country, mobileNo, email, status } = req.body;
    
   
    const supplierNo = uuidv4();
    const supplier = new Supplier({
      supplierNo,
      name,
      address,
      taxNo,
      country,
      mobileNo,
      email,
      status: status || "Active",
    });

    await supplier.save();

    res.status(201).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getActiveSuppliers = async (req, res) => {
    try {
      const suppliers = await Supplier.find({ status: "Active" });
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


    
 