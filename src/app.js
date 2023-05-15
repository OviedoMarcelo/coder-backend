import express from "express";
import handlerbars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from "./utils.js";
import { Server } from "socket.io";
import mongoose from "mongoose";

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