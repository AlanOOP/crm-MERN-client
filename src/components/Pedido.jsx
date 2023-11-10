import React from 'react'

const Pedido = ({ pedido }) => {

    const { _id, cliente, pedido: productos, total } = pedido;
    console.log(productos)


    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {_id}</p>
                <p className="nombre">{cliente.nombre}</p>

                <p className="productos">Artículos Pedido: </p>
                <div className="articulos-pedido">
                    <ul>
                        {
                            productos.map(producto => (
                                <li key={producto._id}>
                                    <p>{producto.producto.nombre}</p>
                                    <p>Precio: ${producto.producto.precio}</p>
                                    <p>Cantidad: {producto.cantidad}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <p className="total">Total: ${pedido.total} </p>
            </div>
            <div className="acciones">

                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}

export default Pedido