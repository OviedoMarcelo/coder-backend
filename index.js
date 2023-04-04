import ProductManager from './manager/productManager.js'


const path = 'files/usuarios.json';

const product = new ProductManager(path);

(async () => {

    try {
        const productlist = await product.getProducts();
        console.log('Todos los productos iniciales');
        console.log(productlist);
        console.log('---------------------------');
        const newProduct = {
            title: "Tomate rojo",
            description: "El mejor tomate",
            price: 200,
            thumbail: "Sin imagen",
            code: "001",
            stock: 25,
        };
        
        console.log('Agrego el primer producto');
        await product.addProduct(newProduct);
        const newProductlist = await product.getProducts();
        console.log(newProductlist);

        const newProduct2 = {
            title: "Lechuga",
            description: "Verde y rica",
            price: 300,
            thumbail: "Sin imagen",
            code: "002",
            stock: 10,
        };

        await product.addProduct(newProduct2);
        console.log('---------------------------')
        console.log('Inserto nuevo producto')
        const newProductlist2 = await product.getProducts();
        console.log(newProductlist2);

        const productToUpdate = {
            title: "Lechuga morada",
            description:"Morada y sabrosa",
            price: 500,
        }

        await product.updateProduct(2,productToUpdate);
        const newProductlist3 = await product.getProducts();
        console.log(newProductlist3);


    } catch (error) {
        console.error(error);
    }
}
)();