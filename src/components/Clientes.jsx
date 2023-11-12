import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios';
import Cliente from './Cliente';
import Spinner from '../components/Spinner';
import useCRM from '../hooks/useCRM';
import { useNavigate } from 'react-router-dom';

const Clientes = () => {

    const { auth } = useCRM();

    const [clientes, setClientes] = useState([]);

    const navigate = useNavigate();

   
    const consultarAPI = async () => {

        if (auth.token !== '') {
            try {
                const clientesConsulta = await clienteAxios.get('/clientes', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setClientes(clientesConsulta.data);


            } catch (error) {
                if (error.response.status === 500) {
                    navigate('/login');
                }
            }
        }else{
            navigate('/login');
        }
        
    }

    useEffect(() => {
        consultarAPI();
    }, []);

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