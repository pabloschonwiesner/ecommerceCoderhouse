const fs = require('fs')
const path = require('path')
const { Carrito } = require('./../models')

class CarritosRepository {

  carritos = []

  async leerArchivo () {
    try {
      let contenido = await fs.promises.readFile( path.resolve(__dirname, './carritos.txt'), 'utf-8')
      this.carritos = JSON.parse(contenido)
      return
    } catch ( err ) { throw err }
  }

  async grabarArchivo () {
    try {
      await fs.promises.writeFile( path.resolve(__dirname, './carritos.txt'), JSON.stringify(this.carritos, null, '\t'), 'utf-8')
      return 
    } catch ( err ) { throw err }
  }

  async addCarrito ( id_carrito ) {
    try {
      await this.leerArchivo()
      this.carritos.push( new Carrito(id_carrito) )
      await this.grabarArchivo()
      return true
    } catch ( err ) { throw err }
  }

  async getCarritos ( id_carrito ) {
    try {
      await this.leerArchivo()

      if( id_carrito ) {
        let carrito = this.carritos.find( item => Number(item.id_carrito) == Number(id_carrito))
        if(!carrito) {
          return undefined
        }
        return carrito
      } else {
        return this.carritos
      }
    } catch ( err ) { throw err }
  }

  async addProductoCarrito ( id_carrito, producto ) {
    try {
      await this.leerArchivo()
      let indexArray = this.carritos.findIndex( item => Number(item.id_carrito) == Number(id_carrito))
      this.carritos[indexArray].productos.push( producto )
      await this.grabarArchivo()
      return true
    } catch ( err ) { throw err }
  }

  async deleteProductoCarrito ( id_carrito, id_producto ) {
    try {
      await this.leerArchivo()
      let indexArrayCarrito = this.carritos.findIndex( item => Number(item.id_carrito) == Number(id_carrito))
      if(indexArrayCarrito < 0) {
        throw Error('No existe el carrito')
      }

      let indexArrayProductos = this.carritos[indexArrayCarrito].productos.findIndex( item => Number(item.id_producto) == Number(id_producto))
      if(indexArrayProductos < 0) {
        throw Error('No existe el producto')
      }

      this.carritos[indexArrayCarrito].productos.splice(indexArrayProductos, 1)
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

module.exports = CarritosRepository