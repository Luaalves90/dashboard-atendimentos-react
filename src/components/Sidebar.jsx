import { useState } from "react"

export default function Sidebar({ onNavigate }) {
  const [active, setActive] = useState("dashboard")

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
    <aside className="w-64 bg-white border-r min-h-screen hidden md:flex flex-col">
      <div className="p-6 text-xl font-bold text-blue-600">
        AtendeSys
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm
              ${
                active === item.id
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}