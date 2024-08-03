import React from 'react'
import './Admin.css'
import { Route, Routes } from 'react-router-dom'
import Addproduct from '../../Components/AddProduct/AddProduct'
import Listproduct from '../../Components/ListProduct/ListProduct'
import Sidebar from '../../Components/Sidebar/Sidebar'

export const Admin = () => {
  return (
    <div className='admin'>
         
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<Addproduct/>}/>
            <Route path='/listproduct' element={<Listproduct/>}/>
           
        </Routes>

    </div>
  )
}
