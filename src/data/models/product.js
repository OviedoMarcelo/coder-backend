import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: Array,
        default: ["https://cdn.pixabay.com/photo/2017/04/03/15/52/mobile-phone-2198770_1280.png"]
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Android", "Iphone"]
    }

})

export const productModel = mongoose.model(productCollection, productSchema);


