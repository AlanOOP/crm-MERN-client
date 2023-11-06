import { useState } from 'react'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<HomePage />} />
          {/* <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<Dashboard />} /> */}
          
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
