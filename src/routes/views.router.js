import { Router } from "express";
import Product from "../data/dbManagers/product.js";
import Cart from "../data/dbManagers/cart.js";



//Initialize router
const router = Router();
//Product manager
const productManager = new Product();
const cartManager = new Cart();

//Handlebars render
router.get('/home', async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const prods = await productManager.getAll(limit, page);
        console.log(prods)
        res.render('home', { prods });
    } catch (error) {
        console.log(error);
    }

})

router.get('/realtimeproducts', async (req, res) => {
    try {
        const prods = await productManager.getAll();
        res.render('realTimeProducts', { prods });
    } catch (error) {
        console.log(error);
    }

})

router.get('/addproduct', (req, res) => {
    try {
        res.render('addproduct');
    } catch (error) {
        console.log(error)
    }

})

router.get('/chat', (req, res) => {
    try {
        res.render('chat')
    } catch (error) {
        console.log(error)
    }
})

router.get('/cart', async (req, res) => {
    try {
        const idCart = '646cf3c9dea79b1340434e45';
        const cart = await cartManager.getById(idCart);
        console.log(cart)
        res.render('cart', {cart})
    } catch (error) {
        console.log(error)
    }
})


export default router;