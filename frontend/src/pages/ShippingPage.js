import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { saveShippingAdressHandler} from "../store/cart-action";
import CheckoutSteps from '../components/CheckoutSteps';


import FormContainer from '../components/FormContainer';

const ShippingPage = () => {
    const shippingAdressData = useSelector((state) =>state.cart.shippingAdress)
    const dispatch = useDispatch();


    const history = useHistory();

    const [adress, setAdress] = useState(shippingAdressData.adress);
    const [city, setCity] = useState(shippingAdressData.city);
    const [postalCode, setPostalCode] = useState(shippingAdressData.postalCode);
    const [country, setCountry] = useState(shippingAdressData.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAdressHandler({adress,city,postalCode,country}));
        history.push('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='adress'>
                <Form.Label>Adress</Form.Label>
                <Form.Control 
                type='text' 
                placeholder='Enter adress' 
                value={adress}
                required 
                onChange={(e) => setAdress(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>city</Form.Label>
                <Form.Control 
                type='text' 
                placeholder='Enter city' 
                value={city}
                required 
                onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control 
                type='text' 
                placeholder='Enter postalCode' 
                value={postalCode}
                required 
                onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='Country'>
                <Form.Label>Country</Form.Label>
                <Form.Control 
                type='text' 
                placeholder='Enter Country' 
                value={country}
                required 
                onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type='submit' variant="primary">Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingPage