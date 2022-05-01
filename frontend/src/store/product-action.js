import {productActions} from './product-slice'
import {productDetailActions} from './productdetail-slice'
import axios from 'axios'


export const listProducts =() => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                '/api/products'
            );


            if (!response.ok) {
                throw new Error('Could not fetch product data!');
              }
        
              const data = await response.json();
        
              return data;


        }

        try {
            dispatch(productActions.productListRequest())
            const data = await fetchData();
            dispatch(productActions.productListSucces(data))

        } catch (error) {
            dispatch(productActions.productListFail(error.message && error.response.data.message ? error.response.data.message : error.message))
        }
    }
}

export const listProductDetails =(id) => {
    return async (dispatch) => {



        
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
            dispatch(productDetailActions.productDetailRequest())
            const data = await fetchData();
            dispatch(productDetailActions.productDetailSucces(data))

        } catch (error) {
            dispatch(productDetailActions.productDetailFail(error.message && error.response.data.message ? error.response.data.message : error.message))
        }
    }
}

export const deleteProductHandler = (id) => async (dispatch,getState) => {

    try {
      dispatch(productDetailActions.productDeleteRequest());

      const config = { 
        headers: {
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }
      await axios.delete(`/api/products/${id}`,config);
      dispatch(productDetailActions.productDeleteSucces());
    }catch (error) {
      dispatch(productDetailActions.productDeleteFail(error.message))
    }
  };

  export const createProductHandler = () => async (dispatch,getState) => {

    try {
      dispatch(productActions.productCreateRequest());

      const config = { 
        headers: {
            
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }
      const {data} = await axios.post(`/api/products/`,{},config);
      dispatch(productActions.productCreateSucces(data));
    }catch (error) {
      dispatch(productActions.productCreateFail(error.message))
    }
  };

  export const productUpdateHandler = (product) => async (dispatch,getState) => {

    try {
      dispatch(productDetailActions.productUpdateRequest());

      const config = { 
        headers: {
            'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }
      const {data} = await axios.put(`/api/products/${product._id}`,product,config);
      dispatch(productDetailActions.productUpdateSucces(data));
    }catch (error) {
      dispatch(productDetailActions.productUpdateFail(error.message))
    }
  };


  