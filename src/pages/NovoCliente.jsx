import { useState } from 'react'
import { useTema } from '../contexts/TemaContext'
import toast from 'react-hot-toast' // NOVO

export default function NovoCliente({ onBack }) {
  const { cores } = useTema()
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  })
  const [salvando, setSalvando] = useState(false)

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    // Validação básica
    if (!formData.nome || !formData.email) {
      toast.error('Nome e email são obrigatórios!')
      return
    }

    setSalvando(true)
    
    // Simula salvamento (depois troca por API real)
    const toastId = toast.loading('Salvando cliente...')
    
    setTimeout(() => {
      // Sucesso!
      toast.dismiss(toastId)
      toast.success('Cliente cadastrado com sucesso! 🎉')
      setSalvando(false)
      
      // Limpa o formulário e volta após 1.5s
      setTimeout(() => {
        onBack()
      }, 1500)
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg transition-colors duration-300"
          style={{ 
            backgroundColor: cores.hover,
            color: cores.texto
          }}
        >
          ← Voltar
        </button>
        <h2 
          className="text-xl font-semibold transition-colors duration-300"
          style={{ color: cores.texto }}
        >
          Novo Cliente
        </h2>
      </div>

      <div 
        className="max-w-2xl rounded-lg shadow-sm border p-6 transition-colors duration-300"
        style={{ 
          backgroundColor: cores.bgCard,
          borderColor: cores.borda
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: cores.texto }}
            >
              Nome Completo *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
              style={{ 
                backgroundColor: cores.bgPrincipal,
                borderColor: cores.borda,
                color: cores.texto
              }}
              placeholder="Digite o nome completo"
              disabled={salvando}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: cores.texto }}
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
              style={{ 
                backgroundColor: cores.bgPrincipal,
                borderColor: cores.borda,
                color: cores.texto
              }}
              placeholder="Digite o email"
              disabled={salvando}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: cores.texto }}
            >
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border transition-colors duration-300"
              style={{ 
                backgroundColor: cores.bgPrincipal,
                borderColor: cores.borda,
                color: cores.texto
              }}
              placeholder="(11) 99999-9999"
              disabled={salvando}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={salvando}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300"
              style={{ 
                backgroundColor: salvando ? '#9CA3AF' : '#3B82F6',
                cursor: salvando ? 'wait' : 'pointer'
              }}
            >
              {salvando ? 'Salvando...' : 'Salvar Cliente'}
            </button>
            <button
              type="button"
              onClick={onBack}
              disabled={salvando}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
              style={{ 
                backgroundColor: 'transparent',
                border: `1px solid ${cores.borda}`,
                color: cores.texto,
                cursor: salvando ? 'wait' : 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}