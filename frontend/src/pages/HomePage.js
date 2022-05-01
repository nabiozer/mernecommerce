import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Row ,Col } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product'
import { listProducts } from '../store/product-action';


const HomePage = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.product);
  const {loading, error , products} = productList;
useEffect(() => {
   dispatch(listProducts())
}, [dispatch]);

  return (
    <>
     <h1>Latest Products</h1>
     {loading ? (<Loader />) :  error ? (<Message variant='danger'>{error}</Message>) :
     
     
     ( <Row>
        {products.map(product => (  
          <Col key={product._id} sm={12} md={6}  lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
     </Row>) } 
    

    </>
  )
}

export default HomePage