import { createSlice } from '@reduxjs/toolkit';


const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: { 
        product:{},
        isLoading:false,
        error:null,
        succes:false
     },
    reducers: {
        productDetailRequest(state) {
            state.isLoading = true;
            
        },
        productDetailSucces(state,action) {
            state.isLoading= false;
            state.product= action.payload;
        },
        productDetailFail(state,action) {
            state.isLoading=false;
            state.error=action.payload;
        },


        productDeleteRequest(state) {
            state.isLoading = true;
            
        },
        productDeleteSucces(state) {
            state.isLoading= false;
            state.succes= true;
        },
        productDeleteFail(state,action) {
            state.isLoading=false;
            state.error=action.payload;
        },

        productUpdateRequest(state) {
            state.isLoading = true;
            
        },
        productUpdateSucces(state,action) {
            state.isLoading= false;
            state.product= action.payload;
            state.succes = true;
        },
        productUpdateFail(state,action) {
            state.isLoading=false;
            state.error=action.payload;
            state.succes = false;
        },
        productUpdateReset(state) {
            state.product = {};
            state.succes = false; 
            state.isLoading = false;
        }



    },
  });
  
  export const productDetailActions = productDetailSlice.actions;
  
  export default productDetailSlice;