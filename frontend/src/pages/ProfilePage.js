import React,{useState, useEffect} from 'react'
import {Link,useLocation,useHistory} from 'react-router-dom'
import {Form,Button, Row,Col ,Table} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails ,updateUserProfile } from '../store/user-actions';


const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);


    const location = useLocation();
    const history = useHistory();
    
    const dispatch = useDispatch();

   
    const userDetails = useSelector(state => state.user);
    const {loading,error,user ,userInfo ,succes} = userDetails;

   
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {

            if(!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                 setName(user.name) ;
                 setEmail(user.email);  
            }
        }
    }, [history, userInfo, dispatch ,user])
    

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('password do not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email ,password}))
            
        }
        
    }
  return (


    <Row className="py-3">
    <Col md={3}>
    <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {succes && <Message variant='succes'>{succes}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type='name' 
                placeholder='Enter name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control 
                type='email' 
                placeholder='Enter email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type='password' 
                placeholder='Enter password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmpassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type='password' 
                placeholder='Confirm Password' 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='product'>Update</Button>
        </Form>
    </Col>

    <Col md={9}>
        My Orders
     </Col>
  </Row>
   
        
     
    
  )
}

export default ProfilePage;