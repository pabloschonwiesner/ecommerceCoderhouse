const fs = require('fs')
const path = require('path')
const { Producto } = require('./../models')

class ProductosRepository {

  productos = []
  id_producto = 1

  async leerArchivo () {
    try {
      let contenido = await fs.promises.readFile( path.resolve(__dirname, './productos.txt'), 'utf-8')
      this.productos = JSON.parse(contenido)
      return
    } catch ( err ) { throw err }
  }

  async grabarArchivo () {
    try {
      await fs.promises.writeFile( path.resolve(__dirname, './productos.txt'), JSON.stringify(this.productos, null, '\t'), 'utf-8')
      return 
    } catch ( err ) { throw err }
  }

  getId () {
    return this.id_producto++
  }

  async getProductos ( id_producto ) {
    try {
      await this.leerArchivo()

      if( id_producto ) {
        let producto = this.productos.find( item => Number(item.id_producto) == Number(id_producto))
        if(!producto) {
          throw Error('No existe el producto')
        }
        return producto
      } else {
        return this.productos
      }
    } catch ( err ) { throw err }
  }

  async addProducto ( producto ) {
    try {
      await this.leerArchivo()
      this.productos.push( new Producto ( 
        this.getId(), 
        producto.nombre, 
        producto.descripcion, 
        producto.codigo, 
        producto.foto, 
        producto.precio, 
        producto.stock
      ))
      await this.grabarArchivo()
      return true
    } catch ( err ) { throw err }
  }

  async updateProducto ( id_producto, producto ) {
    try {
      await this.leerArchivo()
      let indexArray = await this.productos.findIndex ( item => Number(item.id_producto) == Number(id_producto))
      if(indexArray < 0) {
        throw Error('No existe el producto')
      }
      producto.id_producto = Number(id_producto)
      this.productos[indexArray] = producto
      await this.grabarArchivo()
      return true
    } catch ( err ) { throw err }
  }

  async deleteProducto ( id_producto ) {
    try {
      await this.leerArchivo()
      let indexArray = await this.productos.findIndex ( item => Number(item.id_producto) == Number(id_producto))
      if(indexArray < 0) {
        throw Error('No existe el producto')
      }
      
      this.productos.splice(indexArray, 1)
      await this.grabarArchivo()
      return true
    } catch ( err ) { throw err }
  }

}

module.exports = ProductosRepository