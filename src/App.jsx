import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import NovoCliente from './pages/NovoCliente'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/clientes/novo" element={<NovoCliente />} />
    </Routes>
  )
}

