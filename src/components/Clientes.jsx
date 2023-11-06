import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios';


const Clientes = () => {

    const [clientes, setClientes ] = useState([]);

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');
        setClientes(clientesConsulta.data);
    }

    useEffect(() => {
        consultarAPI();
    }, [])

  return (
    <ul className="listado-clientes">

        {
            clientes && clientes.map(cliente => (
                <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{cliente.nombre} {cliente.apellido}</p>
                        <p className="empresa">{cliente.empresa}</p>
                        <p>
                            {cliente.email}
                        </p>
                        <p>Tel: {cliente.telefono}</p>
                    </div>
                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </a>
                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
            ))
        }
        </ul>
  )
}

export default Clientes