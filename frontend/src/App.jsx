
import SupplierComponent from './Components/SupplierComponent'
import ItemComponent from './Components/ItemComponent'
import { PurchaseOrder } from './Components/PuchaseOrder'
import Home from './Components/Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/item' element={<ItemComponent/>}/>
        <Route path='/supplier' element={<SupplierComponent/>}/>
        <Route path='/purchase' element={<PurchaseOrder/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
