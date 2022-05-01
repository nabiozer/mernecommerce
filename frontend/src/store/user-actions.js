import { userActions } from "./user-slice";
import axios from 'axios'


export const loginHandler = (email, password) => {
    return async (dispatch) => {
    
  
      const sendRequest = async () => {
        const response = await fetch(
          '/api/users/login',
          {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: { 'Content-Type': 'application/json'}
          }
        );
          
       
        if (!response.ok) {
          throw new Error(response.json());
        }
        const data = await response.json();
        
        return data;

      };
  
      try {
        dispatch(userActions.userLoginRequest());
        var data = await sendRequest();
        dispatch(userActions.userLoginSucces(data))
        localStorage.setItem('userInfo',JSON.stringify(data))
  
      } catch (error) {
       dispatch(userActions.userLoginFail('invalid user'));
      
      }
    };
  };

  export const userLogoutHandler = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch(userActions.userLogout())
    dispatch(userActions.userListReset())
  }


  export const registerHandler = (name,email, password) => {
    return async (dispatch) => {
    
  
      const sendRequest = async () => {
        const response = await fetch(
          '/api/users/',
          {
            method: 'POST',
            body: JSON.stringify({name,email,password}),
            headers: { 'Content-Type': 'application/json'}
          }
        );
          
       
        if (!response.ok) {
          throw new Error(response.json());
          
        }
        const data = await response.json();
        
        return data;

      };
  
      try {
        dispatch(userActions.userRegisterRequest());
        var data = await sendRequest();
        dispatch(userActions.userRegisterSucces(data))
        dispatch(userActions.userLoginSucces(data))
        localStorage.setItem('userInfo',JSON.stringify(data))
  
      } catch (error) {
        console.log(data)
       dispatch(userActions.userRegisterFail(data));
      
      }
    };
  };

  // routes

  export const getUserDetails = (id) => {
    return async (dispatch,getState) => {
   
  
      const sendRequest = async () => {
       
        const response = await fetch(
          `/api/users/${id}`,
          {
            method: 'GET',
          
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getState().user.userInfo.token}`
            }
          }
        );
          
       
        if (!response.ok) {
          throw new Error(response.json());
          
        }
        const data = await response.json();
        
        return data;

      };
  
      try {
        dispatch(userActions.userDetailsRequest());

      
        var data = await sendRequest();
        dispatch(userActions.userDetailsSucces(data))
       
        
  
      } catch (error) {
        console.log(data)
       dispatch(userActions.userDetailsFail(
         error.response && error.response.data.message ?
         error.response.data.message : error.message
       ));
      
      }
    };
  };

  export const updateUserProfile = (user) => async (dispatch,getState) => {

    try {
      dispatch(userActions.userUpdateRequest());

      const config = { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      const {data} = await axios.put('/api/users/profile',user,config);
      dispatch(userActions.userUpdateSucces(data));
    }catch (error) {
      dispatch(userActions.userUpdateFail(error.message))

    }
    
      
  };

  export const listUsersHandler = () => async (dispatch,getState) => {

    try {
      dispatch(userActions.userListRequest());

      const config = { 
        headers: {
          
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      const {data} = await axios.get('/api/users',config);
      dispatch(userActions.userListUpdate(data));
    }catch (error) {
      dispatch(userActions.userListFail(error.message))

    }
    
      
  };

  export const deleteUserHandler = (id) => async (dispatch,getState) => {

    try {
      dispatch(userActions.userDeleteRequest());

      const config = { 
        headers: {
          
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      await axios.delete(`/api/users/${id}`,config);
      dispatch(userActions.userDeleteSuccess());
    }catch (error) {
      dispatch(userActions.userDeleteFail(error.message))

    }
    
      
  };

  export const updateUser = (user) => async (dispatch,getState) => {

    try {
      dispatch(userActions.userUpdateByAdminRequest());

      const config = { 
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        }
      }

      const {data} = await axios.put(`/api/users/${user._id}`,user,config);
      dispatch(userActions.userUpdateByAdminSuccess());
      dispatch(userActions.userDetailsSucces(data));
    }catch (error) {
      dispatch(userActions.userUpdateByAdminFail(error.message))

    }
    
      
  };