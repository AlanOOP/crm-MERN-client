import React from 'react'
import Layout from '../Layout/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Clientes from '../components/Clientes'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <Layout>
        <h2>Clientes</h2>

        <Link to="/nuevo-cliente" className="btn btn-verde nvo-cliente"> 
        {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
            Nuevo Cliente
        </Link>

        <Clientes />
        
    </Layout>
  )
}

export default HomePage