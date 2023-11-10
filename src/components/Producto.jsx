import React from 'react'
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';


const Producto = ({ producto }) => {

    const { _id, nombre, precio, imagen } = producto;

    const eliminarProducto = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta = await clienteAxios.delete(`/productos/${id}`);
                    Swal.fire(
                        'Eliminado',
                        respuesta.data.mensaje,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: error.response.data.mensaje
                    })
                }
            }
        })
    }

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio} </p>
                <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${imagen}`} />
            </div>
            <div className="acciones">
                <Link to={`/productos/editar-producto/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Producto