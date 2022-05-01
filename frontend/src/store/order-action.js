import {orderActions} from "./order-slice";
import axios from "axios"



export const createOrderHandler = (order) => async (dispatch,getState) => {

    try {
      dispatch(orderActions.orderCreateRequest());
      const config = { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      const {data} = await axios.post('/api/orders', order, config);
      dispatch(orderActions.orderCreateSucces(data));
    }catch (error) {
      dispatch(orderActions.orderCreateFail(error.message))
      console.error(error.message)

    }
    
  };  


  export const getOrderHandler = (id) => async (dispatch,getState) => {

    try {
      dispatch(orderActions.orderDetailsRequest());
      const config = { 
        headers: {
         
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      const {data} = await axios.get(`/api/orders/${id}`, config);
      dispatch(orderActions.orderDetailsSucces(data));
      console.log('tried')
    }catch (error) {
      dispatch(orderActions.orderDetailsFail(error.message))
      console.error(error.message)

    }
    
  };


  export const payOrderHandler = (orderId,paymentResult) => async (dispatch,getState) => {

    try {
      dispatch(orderActions.orderPayRequest());
      const config = { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config);
      dispatch(orderActions.orderPaySucces(data));
      console.log('tried')
    }catch (error) {
      dispatch(orderActions.orderPayFail(error.message))
      console.error(error.message)

    }
    
  };

  export const getOrdersHandler = (id) => async (dispatch,getState) => {

    try {
      dispatch(orderActions.orderListRequest());
      const config = { 
        headers: {
         
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      const {data} = await axios.get(`/api/orders`, config);
      dispatch(orderActions.orderListSucces(data));
     
    }catch (error) {
      dispatch(orderActions.orderListFail(error.message))
      console.error(error.message)

    }
    
  };