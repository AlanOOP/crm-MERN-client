import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
import Error from '../components/Error';
import useCRM from '../hooks/useCRM';


const Registro = () => {
    const navigate = useNavigate(); 

    const {auth, setAuth} = useCRM();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    //funcion para desacivar boton

    const isValidate = () => {
        return [nombre, apellido, email, password].includes('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const usuario = { 
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
        };

        try {
            const respuesta = await clienteAxios.post('/register', usuario);

            

            Swal.fire(
                'Registro Correcto',
                'Has registrado correctamente',
                'success'
            )
                
            navigate('/');

        } catch (error) {
            
            setError(error.response.data.mensaje);
               
        }

        //pasarlo al action
    }
  return (
    <div className='login'>
            <h2>Iniciar Sesión</h2>

            <div className='contenedor-formulario '>


                <form
                    className='contenido-form'
                    onSubmit={handleSubmit}
                >
                
                    {
                        error && <Error mensaje={error} />
                    }

                    
                    {/* campo para el nombre */}

                    <div className='campo'>
                        <label htmlFor="nombre">Nombre:</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre" 
                            placeholder='Tu Nombre'
                            defaultValue={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />

                    </div>

                    <div className='campo'>
                        <label htmlFor="apellido">Apellido:</label>
                        <input 
                            type="text" 
                            name="apellido" 
                            id="apellido" 
                            placeholder='Tu Apellido'
                            defaultValue={apellido}
                            onChange={e => setApellido(e.target.value)}
                        />

                    </div>

                    <div className='campo'>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder='Tu Email'
                            defaultValue={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Tu Password'
                            defaultValue={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </div>

                    <Link to={'/register'} className='link m-2'>
                    ¿Aún no tienes cuenta? Registrate
                    </Link>

                    <input
                        type="submit"
                        className='btn btn-azul '
                        value='Iniciar Sesión'
                        disabled={isValidate()}
                    />
                </form>
            </div>
        </div>
  )
}

export default Registro