import { useState } from 'react'
import './Payment.css'

function Payment({cartList, total, clearCart, setPaymentsPopup}){

    async function placeOrder(){

        let response = await fetch('/placeOrder',{
            method: 'POST',
            body: JSON.stringify(cartList),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let body = await response.json();

        console.log(body);

        if(body.Success == true){
            console.log("Clear cart, hide popup, update cartlist")
            clearCart();
            setPaymentsPopup(false);
        }
        else
        {
            console.log("Error")
        }

    }

    return(
        <div className='paymentOverlay'>
            <div className='paymentContainer'>
                <div className='paymentMessage'>
                    Confirm total payment of {total}?
                </div>
                <div className='paymentDecisionContainer'>
                    <button className='paymentDecisionBtn' onClick={() => placeOrder()}>Yes</button>
                    <button className='paymentDecisionBtn' onClick={() => setPaymentsPopup(false)}>No</button>
                </div>
            </div>
        </div>
    );

}

export default Payment