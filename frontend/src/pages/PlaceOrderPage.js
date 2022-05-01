import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createOrderHandler ,getOrderHandler } from "../store/order-action";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const history = useHistory();
  const { orderCreate, succes, error } = order;

  useEffect(() => {
    if (succes) {
      history.push(`/orders/${orderCreate._id}`);
      dispatch(getOrderHandler(orderCreate._id));
    }
   
      


  }, [history, succes]);

  // calculate price for
  var itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  var shippingPrice = itemsPrice > 100 ? 0 : 100;

  var taxPrice = Number((0.15 * itemsPrice).toFixed(2));

  var totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const placeOrderHandler = () => {
    console.log(
      cart.cartItems,
      cart.shippingAdress,
      cart.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    );
    dispatch(
      createOrderHandler({
        orderItems: cart.cartItems,
        shippingAdress: cart.shippingAdress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,


        
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Place Order </h2>
              <p>
                <strong>Adress:</strong>
                {cart.shippingAdress.address} ,{cart.shippingAdress.city} ,
                {cart.shippingAdress.postalCode} ,{cart.shippingAdress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <h2>Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              {" "}
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      {" "}
                      <Row>
                        {" "}
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {" "}
                            {item.name}
                          </Link>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Col>
                      </Row>{" "}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summart</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.carItems === 0}
                  onClick={placeOrderHandler}
                >
                  PlaceOrder
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
