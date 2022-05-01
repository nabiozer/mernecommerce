import { createSlice } from '@reduxjs/toolkit';


const orderSlice = createSlice({
   name:'order',
   initialState: {
        loading:false,
        succes:false,
        orderCreate:{},
        givenOrder:{
           
            
        },
        orders:[],
        error:null
   },
   reducers:{
        orderCreateRequest(state) {
            state.loading = true;
        },
        orderCreateSucces(state,action) {
            state.loading = false;
            state.succes = true;
            state.orderCreate = action.payload;

        },
        orderCreateFail(state,action) {
            state.loading = false;
            state.error = action.payload;

        },

        orderDetailsRequest(state) {
            state.givenOrder.loading = true;
        },
        orderDetailsSucces(state,action) {
            state.loading = false;
            state.givenOrder = action.payload;

        },
        orderDetailsFail(state,action) {
            state.loading = false;
            state.error = action.payload;

        },


        orderPayRequest(state) {
            state.givenOrder.loading = true;
        },
        orderPaySucces(state,action) {
            state.loading = false;
            state.succes = true;

        },
        orderPayFail(state,action) {
            state.loading = false;
            state.error = action.payload;

        },
        orderPayReset(state,action) {
            state.loading = false;
         

        },

        orderListRequest(state) {
            state.loading = true;
        },
        orderListSucces(state,action) {
            state.loading = false;
            state.orders = action.payload;

        },
        orderListFail(state,action) {
            state.loading = false;
            state.error = action.payload;

        },

    }
});


export const orderActions = orderSlice.actions;
export default orderSlice;