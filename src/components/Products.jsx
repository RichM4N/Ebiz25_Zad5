import { useState, useEffect} from 'react'
import './Products.css'
import Navbar from './Navbar'
import "./Basic.css"

function Products({addToCart}){

    const [productList, setProductList] = useState([])

    const updateProducts = async () => {

        let response = await fetch('/getProducts',{
            method: 'GET'
        });

        let body = await response.json();

        console.log(body);

        setProductList(body);

    }

    useEffect(() => {
        updateProducts();
    }, []);

    

    return(
        <>
            <Navbar></Navbar>
            <div className='contentContainer'>
                {productList.map((prod) => 
                    <div className='productContainer'>
                        <div className='productNameContainer'>{prod.Name}</div>
                        <div className='productPriceContainer'>{prod.Price}</div>
                        <button className='productAddToCartBtn' onClick={() => addToCart(prod)}>Add to cart</button>
                    </div>
                )}
            </div>
        </>
    );

}

export default Products