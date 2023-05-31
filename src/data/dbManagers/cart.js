import { cartModel } from '../models/cart.model.js'
import { productModel } from '../models/product.model.js'


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

    addToCart = async (cartId, productId) => {

        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error('El carrito no existe');
            }

            const existingProduct = cart.products.find(
                (product) => product.product.toString() === productId.toString()
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const product = await productModel.findById(productId);
                if (!product) {
                    throw new Error('El producto no existe');
                }

                cart.products.push({
                    product: productId,
                    quantity: 1,
                });
            }
            await cart.save();
            console.log('El carrito ha sido actualizado exitosamente');
            return cart;
        } catch (error) {
            console.error('Error al actualizar el carrito:', error.message);
        }
    }

    deleteProduct = async (cartId, productId) => {

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
        }
        const productIndex = cart.products.findIndex((product) => product.product.toString() === productId);
        if (productIndex === -1) {
            return { status: 'error', message: 'Producto no encontrado en el carrito' };
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        return { status: 'success', message: 'Producto eliminado del carrito' };
    }

    deleteAllProducts = async (cartId) => {

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
        }
        cart.products = [];
        await cart.save();
        return { status: 'success', message: 'Se eliminaron todos los productos del carrito' };
    }


    updateCartProducts = async (cartId, newProducts) => {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error('El carrito no existe');
        
        }
        console.log(cart.products)
        cart.products = newProducts;
        await cart.save();
        console.log('El carrito ha sido actualizado exitosamente');
        return cart;
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        const cart = await cartModel.findById(cartId);
        console.log(cart);
        console.log(cartId)
        console.log(productId)
        console.log(quantity)
        if (!cart) {
            throw new Error('El carrito no existe');
        }
        const product = cart.products.find(
            product => product.product._id.toString() === productId.toString()
        );
        if (!product) {
            throw new Error('El producto no existe en el carrito');
        }
        product.quantity = quantity;
        await cart.save();
        console.log('La cantidad del producto ha sido actualizada exitosamente');
        return cart;
    }


}