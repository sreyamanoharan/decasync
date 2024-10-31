import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Cloudinary } from "cloudinary-core";
import { useNavigate } from 'react-router-dom';

const ItemComponent = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState({
    name: '',
    inventoryLocation: '',
    brand: '',
    category: '',
    supplier: '',
    unitPrice: '',
    stockUnit: '',  
    images: [],
    status: 'Enabled'
  });

const navigate=useNavigate()

  const stockOptions = Array.from({ length: 100 }, (_, i) => i + 1); 

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data } = await axios.get("/active");
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mktlnq4w");

      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload`,
          formData
        );
        uploadedImages.push(data.secure_url);
      } catch (error) {
        console.error("Cloudinary upload error:", error);
      }
    }
    setItems((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/item/addItem", items);
    navigate('/')
  };

  return (
    <div>
      <p>Add Your Items</p>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" onChange={handleChange} required />
        <input name="inventoryLocation" placeholder="Inventory Location" onChange={handleChange} />
        <input name="brand" placeholder="Brand" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <select name="supplier" onChange={handleChange} required>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.name}
            </option>
          ))}
        </select>

      
        <select name="stockUnit" onChange={handleChange} required>
          <option value="">Select Stock Quantity</option>
          {stockOptions.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>

        <input type="number" name="unitPrice" placeholder="Unit Price" onChange={handleChange} required />
        
        <input type="file" onChange={handleImageUpload} multiple />

        <select name="status" onChange={handleChange}>
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
        
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default ItemComponent;
