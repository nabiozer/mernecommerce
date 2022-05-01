import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails ,updateUser } from "../store/user-actions";
import FormContainer from "../components/FormContainer";

const UserEditPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  let { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user);
  const updateDetails = useSelector((state) => state.user.user);
  const { loading, error, user , } = userDetails;
  const { _id} = updateDetails;

  useEffect(() => {
      
        if(!user.name || user._id !== id ) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
        }
  }, [user,id,dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(updateUser({_id: id, name, email, isAdmin}))
     history.push('/admin/userlist')

  };
  return (
      <>
          <Link to="/admin/userList" className="btn btn-light my-3" >Go Back</Link> 
     
    <FormContainer>
      <h1>Update User</h1>
        {loading ? <Loader></Loader> : error ?<Message variant="danger">{error}</Message>: 
        (<Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>name Adress</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="isadmin">
          
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>
      
   

        <Button type="submit" variant="product">
          Update
        </Button>
      </Form>)
        
        }
      
    </FormContainer>
    </>
  );
};

export default UserEditPage;
