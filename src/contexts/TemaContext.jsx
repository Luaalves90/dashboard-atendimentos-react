import { createContext, useState, useContext, useEffect } from 'react';

// Criando o contexto
const TemaContext = createContext();

// Provider do tema
export function TemaProvider({ children }) {
  // Verifica se há preferência salva no localStorage
  const [temaEscuro, setTemaEscuro] = useState(() => {
    const temaSalvo = localStorage.getItem('temaEscuro')
    return temaSalvo ? JSON.parse(temaSalvo) : false
  });

  // Função para alternar o tema
  const toggleTema = () => {
    setTemaEscuro(!temaEscuro)
  }

  // Salvar preferência no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('temaEscuro', JSON.stringify(temaEscuro))
  }, [temaEscuro])

  // Cores baseadas no tema
  const cores = {
    bgPrincipal: temaEscuro ? '#111827' : '#F3F4F6', // fundo principal
    bgCard: temaEscuro ? '#1F2937' : '#FFFFFF',     // fundo dos cards
    texto: temaEscuro ? '#F9FAFB' : '#111827',      // texto principal
    textoSecundario: temaEscuro ? '#9CA3AF' : '#6B7280', // texto secundário
    borda: temaEscuro ? '#374151' : '#E5E7EB',      // bordas
    hover: temaEscuro ? '#374151' : '#F3F4F6',       // hover states
    azul: temaEscuro ? '#60A5FA' : '#3B82F6'         // azul (títulos, botões)
  }

  return (
    <TemaContext.Provider value={{ 
      temaEscuro, 
      toggleTema, 
      cores 
    }}>
      {children}
    </TemaContext.Provider>
  )
}

// Hook personalizado para usar o tema
export function useTema() {
  const context = useContext(TemaContext)
  
  // Se não houver contexto, significa que o componente não está dentro do TemaProvider
  if (!context) {
    throw new Error('useTema deve ser usado dentro de um TemaProvider')
  }
  
  return context
}