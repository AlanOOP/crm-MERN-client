import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
import Error from '../components/Error';
import useCRM from '../hooks/useCRM';


const Login = () => {

    const navigate = useNavigate(); 

    const {auth, setAuth} = useCRM();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    //funcion para desacivar boton

    const isValidate = () => {
        return [email, password].includes('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const usuario = { 
            email: email,
            password: password 
        };

        try {
            const respuesta = await clienteAxios.post('/login', usuario);

            const { token } = respuesta.data.usuario;
            localStorage.setItem('token', token);

            setAuth({
                token: token,
                auth: true
            });


            Swal.fire(
                'Login Correcto',
                'Has iniciado sesión',
                'success'
            )
                
            navigate('/');

        } catch (error) {
            
            //comprobar si es error del back end
            if(error.response){
                setError(error.response.data.mensaje);
            }else{
                setError('Hubo un error');
            }
               
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

export default Login