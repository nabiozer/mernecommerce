import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
    name: 'product',
    initialState: { 
        products:[],
        isLoading:false,
        error:null,
        newProduct:{},
        success:false
     },
    reducers: {
        productListRequest(state) {
            state.isLoading = true;
            state.products= [];
        },
        productListSucces(state,action) {
            state.isLoading= false;
            state.products= action.payload;
        },
        productListFail(state,action) {
            state.isLoading=false;
            state.error=action.payload;
        },
        productCreateRequest(state) {
            state.isLoading = true;
           
        },
        productCreateSucces(state,action) {
            state.isLoading= false;
            state.success = true;
            state.newProduct= action.payload;
        },
        productCreateFail(state,action) {
            state.isLoading=false;
            state.error=action.payload;
        },
        productCreateReset(state) {
            state.newProduct= null;
            state.success = false;
        }
        
    },
  });
  
  export const productActions = productSlice.actions;
  
  export default productSlice;