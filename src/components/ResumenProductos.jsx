import React, { useEffect } from 'react'

const ResumenProductos = ({ producto, aumentarCantidad, disminuirCantidad, index , eliminarProducto}) => {

    const { _id, nombre, precio, imagen, cantidad } = producto;


    return (
        <li>
            <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${imagen}`}
                width={100}
                height={100}
            />
            <div className="texto-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i
                        className="fas fa-minus"
                        onClick={() => disminuirCantidad(index)}
                    >
                        -
                    </i>
                    <input
                        type="text"
                        name="cantidad"
                        readOnly 
                        value={cantidad}
                    />
                    <i
                        className="fas fa-plus"
                        onClick={() => aumentarCantidad(index)}
                    >
                        +
                    </i>

                </div>
                <button type="button" className="btn btn-rojo"
                    onClick={() => eliminarProducto(_id)}
                >
                    <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>

    )
}

export default ResumenProductos