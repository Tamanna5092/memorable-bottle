const getStoredCart = ()=>{
    const storedCartString = localStorage.getItem('cart')
    if(storedCartString){
        return JSON.parse(storedCartString)
    }
    return [];
}

const savaCartLS = cart =>{
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified)
}

const addToLS = id => {
    const cart = getStoredCart();
    cart.push(id)
    savaCartLS(cart)
}

const removeFromLS = id =>{
    const cart = getStoredCart();
    const remaining = cart.filter(idx => idx !== id);
    savaCartLS(remaining)
}
export {addToLS, getStoredCart, removeFromLS}