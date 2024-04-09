import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS} from "../Utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles]= useState([])

    const [cart, setCart]=useState([])

    useEffect(()=>{
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },[])

    // load cart from local storage
    useEffect(()=>{
        console.log('call the useEffect', bottles.length)
        if(bottles.length){
        const storeCard = getStoredCart();
        console.log(storeCard, bottles);
        const saveCart = [];
        for(const id of storeCard){
            console.log(id);
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                saveCart.push(bottle)
            }
        }
        console.log('save cart',saveCart)
        setCart(saveCart)
        }

    },[bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle]
        setCart(newCart)
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id =>{
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart)
        removeFromLS(id)
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>



          <div className="bottle-container">
            {
                bottles.map(bottle=> <Bottle key={bottle.id} bottle={bottle}
                    handleAddToCart={handleAddToCart}
                ></Bottle>)
            }
          </div>
        </div>
    );
};

export default Bottles;