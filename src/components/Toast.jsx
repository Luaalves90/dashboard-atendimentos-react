import { useTema } from '../contexts/TemaContext'
import { useEffect, useState } from 'react'

export default function Toast({ mensagem, tipo = 'success', duracao = 3000, onClose }) {
  const [visivel, setVisivel] = useState(true)
  const { cores, temaEscuro } = useTema()

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(false)
      if (onClose) onClose()
    }, duracao)

    return () => clearTimeout(timer)
  }, [duracao, onClose])

  if (!mensagem || !visivel) return null

  const coresToast = {
    success: temaEscuro ? '#10b981' : '#059669', // verde escuro/claro
    error: temaEscuro ? '#ef4444' : '#dc2626',   // vermelho escuro/claro
    warning: temaEscuro ? '#f59e0b' : '#d97706', // laranja (opcional)
    info: temaEscuro ? '#3b82f6' : '#2563eb'     // azul (opcional)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div
        className="px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-colors duration-300"
        style={{ 
          backgroundColor: coresToast[tipo] || coresToast.success,
          color: '#ffffff',
          border: temaEscuro ? `1px solid ${cores.borda}` : 'none'
        }}
      >
        <span className="text-lg">
          {tipo === 'success' && '✅'}
          {tipo === 'error' && '❌'}
          {tipo === 'warning' && '⚠️'}
          {tipo === 'info' && 'ℹ️'}
        </span>
        <span>{mensagem}</span>
        <button 
          onClick={() => setVisivel(false)}
          className="ml-2 text-white hover:text-gray-200 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  )
}