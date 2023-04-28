import { Router } from "express";
import ProductManager from "../manager/productManager.js";


//Initialize router
const router = Router();
//Product manager
const products = new ProductManager("./src/files/productos.json");

//Handlebars render
router.get('/home', async (req, res) => {
    const prod = await products.getProducts();
    res.render('home', {prod});
})

router.get('/realtimeproducts', async (req, res) => {
    const prod = await products.getProducts();
    res.render('realTimeProducts',{prod});
})


router.get('/addproduct', (req, res) => {
        res.render('addproduct');
})

export default router;