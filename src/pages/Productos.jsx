import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import Producto from '../components/Producto';
import clienteAxios from '../config/clienteAxios';
import Spinner from '../components/Spinner';

const Productos = () => {

    const [productos, setProductos] = useState([]);

    const consultarAPI = async () => {
        const productosConsulta = await clienteAxios.get('/productos');
        setProductos(productosConsulta.data);
    }

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Layout>
            <h2>Productos</h2>

            <Link to="/productos/nuevo-producto" className="btn btn-verde nvo-cliente">
                {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {
                    productos.length > 0 ? (
                        productos.map(producto => (
                            <Producto
                                key={producto._id}
                                producto={producto}
                            />
                        ))
                    ) : (
                        <Spinner />
                    )
                }
            </ul>


        </Layout>
    )
}

export default Productos