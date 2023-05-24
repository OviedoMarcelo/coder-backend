import { Router, query } from "express";
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
        const { page = 1, limit = 5, sort = null, category = null } = req.query;
        const query = {}
        const options = {
            page: page,
            limit: limit
        }
        if (sort) {
            options.sort = { price: sort }
        }
        if (category) {
            query.category = category
        }
        const prods = await productManager.getAll(query, options);
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

router.get('/cart/:cid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const cart = await cartManager.getById(idCart);
        res.render('cart', { cart })
    } catch (error) {
        console.log(error)
    }
})


export default router;