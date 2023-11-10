import React from 'react'
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';

const Cliente = ({ cliente }) => {

    const { _id, nombre, apellido, empresa, email, telefono } = cliente;

    const eliminarCliente = id => {
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
                    const respuesta = await clienteAxios.delete(`/clientes/${id}`);
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
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>
                    {email}
                </p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/editar-cliente/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <Link to={`/pedidos/nuevo-pedido/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-pen-alt"></i>
                    Nuevo Pedido
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Cliente