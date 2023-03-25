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
        this.products.length === 0 ? product.id = 1 : product.id = this.products[this.products.length - 1].id + 1;

        if (
            !title ||
            !description ||
            !price ||
            !thumbail ||
            !code ||
            !stock            
            ){
                console.log('No se pudo agregar el producto. Todos los campos son obligatorios, verificar los mismos.')
                return;
            }

        //Existing product code validator
        const productCodeIndex = this.products.findIndex((product) => product.code === code);
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

////Test space

const product = new ProductManager();

console.log('Todos los productos iniciales')
console.log(product.getProducts());
console.log('---------------------------')

console.log('Agrego el primer producto')
product.addProduct("Tomate rojo", "El mejor tomate", 200, "Sin imagen", "001", 25)
console.log(product.getProducts());
console.log('---------------------------')

console.log('Agrego el segundo producto')
product.addProduct("Lechuga", "La más rica y fresca", 400, "Sin imagen", "002", 10);
console.log(product.getProducts());
console.log('---------------------------')

console.log('Agrego un producto con campos incompletos')
product.addProduct("Lechuga", 400, "Sin imagen", "002",);
console.log(product.getProducts());
console.log('---------------------------')

console.log('Agrego un producto con el code repetido')
product.addProduct("Tomete amarillo", "Otro tomate", 250, "Sin imagen", "001", 8);
console.log(product.getProducts());
console.log('---------------------------')

console.log('Muestro el producto con ID 4 que no existente')
console.log(product.getProductByID(4));
console.log('---------------------------')

console.log('Muestro el producto con ID 1 existente')
console.log(product.getProductByID(1));