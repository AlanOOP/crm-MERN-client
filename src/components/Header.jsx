import React from 'react';

import useCRM from '../hooks/useCRM';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const {auth , setAuth} = useCRM();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setAuth({
      token: '',
      auth: false
    });

    localStorage.setItem('token', '');

    navigate('/login');
  }

  return (
    <header className="barra">
      <div className="contenedor">
        <div  className='contenido-barra'>
          <h1>CRM - Administrador de Clientes</h1>

          {
            auth.auth ? (
              <button
                type='button'
                className='btn btn-rojo'
                onClick={cerrarSesion}
              >
                <i className="fas fa-sign-out-alt"></i>
                Cerrar Sesión
              </button>
            ) : null
          }

        </div>
      </div>
    </header>
  )
}

export default Header