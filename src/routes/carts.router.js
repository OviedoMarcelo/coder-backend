import { Router } from "express";
import CartManager from "../manager/cartManager.js";
import ProductManager from "../manager/productManager.js"

const router = Router();

const cartManager = new CartManager("./src/files/cart.json");
const productManager = new ProductManager("./src/files/productos.json");


//Get all Carts
router.get('/', async (req, res) => {

    const carts = await cartManager.getCarts();
    //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
    const limit = req.query.limit ? parseInt(req.query.limit) : carts.length;
    res.send(carts.slice(0, limit));

})

//Get Cart by ID

router.get('/:cid', async (req, res) => {

    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartByID(cartId)
    cart ? res.send(cart) : res.send({ error: 'Cart not found' });

})

//Create a new cart

router.post('/', async (req, res) => {

    await cartManager.createCart();
    res.send({ status: 'succes', message: 'Create cart succesfuly' })

})



router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    const product = await productManager.getProductByID(productId);
    const cart = await cartManager.getCartByID(cartId);
    console.log(cart)
    cartManager.addProductToCart(cart, product);
    res.send({ status: 'succes', message: 'Producto add to Cart' })

})



export default router;