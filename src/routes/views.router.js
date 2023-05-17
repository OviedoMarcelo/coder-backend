import { Router } from "express";
import Product from "../data/dbManagers/product.js";


//Initialize router
const router = Router();
//Product manager
const productManager = new Product();

//Handlebars render
router.get('/home', async (req, res) => {
    try {
        const prods = await productManager.getAll();
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

router.get('/chat', (req,res) =>{
    try {
        res.render('chat')
    } catch (error) {
        console.log(error)
    }
})

export default router;