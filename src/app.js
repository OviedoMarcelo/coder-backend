import express from "express";
import handlerbars from 'express-handlebars';
import handlebars from 'handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import Message from './data/dbManagers/message.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from "./utils.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
/* import { productModel } from './data/models/product.js';
import fs from 'fs'; */

const app = express();

//config params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config to support static files
app.use(express.static(`${__dirname}/public`));

//Config handlebars
app.engine('handlebars', handlerbars.engine()); /* defino el motor */
app.set('views', `${__dirname}/views`) /* directorio de las vistas */
app.set('view engine', 'handlebars') /* defino la extensión que usara para las vistas */


handlebars.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});


//routes
app.use('/', viewsRouter)

//API Rest routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//error controller middleware, allways at the end

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error no controlado');
})

try {
    await mongoose.connect('mongodb+srv://oviedommarcelo:MvilUchLgiYHlxvY@production.2q9el0c.mongodb.net/?retryWrites=true&w=majority');
    console.log('MongoDb connected')
} catch (error) {
    console.log(error);
}

const server = app.listen(8080, () => console.log('Server running on port 8080'));

//io configuration

const io = new Server(server);
app.set('socketio', io);

const messages = [];
const messageManager = new Message();

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', async data => {
        try {
            await messageManager.add(data);
            const messages = await messageManager.getAll();
            io.emit('messageLogs', messages);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('authenticated', data => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });
});



/* // Ruta al archivo JSON de productos
const productosFilePath = './src/data/files/productos.json';

// Lee el contenido del archivo JSON
const productosData = fs.readFileSync(productosFilePath, 'utf-8');

// Convierte el contenido del archivo JSON en un array de objetos JavaScript
const productos = JSON.parse(productosData);

// Crea los productos en la base de datos
for (const producto of productos) {
    try {
        await productModel.create(producto);
        console.log(`Producto "${producto.title}" agregado a la base de datos`);
    } catch (error) {
        console.error(`Error al agregar el producto "${producto.title}":`, error);
    }
} */