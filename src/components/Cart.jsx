import { useState, useEffect } from 'react'
import './Cart.css'
import Navbar from './Navbar';
import Payment from './Payment'; 
import "./Basic.css"

function Cart({removeFromCart, clearCart}){

    const [cartList, setCartList] = useState([]);
    const [paymentsPopup, setPaymentsPopup] = useState(false);

    const updateCart = async () => {
    
        let cartObj = window.localStorage.getItem("ebizcart");
        if(cartObj != null && cartObj != undefined)
        {
            cartObj = JSON.parse(cartObj);
        }
        else
        {
            cartObj = [];
        }
    
        setCartList(cartObj);
    
    }

    const clearCartPass = () => {
        clearCart();
        updateCart();
    }

    useEffect(() => {
        updateCart();
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <div className='contentContainer'>
                <div className='cartProductsList'>
                    {cartList.map(prod => 
                        <div className='cartProductContainer'>
                            <div className='cartProductName'>{prod.Name}</div>
                            <div className='cartProductQuantity'>{prod.Quantity}</div>
                            <div className='cartProductPrice'>{prod.Price}</div>
                            <button className='cartProductRemove' onClick={() => {removeFromCart(prod);updateCart();}}>X</button>
                        </div>
                    )}
                </div>
                <div className='cartTotalContainer'>
                    <div className='cartTotalLabel'>Total</div>
                    <div className='cartTotalValue'>{cartList.reduce((accumulator, currentValue) => accumulator + currentValue.Price*currentValue.Quantity,0)}</div>
                </div>
                <div className='cartPurchaseContainer'>
                    <button className='cartPurchaseBtn' onClick={() => setPaymentsPopup(true)}>Purchase</button>
                </div>
            </div>
            {paymentsPopup ? <Payment cartList={cartList} clearCart={clearCartPass} updateCart={updateCart} setPaymentsPopup={setPaymentsPopup} total={cartList.reduce((accumulator, currentValue) => accumulator + currentValue.Price*currentValue.Quantity,0)}></Payment> : <></>}
        </>
    );

}

export default Cart;