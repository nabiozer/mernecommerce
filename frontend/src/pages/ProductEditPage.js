import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productDetailActions } from "../store/productdetail-slice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProductDetails,
  productUpdateHandler,
} from "../store/product-action";
import FormContainer from "../components/FormContainer";

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  let { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const error = useSelector((state) => state.product.error);

  const { isLoading, product, succes } = productDetail;

  useEffect(() => {
    if (succes) {
      dispatch(productDetailActions.productUpdateReset());
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }

    console.log(productDetail.name);
  }, [product, id, dispatch, history, succes]);



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productUpdateHandler({
        _id: id,
        name,
        price,
        description,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file)
    setUploading(true)
    try {
        const config = {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        }
        const {data} = await axios.post('/api/upload', formData, config)

        setImage(data);
        setUploading(false)
    } catch (error) {
      console.error(error);
      setUploading(false)
    }

  }
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {isLoading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
                
             
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image </Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter Image"
                custom
                onChange={uploadFileHandler}
              
              ></Form.Control>
                
             
              {uploading && <Loader />}
            </Form.Group>
            
            

            <Form.Group controlId="brand">
              <Form.Label>brand </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
        
             
              
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>countInStock </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>description </Form.Label>
              <Form.Control
                type="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="product">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
