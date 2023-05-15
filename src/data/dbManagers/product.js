import { productModel } from '../models/product.js'

export default class Product {
    constructor() {
        console.log('Working with products in the DB')
    }

    getAll = async () => {
        const products = await productModel.find().lean();
        return products;
    }

    getById = async (id) => {
        const product = await productModel.findById(id).lean();
        return product;
    }

    add = async (product) => {
        const result = await productModel.create(product);
        return result;
    }

    update = async (id, productUpdated) => {
        const result = await productModel.findByIdAndUpdate(id, productUpdated, {new: true});
        return result;
    }

    delete = async (id) => {
        const result = await productModel.findByIdAndDelete(id);
        return result;
    }
}


