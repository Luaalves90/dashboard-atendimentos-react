import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { salvarCliente } from '../utils/clientes'

export default function NovoCliente() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    salvarCliente({
      nome,
      email,
      telefone,
    })

    navigate('/clientes')
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      
      {/* Botão Voltar */}
      <button
        onClick={() => navigate('/clientes')}
        className="mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Voltar para Clientes
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Cadastrar Novo Cliente
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Telefone</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/clientes')}
            className="px-4 py-2 border rounded-lg"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Salvar Cliente
          </button>
        </div>
      </form>
    </div>
  )
}