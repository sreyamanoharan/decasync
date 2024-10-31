import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierNo: {
        type: String, 
        unique: true, 
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    taxNo: {
        type: String
    },
    country: {
        type: String
    },
    mobileNo: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Blocked"],
        default: "Active"
    }
});


const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;