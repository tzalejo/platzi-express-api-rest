const express = require('express');
const ProductsService = require('./../services/product.service');

const router = express.Router();
const productService = new ProductsService();

const validatorHandler = require('./../middleware/validator.handler');
const { createProductDto, updateProductDto, getProductDto } = require('./../schemas/product.dto');
router.get('/', async (req, res, next)=>{
  try {
    const products = await productService.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductDto, 'params'),
  async (req, res, next)=>{
  try {
    const { id } =req.params;
    const product = await productService.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductDto, 'body'),
  async (req, res)=>{
  try {
    const body = req.body;
    const productNew = await productService.create(body);
    res.status(201).json({
        message: 'create',
        data: productNew
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.patch('/:id',
  validatorHandler(getProductDto, 'params'),
  validatorHandler(updateProductDto, 'body'),
  async (req, res)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await productService.udpate(id, body);
    res.json({
        message: 'modificar',
        data: product
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});


router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    const product = await productService.delete(id);
    res.json({
        message: 'eliminar',
        product,
    });
});

module.exports = router;

