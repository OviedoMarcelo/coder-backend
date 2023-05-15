import { Router } from "express";
import Product from "../data/dbManagers/product.js";

const router = Router();

const productManager = new Product();

/* Get all */
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getAll();
        //If a 'limit' value exists in the query, return that number of elements. Otherwise, return the entire array.
        const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
        res.send({ status: 'success', payload: products.slice(0, limit) });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }


})

/* Get byId */
router.get('/:pid', async (req, res) => {

    const prodId = req.params.pid;
    const product = await productManager.getById(prodId)
    product ? res.send({ status: 'success', payload: product }) : res.send({ error: 'Product not found' });

})

/* Add  */
router.post('/', async (req, res) => {
    try {
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
        const result = await productManager.add(product);
        const io = req.app.get('socketio');
        io.emit('updateProducts', await productManager.getAll());
        res.send({ status: 'success', payload: result })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }

})

/* Update */
router.put('/:pid', async (req, res) => {
    const product = req.body;
    const productId = req.params.pid;
    const result = await productManager.update(productId, product)
    result ? res.send({ status: 'success', payload: result }) : res.status(400).send({ status: 'error', error: 'No se puedo actualizar' });
})

/* Delete */
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const result = await productManager.delete(productId)
    if (result != null) {
        const io = req.app.get('socketio');
        io.emit('updateProducts', await productManager.getAll());
        res.send({ status: 'Success', message: 'Eliminado corectamente' })
    } else {
        res.status(400).send({ status: 'error', error: 'No se encontró el elemento a eliminar' });
    }

})

export default router;