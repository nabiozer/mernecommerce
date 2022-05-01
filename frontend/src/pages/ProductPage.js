import React,{useEffect,useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button,Form } from "react-bootstrap";
import Rating from "../components/Rating";
import {listProductDetails} from '../store/product-action'
import Loader from "../components/Loader";
import Message from "../components/Message";



const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch()
  const productDetail = useSelector(state => state.productDetail);
  let {id} = useParams();
  const {loading,error,product} = productDetail;
  
  useEffect(() => {
  
    dispatch(listProductDetails(id))

}, [id , dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }
  
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush" >
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>QTY</Col>
                    <Col>
                      <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x+1}>{x+1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item className="justify-content-center">
                <Button 
                className="btn-block w-100" 
                type="button" 
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
      
    </>
  );
};

export default ProductPage;
