import React, { useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addItemHandler , removeFromCart} from "../store/cart-action";
import Message from "../components/Message";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  let { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (id) {
      dispatch(addItemHandler(id, qty));
    }
  }, [dispatch, id, qty]);
 
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
      history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.cartItems.length === 0 ? (
          <Message>
            {" "}
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart.cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.product} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addItemHandler(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>                 
      <Col md={4}>
          <Card>
              <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>SubTotal ({cart.cartItems.reduce((acc, item) => acc + item.qty , 0)})items</h2>
                            ${cart.cartItems.reduce((acc, item) => acc + item.qty *  item.price , 0).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cart.cartItems.length === 0} onClick={checkOutHandler} style={{width: '100%'}}>
                                Proceed To checkout
                            </Button>
                        </ListGroup.Item>
              </ListGroup>
          </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
