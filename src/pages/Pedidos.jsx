import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import clienteAxios from '../config/clienteAxios';
import Spinner from '../components/Spinner';
import Pedido from '../components/Pedido';

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const pedidosConsulta = await clienteAxios.get('/pedidos');
            setPedidos(pedidosConsulta.data);
        }
        consultarAPI();
    }, [])

    return (
        <Layout>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {
                    pedidos && pedidos.length > 0 ?
                        pedidos.map(pedido => (
                            <Pedido
                                key={pedido._id}
                                pedido={pedido}
                            />
                        ))
                        :
                        <Spinner />
                }
            </ul>
        </Layout>
    )
}

export default Pedidos