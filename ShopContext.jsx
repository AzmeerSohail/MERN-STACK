import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

/*const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        const[index] = 0;
    }

    return cart;
 }*/

 const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{

         const [all_product, setAll_product] = useState([]);
         const [cartItems,setCartItems] = useState(getDefaultCart()); 

         useEffect(()=>{
            fetch('http://localhost:4000/allproducts')
            .then((response)=>response.json())
            .then((data)=>setAll_product(data))

            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:4000/getcart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',

                    },
                    body:"",
                }).then((response)=>response.json())
                .then((data)=>setCartItems(data));
            }
         }, [])

         const addToCart = (itemId,size) => {
            setCartItems((prev) => {
                const currentQuantity = prev[itemId] || 0;
                return {
                    ...prev,
                    [itemId]: currentQuantity + 1,
                    size: size,
                };
            });
        
            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/addtocart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId,size }),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.error('Error:', error));
            }
        };
        
                

         const removeFromCart = (itemId) =>{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}));
            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:4000/removefromcart',{
                    method: 'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({"itemId":itemId}),
                })
               .then((response)=>response.json())
               .then((data)=>console.log(data));
            }
         }

         const getTotalCartAmount = () =>{
            let totalAmount = 0;
            for(const item in cartItems){
                if(cartItems[item] > 0){
                    let itemInfo = all_product.find((product)=>product.id === Number(item));
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
        
            }

            return totalAmount;
        }

        const getTotalCartItems = () =>{
            let totalItem = 0;
            for (const item in cartItems){
                if(cartItems[item]>0){
                    totalItem+= cartItems[item];
                }
            }
            return totalItem;
        }

         const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, cartItems,addToCart,removeFromCart};
         return(
            <ShopContext.Provider value ={contextValue}>
                {props.children}
            </ShopContext.Provider>
         )
}

/*const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = all_product.find((product)=>product.id === Number(item));
            totalAmount += itemInfo.new_price * CartItems[item];
        }

        return totalAmount;
    }
}

const getTotalCartItems = () =>{
    let totalItem = 0;
    for (const item in CartItems){
        if(CartItems[item]>0){
            totalItem+= CartItems[item];
        }
    }
    return totalItem;
}*/

export default ShopContextProvider;