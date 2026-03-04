import { useState } from "react"
import { useTema } from '../contexts/TemaContext'

export default function Sidebar({ onNavigate }) {
  const [active, setActive] = useState("dashboard")
  const { cores, temaEscuro } = useTema()

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "atendimentos", label: "Atendimentos", icon: "📋" },
    { id: "clientes", label: "Clientes", icon: "👥" }
  ]

  function handleClick(item) {
    setActive(item.id)
    onNavigate(item.id)
  }

  return (
    <aside 
      className="w-64 min-h-screen border-r hidden md:flex flex-col transition-colors duration-300"
      style={{ 
        backgroundColor: cores.bgCard,
        borderColor: cores.borda
      }}
    >
      <div 
        className="p-6 text-xl font-bold transition-colors duration-300"
        style={{ color: temaEscuro ? '#60A5FA' : '#2563EB' }} // azul mais claro no escuro, azul normal no claro
      >
        TargetView
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menu.map(item => {
          const isActive = active === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors duration-300"
              style={{
                backgroundColor: isActive 
                  ? temaEscuro ? '#1E3A5F' : '#DBEAFE' // azul escuro ou azul claro
                  : 'transparent',
                color: isActive
                  ? temaEscuro ? '#93C5FD' : '#1E40AF' // azul claro ou azul escuro
                  : cores.texto,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = cores.hover
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent'
                }
              }}
            >
              <span>{item.icon}</span>
              <span style={{ 
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? temaEscuro ? '#93C5FD' : '#1E40AF'
                  : cores.texto
              }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}