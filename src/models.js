class Producto {
  constructor ( id_producto, nombre, descripcion, codigo, foto, precio, stock) {
    this.id_producto = id_producto
    this.nombre = nombre
    this.timestamp = Date.now()
    this.descripcion = descripcion
    this.codigo = codigo
    this.foto = foto
    this.precio = precio
    this.stock = stock
  }
}

class Carrito {
  constructor ( id_carrito ) {
    this.id_carrito = id_carrito
    this.timestamp = Date.now()
    this.productos = []
  }
}

module.exports = {
  Producto,
  Carrito
}