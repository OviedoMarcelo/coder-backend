import { productModel } from '../models/product.js'

export default class Product {
    constructor() {
        console.log('Working with products in the DB')
    }

    getAll = async (query,options) => {
        options.lean=true;
        const products = await productModel.paginate(query,options);
        return ({
            payload: products.docs,
            totalPage: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/home?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `/home?page=${products.nextPage}` : null,
        });
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
        const result = await productModel.findByIdAndUpdate(id, productUpdated, { new: true });
        return result;
    }

    delete = async (id) => {
        const result = await productModel.findByIdAndDelete(id);
        return result;
    }
}


