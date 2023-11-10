import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';


const EditarProducto = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
    });

    const [imagen, setImagen] = useState(null);

    const consultarAPI = async () => {
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);
        setProducto(productoConsulta.data);
        setImagen(productoConsulta.data.imagen);
    }

    useEffect(() => {
        consultarAPI();
    }, []);

    const actualizarState = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const validarBoton = () => {
        // Destructuring
        const { nombre, precio } = producto;

        if (![nombre, precio].includes('')) {
            return false;
        }

        return true;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        // Crear un formdata

        let formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', imagen);

        try {
            const respuesta = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            if (respuesta.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    respuesta.data.mensaje,
                    'success'
                )
            }

            // Redireccionar
            navigate('/productos');

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    return (
        <Layout>

            <h2>Editar Producto</h2>

            <form
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        value={producto.nombre}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        min="0.00"
                        step="0.01"
                        placeholder="Precio"
                        value={producto.precio}
                        onChange={actualizarState}
                    />
                </div>

                {/* imagen preview */}

                <div className="campo">
                    <label>Imagen:</label>
                    {
                        imagen ? (
                            <img
                                src={imagen ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${imagen} `
                                    : URL.createObjectURL(imagen.files[0])}
                                alt="imagen" width="300"
                            />
                        )
                            : null
                    }
                    <input
                        type="file"
                        name="imagen"
                        accept='.jpg,.png,.jpeg, .gif, .webp'
                        onChange={e => setImagen(e.target.files[0])}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarBoton()}
                    />
                </div>
            </form>

        </Layout>
    )
}

export default EditarProducto