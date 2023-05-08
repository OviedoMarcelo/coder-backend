# Proyecto de Backend para E-commerce
 

### Pre-requisitos 📋

_Este proyecto fue creado con Node.js, Express y Mongoose para conectarse con una base Mongo en la nube. Para su correcto funcionamiento es necesario tener instaladas las siguientes dependencias:_

```
Node.js v18.16.0.
Express v4.18.2
Mongoose v7.1.0
```
## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Instalación 🔧

_Clonar este repositorio en su máquina local utilizando el siguiente comando:_

```
git clone https://github.com/OviedoMarcelo/coder-backend.git
```

Abrir la terminal y ubicarse en la carpeta raíz del proyecto.

Ejecutar el siguiente comando para instalar las dependencias necesarias:

```
npm install
```
En el navegador, ir a la siguiente dirección:

```
http://localhost:8080/
```

## Funcionalidades ⚙️

_Este proyecto es un backend para un e-commerce y cuenta con los siguientes métodos:_

*GET /products: devuelve un array con todos los productos disponibles.
*GET /products/:id: devuelve un objeto con el producto correspondiente al id indicado.
*POST /products: crea un nuevo producto y lo agrega al array de productos.
*PUT /products/:id: actualiza la información del producto correspondiente al id indicado.
*DELETE /products/:id: elimina el producto correspondiente al id indicado.

_Todos los datos son almacenados temporalmente en un array en memoria. El formato de los productos es el siguiente:_

```
{
  "id": 1,
  "title": "iPhone 13 Pro",
  "price": 1499.99,
  "thumbnail": "https://www.apple.com/iphone-13-pro/",
  "description": "El iPhone 13 Pro es el mejor smartphone del mercado."
}
```

