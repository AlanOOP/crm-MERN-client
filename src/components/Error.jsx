import React from 'react'

const Error = ({mensaje}) => {
  return (
    <div
        className='alerta-error'
    >
        <p className='alert alert-danger error'>{mensaje}</p>
    </div>
  )
}

export default Error