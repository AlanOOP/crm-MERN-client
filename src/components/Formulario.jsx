import React from 'react'

const Formulario = ({ buscarProducto, leerDatosBusqueda }) => {
    return (
        <form

        >
            <legend>Busca un Producto y agrega una cantidad</legend>

            <div className="campo">
                <label>Productos:</label>
                <input
                    type="text"
                    placeholder="Nombre Productos" name="productos"
                    onChange={leerDatosBusqueda}
                />
            </div>

            <button
                type="submit"
                className="btn btn-azul btn-block"
                onClick={buscarProducto}
            >
                Buscar Producto
            </button>

        </form>
    )
}

export default Formulario