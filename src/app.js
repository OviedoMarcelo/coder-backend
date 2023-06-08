import express from "express";
import session from "express-session";
import handlerbars from 'express-handlebars';
import handlebars from 'handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import Message from './data/dbManagers/message.js';
import cartsRouter from './routes/carts.router.js';
import sessionRouter from './routes/session.router.js'
import __dirname from "./utils.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import passport from "passport";

// Initialize express
const app = express();

let mongooseConnection;
try {
    mongooseConnection = await mongoose.connect('mongodb+srv://oviedommarcelo:MvilUchLgiYHlxvY@production.2q9el0c.mongodb.net/?retryWrites=true&w=majority');
    console.log('MongoDb connected')
} catch (error) {
    console.log(error);
}


app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder39760',
    resave: true,
    saveUninitialized: true
}))



//config params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config to support static files
app.use(express.static(`${__dirname}/public`));

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Config handlebars

handlebars.registerPartial('partials', `${__dirname}/views/partials`);
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
app.use('/api/sessions', sessionRouter);

//error controller middleware, allways at the end

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error no controlado');
})


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
