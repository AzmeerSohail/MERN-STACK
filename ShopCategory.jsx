/*import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

export const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
          <img className="shopcategory-banner" src={props.banner} alt="" />
          <div className="shopcategory-indexSort">
            <p>
              <span>Showing 1-12</span> out of 48 products
            </p>
            <div className="shopcategory-sort">
              Sort by <img src={dropdown_icon} alt="" />
            </div>
          </div>

          <div className="shopcategory-products">
            {all_product.map((item,i)=>{
              if (props.category===item.category){
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
              }
              else {
                return null;
              }
            })}
          </div>
          <div className="shopcategory-loadmore">
            EXPLORE MORE
          </div>
    </div>
  )
}*/
import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState('lowest'); // State to track sorting order
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const productsPerPage = 12; // Number of products to display per page

  // Function to handle sorting by price
  const sortProducts = (products, order) => {
    const sortedProducts = [...products];
    if (order === 'lowest') {
      sortedProducts.sort((a, b) => a.new_price - b.new_price);
    } else {
      sortedProducts.sort((a, b) => b.new_price - a.new_price);
    }
    return sortedProducts;
  };

  // Get products for the current category
  const filteredProducts = all_product.filter(item => item.category === props.category);

  // Get products to display on the current page
  const displayedProducts = sortProducts(filteredProducts, sortOrder).slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='shop-category'>
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {productsPerPage * (currentPage - 1) + 1}-{Math.min(productsPerPage * currentPage, filteredProducts.length)}</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by 
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="lowest">Price: Lowest to Highest</option>
            <option value="highest">Price: Highest to Lowest</option>
          </select>
          <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {displayedProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} description={item.description} />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>}
        {currentPage < Math.ceil(filteredProducts.length / productsPerPage) && <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>}
      </div>
    </div>
  );
};
