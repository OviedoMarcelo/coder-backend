import express from "express";
import ProductManager from "./productManager.js";

const app = express();

//New product manager instance

const productManager = new ProductManager("./productos.json");
app.use(express.urlencoded({ extended: true }));

app.get('/productos', async (req, res) => {

    const products = await productManager.getProducts();
    //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.send(products.slice(0, limit));

})

app.get('/productos/:id', async (req, res) => {

    const prodId = parseInt(req.params.id);
    const product = await productManager.getProductByID(prodId)
    product ? res.send(product) : res.send({ error: 'Product not found' });

})

app.listen(8080, () => console.log('Listening on port 8080'))