import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const EditarCliente = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Obtener el cliente a editar

    const consultarAPI = async () => {
        try {
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            setCliente(resultado.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    useEffect(() => {
        consultarAPI();
    }, []);

    // Leer los datos del formulario

    const actualizarState = e => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    //validar boton

    const validarBoton = () => {
        // Destructuring
        const { nombre, apellido, empresa, email, telefono } = cliente;

        // Revisar que las propiedades del state tengan contenido
        if (![nombre, apellido, empresa, email, telefono].includes('')) {
            return false;
        }

        return true;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        // Agregar a la API

        const { nombre, apellido, empresa, email, telefono } = cliente;

        try {
            const respuesta = await clienteAxios.put(`/clientes/${id}`, {
                nombre,
                apellido,
                empresa,
                email,
                telefono
            });

            // Lanzar una alerta

            if (respuesta.status === 200) {
                Swal.fire(
                    'Actualizado Correctamente',
                    respuesta.data.mensaje,
                    'success'
                )
            }

            // Redireccionar
            navigate('/');
        } catch (error) {

            //mostrar alerta

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }
    return (
        <Layout>
            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={handleSubmit}
            >
                <legend> Llena todos los campos </legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        value={cliente.apellido}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        value={cliente.empresa}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        value={cliente.email}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarBoton()}
                    />
                </div>

            </form>
        </Layout>
    )
}

export default EditarCliente