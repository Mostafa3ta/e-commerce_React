import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();

export default function CartContextProvider(props) {

    let headers = { 'Content-Type': 'application/json' }

    const [UserId, setUserId] = useState([]);

    const NewCart = [];
    let Counter = -1;


    function getLoggedCart() {
        return axios.get(`https://dummyjson.com/carts/1`)
            .then((response) => response)
            .catch((err) => err)
    }


    function updateCartProducts(id) {
        return axios.put(`https://dummyjson.com/carts/1`,
            { merge: true, products: [{ id: id, quantity: 1 },] },
            { headers })
            .then((response) => response)
            .catch((err) => err)
    }

    function cartProductQuantity(id, quantity) {
        return axios.put(`https://dummyjson.com/carts/1`,
            { merge: true, products: [{ id: id, quantity: quantity },] },
            { headers })
            .then((response) => response)
            .catch((err) => err)

    }

    function deleteCart(id) {
        return axios.delete(`https://dummyjson.com/carts/1`)
            .then((response) => response)
            .catch((err) => err)
    }

    function addCart(id) {
        return axios.post(`https://dummyjson.com/carts/add`,
            { userId: 1, products: [{ id: id, quantity: 1 }] },
            { headers })
            .then((response) => NewCart.push(response.data.products[0]))
            .then(localStorage.setItem('newCart', JSON.stringify(NewCart)))
            .then(Counter++)
            .then((localStorage.setItem('CartCount', JSON.stringify(Counter))))
            .then(console.log(NewCart))
    }


    return <CartContext.Provider value={{ getLoggedCart, updateCartProducts, deleteCart, cartProductQuantity, headers, NewCart, addCart, Counter }}>
        {props.children}
    </CartContext.Provider>
}
