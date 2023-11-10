import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Formulario from '../components/Formulario';
import clienteAxios from '../config/clienteAxios';
import { useNavigate, useParams } from 'react-router-dom';
import BusquedaProductos from '../components/BusquedaProductos';
import ResumenProductos from '../components/ResumenProductos';
import { formatearDinero } from '../../helpers';
import Swal from 'sweetalert2';


const NuevoPedido = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [cliente, setCliente] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState([]);
    const [total, setTotal] = useState(0);

    const totalPagar = formatearDinero(total);

    const consultarCliente = async () => {
        const resultado = await clienteAxios.get(`/clientes/${id}`);
        setCliente(resultado.data);
    }

    useEffect(() => {
        consultarCliente();
        actualizarTotal();
    }, [producto]);

    const actualizarTotal = () => {
        if (producto.length === 0) {
            setTotal(0);
            return;
        }
        let nuevoTotal = 0;
        producto.map(producto => nuevoTotal += (producto.cantidad * producto.precio))
        // nuevoTotal = formatearDinero(nuevoTotal);
        setTotal(nuevoTotal);
    }

    const aumentarCantidad = (i) => {
        const productoCopia = [...producto];
        productoCopia[i].cantidad += 1;
        setProducto(productoCopia);
    }

    const disminuirCantidad = (i) => {
        const productoCopia = [...producto];
        if (productoCopia[i].cantidad === 1) return;
        productoCopia[i].cantidad -= 1;
        setProducto(productoCopia);
    }

    const buscarProducto = async (e) => {
        e.preventDefault();

        try {
            const resultado = await clienteAxios.post(`/productos/buscar?nombre=${busqueda}`)

            if (resultado.data[0]) {
                setProductos(resultado.data);
            } else {
                setProductos([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const leerDatosBusqueda = e => {
        setBusqueda(e.target.value);
    }

    const eliminarProducto = (id) => {
        const productoCopia = producto.filter(producto => producto._id !== id);
        setProducto(productoCopia);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const pedido = {
            cliente: id,
            pedido: producto,
            total: total
        }

        try {
            const resultado = await clienteAxios.post('/pedidos', pedido);

            if (resultado.status === 200) {
                Swal.fire(
                    'Correcto',
                    resultado.data.mensaje,
                    'success'
                )
            }

            navigate('/pedidos');

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    return (
        <Layout>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}  </p>
                <p>{cliente.telefono}</p>
            </div>

            <Formulario
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <h3 className="text-center my-5">Resultados:</h3>
            {
                productos.length === 0 ? (
                    <p className="text-center">No hay resultados</p>
                ) : (
                    <ul className="list-group mt-5">
                        {productos.map(productos => (

                            <BusquedaProductos
                                key={productos._id}
                                productos={productos}
                                setProducto={setProducto}
                                producto={producto}
                            />
                        ))}
                    </ul>
                )
            }

            <h3 className="text-center my-5">Resumen y Cantidades</h3>
            <ul className="resumen">
                {
                    producto.length > 0 ? (
                        producto.map((producto, index) => (
                            <ResumenProductos
                                key={producto.producto}
                                producto={producto}
                                aumentarCantidad={aumentarCantidad}
                                disminuirCantidad={disminuirCantidad}
                                index={index}
                                eliminarProducto={eliminarProducto}
                            />
                        ))
                    ) : null
                }
            </ul>

            <div className="campo">
                <p className='total'> Total: <span>{totalPagar}</span></p>
            </div>

            {
                total > 0 &&
                <form
                    onSubmit={handleSubmit}
                >
                    <input type="submit" className="btn btn-verde btn-block" value="Realizar Pedido" />
                </form>
            }

        </Layout>
    )
}

export default NuevoPedido;