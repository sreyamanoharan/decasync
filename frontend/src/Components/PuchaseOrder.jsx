import axios from '../axios';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; 

export const PurchaseOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/purchase/Allorders').then(res => {
            setOrders(res.data);
        });
    }, []);

 
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(orders);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Purchase Orders');
        XLSX.writeFile(wb, 'PurchaseOrders.xlsx');
    };

   
    const printOrders = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Purchase Orders</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Your Purchase Orders</h1>');
        printWindow.document.write('<ul>');
        orders.forEach(order => {
            printWindow.document.write(`<li>Order No.: ${order.orderNo}</li>`);
            printWindow.document.write(`<li>Order Date: ${order.orderDate}</li>`);
            printWindow.document.write(`<li>Quantity: ${order.quantity}</li>`);
            printWindow.document.write(`<li>Discount: ${order.discount}</li>`);
            printWindow.document.write(`<li>Total Amount: ${order.itemTotal}</li>`);
            printWindow.document.write(`<li>Net Amount: ${order.netAmount}</li>`);
            printWindow.document.write('<hr>');
        });
        printWindow.document.write('</ul>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div>
            <p>Your Purchase Orders</p>
            <button onClick={exportToExcel}>Export to Excel</button>
            <button onClick={printOrders}>Print Purchase Orders</button>
            <div>
                {orders.map(order => (
                    <div key={order.orderNo}>
                        <li>Order No.: {order.orderNo}</li>
                        <li>Order Date: {order.orderDate}</li>
                        <li>Quantity: {order.quantity}</li>
                        <li>Supplier Name:{order.supplierName}</li>
                        <li>Discount: {order.discount}</li>
                        <li>Total Amount: {order.itemTotal}</li>
                        <li>Net Amount: {order.netAmount}</li>
                    </div>
                ))}
            </div>
        </div>
    );
};
