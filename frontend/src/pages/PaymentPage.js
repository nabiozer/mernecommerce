import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethodHandler } from "../store/cart-action";
import CheckoutSteps from "../components/CheckoutSteps";

import FormContainer from "../components/FormContainer";

const PaymentPage = () => {
  const shippingAdressData = useSelector((state) => state.cart.shippingAdress);
  const dispatch = useDispatch();
  const history = useHistory();
  if (!shippingAdressData) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethodHandler(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        
        <Col>
          <Form.Check
            type="radio"
            label="PayPal"
            id="PayPal"
            name="paymentMethod"
            value={paymentMethod}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        <Col>
          <Form.Check
            type="radio"
            label="CreditCard"
            id="CreditCard"
            name="paymentMethod"
            value={paymentMethod}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
