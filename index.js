import ProductManager from './manager/productManager.js'


const path = 'files/usuarios.json';

const product = new ProductManager(path);

(async () => {

    try {
        //Product list empty
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

        //add new product
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

        //add a second one product
        await product.addProduct(newProduct2);
        console.log('---------------------------')
        console.log('Inserto nuevo producto')
        const newProductlist2 = await product.getProducts();
        console.log(newProductlist2);

        //Update a product

        const productToUpdate = {
            title: "Lechuga morada",
            description: "Morada y sabrosa",
            price: 500,
        }

        await product.updateProduct(2, productToUpdate);
        const newProductlist3 = await product.getProducts();
        console.log(newProductlist3);

        //delete a product
        await product.deleteProduct(2)
        const newProductlist4 = await product.getProducts();
        console.log(newProductlist4);


        //show a product id 1 and id 2 recently deleted 
        const newProductlist5 = await product.getProductByID(1);
        console.log('---------------------------');
        console.log('Product con ID 1');
        newProductlist5 ? console.log(newProductlist5) : console.log('No se encontró el producto con el ID solicitado');
        const newProductlist6 = await product.getProductByID(2);
        console.log('---------------------------');
        console.log('Product con ID 2');
        newProductlist6 ? console.log(newProductlist6) : console.log('No se encontró el producto con el ID solicitado');


    } catch (error) {
        console.error(error);
    }
}
)();