import React, { useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'


const SupplierComponent = () => {

    const [formData,setFormData]=useState({
        name:'',
        address:'',
        taxNo:'',
        country:'',
        mobileNo:'',
        email:'',
        status:'Active'
    })

    const countries = ["India", "USA", "UK"]; 
    const navigate=useNavigate()



    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData,'formdta');
        
      const response = await axios.post("/suppliers", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    navigate('/')
  };

  return (
    <div>
      <p>Register add supplier</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Supplier Name:</label>
        <input type="text" name='name' value={formData.name} onChange={handleChange} />

        <label htmlFor="">Address</label>
        <input type="text" name='address' value={formData.address} onChange={handleChange}/>

        <label htmlFor="">Tax No:</label>
        <input type="text" name='taxNo' value={formData.taxNo} onChange={handleChange} />

        <label htmlFor="">Country</label>
        <select name="country" value={formData.country} onChange={handleChange}>
            {countries.map((country)=>{
                return(
                  <option value={country}>{country}</option>
                )
            })}
        </select>

        <label htmlFor="">Mobile No.:</label>
        <input type="text" name='mobileNo' value={formData.mobileNo} onChange={handleChange} />

        <label htmlFor="">Email:</label>
        <input type="text" name='email' value={formData.email} onChange={handleChange} />

        <label htmlFor="">Status:</label>
        <select type="text" name='status' value={formData.status} onChange={handleChange}>
            <option value="Active">active</option>
            <option value="inctive">inactive</option>
            <option value="Blocked">blocked</option>
        </select>

        <button type='submit'>Add Supplier</button>
      </form>
    </div>
  )
}

export default SupplierComponent