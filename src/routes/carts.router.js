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
    cart ? res.send({ status: 'success', payload: cart }) : res.send({ error: 'Cart not found' });

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
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const product = await productManager.getById(productId);
        const cart = await cartManager.getById(cartId);
        cartManager.addToCart(cart._id, product._id);
        res.send({ status: 'succes', message: 'Producto add to Cart' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }


})

/* Actualiza la cantidad de ejemplares */

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const product = await productManager.getById(productId);
        const cart = await cartManager.getById(cartId);
        console.log(product)
        console.log(cart)
        if (!product || !cart || !quantity) {
            res.status(400).send({ status: 'error', message: 'bad request or invalid' });
        }
        await cartManager.updateProductQuantity(cartId, productId, quantity)
        res.send({ status: 'success', message: 'Quantity updated succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
})

router.put('/:cid', async (req, res) => {
    try {
        const { products } = req.body;
        const cartId = req.params.cid;
        const cart = await cartManager.getById(cartId);
        if (!cart || !products) {
            res.status(400).send({ status: 'error', message: 'bad request or invalid' });
        }
        await cartManager.updateCartProducts(cartId, products)
        res.send({ status: 'success', message: 'Cart updated succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
})







router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await cartManager.deleteProduct(cartId, productId);
        res.send({ status: 'succes', message: 'Product delete succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }

})

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        await cartManager.deleteAllProducts(cartId);
        res.send({ status: 'succes', message: 'All products delete succesfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }

})


export default router;