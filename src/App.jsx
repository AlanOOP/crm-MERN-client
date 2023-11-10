import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Pages
import HomePage from './pages/HomePage';
import NuevoCliente from './pages/NuevoCliente';
import EditarCliente from './pages/EditarCliente';
import Productos from './pages/Productos';
import NuevoProducto from './pages/NuevoProducto';
import EditarProducto from './pages/EditarProducto';
import NuevoPedido from './pages/NuevoPedido';

import Pedidos from './pages/Pedidos';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<HomePage />} />
          <Route path='/nuevo-cliente' element={<NuevoCliente />} />
          <Route path='/editar-cliente/:id' element={< EditarCliente />} />

          <Route path='/productos' element={<Productos />} />
          <Route path='/productos/nuevo-producto' element={<NuevoProducto />} />
          <Route path='/productos/editar-producto/:id' element={<EditarProducto />} />

          <Route path='/pedidos/nuevo-pedido/:id' element={<NuevoPedido />} />

          <Route path='/pedidos' element={<Pedidos />} />

          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
