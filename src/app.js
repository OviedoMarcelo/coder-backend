import express from "express";
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import __dirname from "./utils.js";

const app = express();

//config params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config to support static files
app.use(express.static(`${__dirname}/public`));

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//error controller middleware, allways at the end

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error no controlado');
})

app.listen(8080, () => console.log('Server running on port 8080'));