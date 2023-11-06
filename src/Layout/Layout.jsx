import React from 'react';
import {Outlet, Link } from 'react-router-dom';
import Header from '../components/Header';


const Layout = ({children}) => {
  return (
    <>
        <Header />

        <div className='grid contenedor contenido-principal'>
            <aside className="sidebar col-3">
                <h2>Administración</h2>

                <nav className="navegacion">
                    <Link to="/" className="clientes">Clientes</Link>
                    <Link to="/productos" className="productos">Productos</Link>
                    <Link to="/pedidos" className="pedidos">Pedidos</Link>
                </nav>
            </aside>

            <main className="caja-contenido col-9">
                {children}
            </main>
        </div>

    </>
  )
}

export default Layout