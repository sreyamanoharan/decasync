import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ItemSelection = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [itemDetails, setItemDetails] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [orderQty, setOrderQty] = useState(0);
    const [itemAmount, setItemAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');


    const navigate=useNavigate()

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/item/getItem');
                const uniqueItems = [...new Set(response.data.map((item) => item.name))];
                setItems(uniqueItems);
            } catch (error) {
                console.error(error);
            }
        };
        fetchItems();
    }, []);


    useEffect(() => {
        const fetchItemDetails = async () => {
            if (selectedItem) {
                try {
                    const response = await axios.get(`/item/getItemsByName/${selectedItem}`);
                    setItemDetails(response.data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setItemDetails([]);
            }
        };
        fetchItemDetails();
    }, [selectedItem]);


    useEffect(() => {
        if (selectedCategory) {
            const brands = itemDetails
                .filter((item) => item.category === selectedCategory)
                .map((item) => item.brand);
            setFilteredBrands([...new Set(brands)]);

            const suppliers = itemDetails
                .filter((item) => item.category === selectedCategory)
                .map((item) => item.supplier?.name);
            setFilteredSuppliers([...new Set(suppliers)]);
        } else {
            setFilteredBrands([]);
            setFilteredSuppliers([]);
        }
    }, [selectedCategory, itemDetails]);


    useEffect(() => {
        const totalAmount = orderQty * (itemDetails[0]?.unitPrice || 0);
        setItemAmount(totalAmount);
        setNetAmount(totalAmount - discount);


        if (orderQty > itemDetails[0]?.stockUnit) {
            setErrorMessage(`Not this much quantity available. Maximum available: ${itemDetails[0]?.stockUnit}`);
        } else {
            setErrorMessage('');
        }
    }, [orderQty, discount, itemDetails]);


    const allSelectionsMade = selectedCategory && selectedBrand && selectedSupplier;

    const handlePurchase = async () => {
        try {
            const purchaseData = {
                item: selectedItem,
                quantity: orderQty,
                itemTotal: itemAmount,
                discount,
                netAmount,
                supplierName: selectedSupplier,
                orderDate: new Date().toISOString(),
            };

            const response = await axios.post('/purchase/orders', purchaseData);
            console.log(response.data);

        } catch (error) {
            console.error( error);
        }
      navigate('/purchase')

    };

    return (
        <div>
            <div>
                <Link to={'/item'}>
                <button>Add Items</button>
                </Link>
               <Link to={'/supplier'}>
               <button>Add Supplier</button>
               </Link>
              <Link to={'/purchase'}>
              <button>Your Orders</button>
              </Link>
              
            </div>
            <h1>Select an Item</h1>
            <select onChange={(e) => setSelectedItem(e.target.value)} value={selectedItem}>
                <option value="">Select an Item</option>
                {items.map((itemName, index) => (
                    <option key={index} value={itemName}>
                        {itemName}
                    </option>
                ))}
            </select>

            {selectedItem && (
                <div>
                    <h2>Select Details for {selectedItem}</h2>

                    <div>
                        <label>Category:</label>
                        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                            <option value="">Select a Category</option>
                            {Array.from(new Set(itemDetails.map((item) => item.category))).map(
                                (category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label>Brand:</label>
                        <select
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            value={selectedBrand}
                            disabled={!filteredBrands.length}
                        >
                            <option value="">--Select a Brand--</option>
                            {filteredBrands.map((brand, index) => (
                                <option key={index} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Supplier:</label>
                        <select
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            value={selectedSupplier}
                            disabled={!filteredSuppliers.length}
                        >
                            <option value="">--Select a Supplier--</option>
                            {filteredSuppliers.map((supplier, index) => (
                                <option key={index} value={supplier}>
                                    {supplier}
                                </option>
                            ))}
                        </select>
                    </div>

                    {allSelectionsMade && (
                        <div>
                            <h2>Details for {selectedItem}</h2>

                            <div>
                                <label>Item No:</label>
                                <span>{itemDetails[0]?.itemNo}</span>
                            </div>

                            <div>
                                <label>Item Name:</label>
                                <span>{itemDetails[0]?.name}</span>
                            </div>

                            <div>
                                <label>Stock Unit:</label>
                                <span>{itemDetails[0]?.stockUnit}</span>
                            </div>

                            <div>
                                <label>Unit Price:</label>
                                <span>{itemDetails[0]?.unitPrice}</span>
                            </div>

                            <div>
                                <label>Order Qty:</label>
                                <input
                                    type="number"
                                    value={orderQty}
                                    onChange={(e) => setOrderQty(Number(e.target.value))}
                                />
                            </div>
                            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                            <div>
                                <label>Item Amount:</label>
                                <span>{itemAmount}</span>
                            </div>

                            <div>
                                <label>Discount:</label>
                                <input
                                    type="number"
                                    value={discount}
                                   
                                />
                            </div>

                            <div>
                                <label>Net Amount:</label>
                                <span>{netAmount}</span>
                            </div>
                    

                                <button onClick={handlePurchase} style={{ marginTop: '10px' }}>
                                    Purchase Now
                                </button>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ItemSelection;
