import React, {  useEffect ,useState } from "react";
import { useHistory, Link , useParams } from "react-router-dom";
import { Button, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getOrderHandler } from "../store/order-action";
import Loader from "../components/Loader";

const OrderPage = () => {
  const dispatch = useDispatch();
  const[isInitial, setIsInitial] = useState(true);

  const orderDetails = useSelector((state) => state.order.givenOrder);
  const orderEl = useSelector((state) => state.order)

  const { id } = useParams()
  const {loading,error} = orderEl;
  const { orderItems, shippingAdress} = orderDetails;



  useEffect(() => {
   
    if(isInitial) {
      return
    }
    if(!orderDetails || orderDetails._id !== id) {
      dispatch(getOrderHandler(id))
      setIsInitial(false);
      console.log(orderDetails)
  }
        
        
  }, [dispatch,id]);


  
  return (
    <>
        {loading ?  <Loader/> : error ? <Message variant="danger">{error}</Message>
    : (isInitial && <><h1>Order {orderItems && orderItems._id} </h1>
    
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Place Order </h2>
              <p>
                <strong>Adress:</strong>
                {orderDetails.shippingAdress.adress} ,{shippingAdress.city} ,
                {orderDetails.shippingAdress.postalCode} ,{orderDetails.shippingAdress.country}
              </p>
              {orderDetails.isDelivered ? <Message variant="success">  Delivered On {orderDetails.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <h2>Payment Method</h2>
              <p>
              <strong>Method:</strong> {orderDetails.paymentMethod}
              </p>
              {orderDetails.isPaid ? <Message variant="success">  Paid On {orderDetails.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              {" "}
              <h2>Order Items</h2>
              {orderDetails.orderItems.length === 0 ? (
                <Message>Oder is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderItems.map((item, i) => (
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
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  
               
                >
                  PlaceOrder
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row></>)}
    </>
  );
};

export default OrderPage;
