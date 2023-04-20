import fs from 'fs';

export default class ProductManager {

    constructor(path) {
        this.path = path;
    }

    //Methods

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data, null, '\t');
                return products;
            }
            else {
                return [];
            }

        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (product) => {

        try {
            //Read the products from a file
            const products = await this.getProducts();
            //Set product.id
            products.length === 0 ? product.id = 1 : product.id = products[products.length - 1].id + 1;
            if (
                !product.title ||
                !product.description ||
                !product.price ||
                !product.code ||
                !product.stock ||
                !product.category
            ) {
                console.log('No se pudo agregar el producto. Todos los campos son obligatorios, verificar los mismos.')
                return;
            }
            //Existing product code validator

            const productCodeIndex = products.findIndex((prod) => prod.code === product.code);
            if (productCodeIndex === -1) {
                if (!product.status) {
                    product.status = true;
                }
                products.push(product)
                fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
                console.log('Producto agregado correctamente :)')
                return;
            } else {
                console.log(`El code ${product.code} del producto a agregar ya existe para el producto ${products[productCodeIndex].title}, no pudo agregarse.`)
                return;
            }

        } catch (error) {
            console.log(error)
        }

    }


    getProductByID = async (id) => {
        try {
            const products = await this.getProducts();
            const productId = products.find(product => product.id === id);
            return (!productId) ? null : productId;
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, updateProduct) => {

        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                console.log(`No se encontró el producto con el ID ${id} recibido, no se actualiza.`);
                return false;
            }
            const productToUpdate = products[productIndex];
            const productUpdated = { ...productToUpdate, ...updateProduct };
            products.splice(productIndex, 1, productUpdated);
            fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            console.log(`Se actualiza correctamente el producto de ID ${id}  con los nuevos valores`)
            return true;

        } catch (error) {
            console.log(error);
        }

    }

    deleteProduct = async (id) => {

        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                console.log('No se encontró el producto con el ID recibido, no se borra.');
                return false;
            }
            products.splice(productIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            console.log(`Se eliminó el producto con ID ${id} correctamente.`);
            return true;
        } catch (error) {
            console.log(error);
        }
    }

}

