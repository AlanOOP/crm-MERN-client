import React from 'react'
import Layout from '../Layout/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Clientes from '../components/Clientes'


const HomePage = () => {
  return (
    <Layout>
        <h2>Clientes</h2>

        <a href="nuevo-cliente.html" className="btn btn-verde nvo-cliente"> 
        {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
            Nuevo Cliente
        </a>

        <Clientes />
        
    </Layout>
  )
}

export default HomePage