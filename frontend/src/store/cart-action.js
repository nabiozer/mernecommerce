
import {cartActions} from './cart-slice'


export const addItemHandler =(id,qty) => {
    return async (dispatch,getState) => {
        const fetchData = async () => {
            const response = await fetch(
                `/api/products/${id}`
            );


            if (!response.ok) {
                throw new Error('Could not fetch product data!');
              }
        
              const data = await response.json();
        
              return data;


        }


        try {
            
            const data = await fetchData();
            dispatch(cartActions.addItemToCart({
                product:data._id,
                name:data.name,
                image:data.image,
                price: data.price,
                countInStock:data.countInStock,
                qty
            }))

            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

        } catch (error) {
            
        }
    }
}

export const removeFromCart = (id) => (dispatch,getState) => {
    dispatch(cartActions.removeItemFromCart(id));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAdressHandler = (data) => (dispatch) => {
    dispatch(cartActions.saveShippingAdress(data));

    localStorage.setItem('shippingAdress', JSON.stringify(data))
}

export const savePaymentMethodHandler = (data) => (dispatch) => {
    dispatch(cartActions.savePaymentMethod(data));

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}



