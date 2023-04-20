import { Router } from "express";
import ProductManager from "../manager/productManager.js";

const router = Router();

const productManager = new ProductManager("./src/files/productos.json");

router.get('/', async (req, res) => {

    const products = await productManager.getProducts();
    console.log('estos')
    //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.send(products.slice(0, limit));

})

router.get('/:pid', async (req, res) => {

    const prodId = parseInt(req.params.pid);
    const product = await productManager.getProductByID(prodId)
    product ? res.send(product) : res.send({ error: 'Product not found' });

})

router.post('/', async (req, res) => {

    const product = req.body;
    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.stock ||
        !product.category
    ) {
        return res.status(400).send({ status: 'error', error: 'Incomplete or incorrect values' })
    }
    await productManager.addProduct(product);
    res.send({ status: 'succes', message: 'Product add' })

})


router.put('/:pid', async (req, res) => {
    const product = req.body;
    const productId = Number(req.params.cid);
    const result = await productManager.updateProduct(productId, product)
    result ? res.send({ status: 'Success', message: 'Actualizado corectamente' }) : res.status(400).send({ status: 'error', error: 'No se puedo actualizar' });
})


router.delete('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const result = await productManager.deleteProduct(productId)
    console.log(result)
    result ? res.send({ status: 'Success', message: 'Eliminado correctamente' }) : res.status(400).send({ status: 'error', error: 'No se puedo eliminar' });
})

export default router;