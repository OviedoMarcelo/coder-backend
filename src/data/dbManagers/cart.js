import { cartModel } from '../models/cart.js'

export default class Cart {

    constructor() {
        console.log('Working carts with DB')
    }

    /* Get all */
    getAll = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    /* Get By Id */
    getById = async (id) => {
        const cart = await cartModel.findById(id).lean();
        return cart;
    }

    /* Add/Create a new cart */
    add = async (products = []) => {
        const result = await cartModel.create({ products: products });
        return result;
    }

    /* Add product */

addToCart = async (cart, product) => {

        const existingCart = await this.getById(cart._id);

        if (!existingCart) {
            // El carrito no existe, crear uno nuevo
            const newCart = await this.add([{ id: product._id, quantity: 1 }]);
            console.log(`Se creó un nuevo carrito con el ID ${newCart._id}.`);
        } else {
            // El carrito existe, buscar el producto en el carrito
            console.log('el carrito existe')
            const productIndex = existingCart.products.findIndex(
                (prod) => prod._id === product._id
            );
            console.log(productIndex);

            if (productIndex === -1) {
                // El producto no existe en el carrito, agregarlo
                existingCart.products.push({ id: product._id, quantity: 1 });
                console.log('index negativo')
            } else {
                // El producto existe en el carrito, actualizar la cantidad
                console.log('entre al else del index el producto existe')
                existingCart.products[productIndex].quantity += 1;
            }

            // Guardar los cambios en el carrito
            console.log('Antes de guardar los cambios existing cart:')
            console.log(existingCart)
            const updatedCart = await cartModel.findByIdAndUpdate(
                existingCart._id,
                existingCart,
                { new: true }
            );

            console.log(
                `Se agregó el producto ${product.title} correctamente al carrito con ID ${updatedCart._id}.`
            );
        }

    }



}