class ProductManager {

    //#testing private variable

    constructor() {
        this.products = [];
    }


    //Methods


    addProduct = (title, description, price, thumbail, code, stock) => {

        const product = {
            title,
            description,
            price,
            thumbail,
            code,
            stock,

        };
        //Set product.id
        this.products.length === 0 ? product.id = 1 : product.id = this.products[this.product.length - 1].id + 1;

        //Existing product code validator
        const productCodeIndex = this.products.findIndex(product => product.code === this.code);
        if (productCodeIndex === -1) {
            this.products.push(product)
            console.log('Producto agregado correctamente :)')
            return;
        } else {
            console.log(`El code ${product.code} del producto a agregar ya existe para el producto ${this.products[productCodeIndex].title}, no pudo agregarse.`)
            return;
        }

    }

    getProducts = () => {
        return this.products;
    }

    getProductByID = (id) => {

        const productId = this.products.find(product => product.id === id);
        return (!productId) ? `Not Found: Producto con id ${id} no encontrado` : productId;

    }

}

