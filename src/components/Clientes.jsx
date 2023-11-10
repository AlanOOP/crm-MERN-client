import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios';
import Cliente from './Cliente';
import Spinner from '../components/Spinner'

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');
        setClientes(clientesConsulta.data);
    }

    useEffect(() => {
        consultarAPI();
    }, [clientes]);

    return (
        <ul className="listado-clientes">
            {
                clientes && clientes.length === 0 ? <Spinner /> : clientes.map(cliente => (
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))
            }
        </ul>
    )
}

export default Clientes;