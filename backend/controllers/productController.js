import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description Fetch all products
// @route  GET /api/products
// @acces Public
const getProducts = asyncHandler (async (req,res) => {

    const products = await Product.find({})
    res.json(products);

})
// @description Fetch single products
// @route  GET /api/products/:id
// @acces   Public
const getProductById = asyncHandler (async (req,res) => {

    const product = await Product.findById(req.params.id);
    
    if(product) {
        res.json(product);
      
    } 
    else{
       
        res.status(404)

        throw new Error('Product not found')
    }

})

// @description Delete product
// @route  Delete /api/products/:id
// @acces   Private

const deleteProduct = asyncHandler (async (req,res) => {

    const product = await Product.findById(req.params.id)
    if(product) {
        await product.remove()
        res.json({message:'product deleted'})
    } else {
        res.status(404)
        throw new Error('product not found')
    }

   
})



// @description Create product
// @route  POST /api/products
// @acces   Private/Admin

const createProduct = asyncHandler (async (req,res) => {

    const product = new Product({
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock:0,
        numReviews:0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

   
})

// @description Update product
// @route  Put /api/products/:id
// @acces   Private/Admin

const updateProduct = asyncHandler (async (req,res) => {

    const {
        name,price,description,image,brand,category,countInStock
    } = req.body

    const product = await Product.findById(req.params.id)
    if(product) {
      
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;


        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('product not found')
    }
  

   
})



export {getProducts, getProductById , deleteProduct , createProduct,updateProduct}