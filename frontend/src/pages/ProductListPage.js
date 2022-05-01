import React, { useEffect } from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts ,deleteProductHandler ,createProductHandler ,listProductDetails} from "../store/product-action";
import {productActions} from '../store/product-slice'

const ProductListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const { error, loading, products ,newProduct ,success } = productList;

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(productActions.productCreateReset())
    if (!user.userInfo.isAdmin) {
      history.push('/login')
      dispatch(listProducts());
    } 

    if(success) {
      history.push(`/admin/product/${newProduct._id}`)
      dispatch(listProducts());
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, user,success,newProduct]);

  
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProductHandler(id))
    }
  };
  const createHandler = () => {
    dispatch(createProductHandler())
  
  }

  const loadProductHandler = (id) => {
    dispatch(listProductDetails(id))
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productList.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`} onClick={(e) => loadProductHandler(product._id)}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;
