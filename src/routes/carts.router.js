import { Router } from "express";
import Cart from "../data/dbManagers/cart.js";
import Product from "../data/dbManagers/product.js";

const router = Router();

const cartManager = new Cart();
const productManager = new Product();


/* Get all Carts */
router.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getAll();
        //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
        const limit = req.query.limit ? parseInt(req.query.limit) : cart.length;
        res.send({ status: 'success', payload: cart.slice(0, limit) });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }


})

//Get Cart by ID
router.get('/:cid', async (req, res) => {

    const cartId = req.params.cid;
    const cart = await cartManager.getById(cartId)
    cart ? res.send(cart) : res.send({ error: 'Cart not found' });

})

//Create a new cart
router.post('/', async (req, res) => {
    try {
        const result = await cartManager.add();
        res.send({ status: 'success', payload: result })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
})



router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const product = await productManager.getById(productId);
    const cart = await cartManager.getById(cartId);
    cartManager.addToCart(cart, product);
    res.send({ status: 'succes', message: 'Producto add to Cart' })

})



export default router;