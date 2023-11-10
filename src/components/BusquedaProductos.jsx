import React from 'react';
import clienteAxios from '../config/clienteAxios';

const BusquedaProductos = ({ productos, setProducto, producto }) => {

    const { _id } = productos;

    const agregarProducto = async () => {

        try {
            const respuesta = await clienteAxios.get(`/productos/${_id}`);

            if (respuesta.data) {
                let nuevoProducto = respuesta.data;
                nuevoProducto.producto = respuesta.data._id;

                const productoExiste = producto.find(p => p.producto === nuevoProducto.producto);

                if (productoExiste) {
                    const productoCopia = [...producto];
                    const indice = productoCopia.findIndex(p => p.producto === nuevoProducto.producto);
                    productoCopia[indice].cantidad += 1;
                    setProducto(productoCopia);
                } else {
                    nuevoProducto.cantidad = 1;
                    setProducto([
                        ...producto,
                        nuevoProducto
                    ]);
                }
            }

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <li className="producto"

        >
            <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${productos.imagen}`}
                width={100}
                height={100}
            />
            <div className="info-producto">
                <p className="nombre">{productos.nombre}</p>
                <p className="precio">Precio: {productos.precio} </p>
            </div>
            <div className="butto-agregar">
                <button
                    type="button"
                    className="btn btn-amarillo"
                    onClick={() => agregarProducto()}
                >
                    <i className="fas fa-plus-circle"></i>
                    Agregar Pedido
                </button>
            </div>
        </li>
    )
}

export default BusquedaProductos