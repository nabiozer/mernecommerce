import {configureStore} from '@reduxjs/toolkit';
import productSlice from './product-slice';
import productDetailSlice from './productdetail-slice';
import userSlice from './user-slice';
import cartSlice from './cart-slice';
import orderSlice from './order-slice';



const store = configureStore({
    reducer: {
        product: productSlice.reducer, 
        productDetail: productDetailSlice.reducer ,
        cart: cartSlice.reducer ,
        user: userSlice.reducer,
        order :orderSlice.reducer,
    }
})



export default store;