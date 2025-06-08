import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx'

function App() {

  function addToCart(prod){

    let cartObj = window.localStorage.getItem("ebizcart");
    if(cartObj != null && cartObj != undefined)
    {
      cartObj = JSON.parse(cartObj);
    }
    else
    {
      cartObj = [];
    }

    let exists = false;

    for(let i = 0; i < cartObj.length; i++)
    {
      if(cartObj[i].ID == prod.ID)
      {
        exists = true;
        cartObj[i].Quantity = cartObj[i].Quantity+1;
      }
      
    }

    if(!exists)
    {
      prod.Quantity = 1;
      cartObj.push(prod);
    }

    window.localStorage.setItem("ebizcart", JSON.stringify(cartObj))

  }

  function removeFromCart(prod){

    let cartObj = window.localStorage.getItem("ebizcart");
    if(cartObj != null && cartObj != undefined)
    {
      cartObj = JSON.parse(cartObj);
    }
    else
    {
      cartObj = [];
    }

    let exists = false;

    for(let i = 0; i < cartObj.length; i++)
    {
      if(cartObj[i].ID == prod.ID)
      {
        exists = true;
        cartObj[i].Quantity = cartObj[i].Quantity-1;
        console.log("here");
        console.log(cartObj);
        if(cartObj[i].Quantity == 0)
        {
          cartObj.splice(i,1);
        }
      }
      
    }

    window.localStorage.setItem("ebizcart", JSON.stringify(cartObj))

  }

  function clearCart(){
    window.localStorage.setItem("ebizcart", JSON.stringify([]))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products addToCart={addToCart}/>} />
        <Route path='/cart' element={<Cart clearCart={clearCart} removeFromCart={removeFromCart}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
