import React, { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';
import './AddProduct.css';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
   name: '',
   image: '',
   category: 'women',
   old_price: '',
   new_price: '',
   description: ''
 });

 const imageHandler = (e) => {
   setImage(e.target.files[0]);
 }
 const changeHandler = (e) => {
   setProductDetails({
     ...productDetails,
     [e.target.name]: e.target.value
   })
 }
const addProduct = async() => {
console.log(productDetails);
let responseData;
let product= productDetails;
let formData = new FormData();
 formData.append('product', image);

 await fetch('http://localhost:4000/upload', {
method: 'POST',
headers: {
 'Accept': 'application/json',
},
 body: formData,
}).then((resp) => resp.json()).then((data) => {responseData = data});

if(responseData.success){
 product.image = responseData.image_url;
   console.log(product);
   await fetch('http://localhost:4000/addproduct', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(product),
 }).then((resp) => resp.json()).then((data) => { 
   if(data.success){
     alert('Product added successfully');
   }
   else{
     alert('Product could not be added');
   }
 });

}
}

 return (
   <div className='add-product'>


     <div className='addproduct-itemfield'>
     <p>Product title</p>
     <input value={productDetails.name} onChange={changeHandler} type='text'name='name' placeholder='Type here'/>
     </div>

<div className="addproduct-price">
<div className='addproduct-itemfield'>
     <p>Price</p>
     <input value={productDetails.old_price} onChange={changeHandler} type='text'name='old_price' placeholder='Type here'/>
     </div>
     <div className='addproduct-itemfield'>
     <p>Offer Price</p>
     <input value={productDetails.new_price} onChange={changeHandler} type='text'name='new_price' placeholder='Type here'/>
     </div>
</div>

<div className='addproduct-itemfield'>
     <p>Category</p>
     <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
     <option value="women">Women</option>
     <option value="men">Men</option>
     <option value="kids">Kids</option>
     <option value="accessories">Accessories</option>
     </select>
     </div>
     <div className='addproduct-itemfield'>
     <p>Description</p>
     <input value={productDetails.description} onChange={changeHandler} type='text'name='description' placeholder='Type here'/>
     </div>
     <div className="addproduct-itemfield">
       <label htmlFor="file-input">
         <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
       </label>
       <input onChange={imageHandler} id="file-input" type="file" hidden />
     </div>
     <button onClick={()=>{addProduct()}} className="addproduct-btn">Add Product</button>
   </div>
 )
}


export default AddProduct