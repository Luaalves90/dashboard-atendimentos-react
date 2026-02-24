import { useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Atendimentos from "./Atendimentos"
import Clientes from "./Clientes"
import NovoCliente from "./NovoCliente"

export default function Dashboard() {
  const [page, setPage] = useState("dashboard")

  function renderPage() {
  if (page === "atendimentos") return <Atendimentos />

  if (page === "clientes")
    return <Clientes onNovoCliente={() => setPage("novo-cliente")} />

  if (page === "novo-cliente")
    return <NovoCliente onBack={() => setPage("clientes")} />

  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Atendimentos Hoje</p>
          <p className="text-2xl font-bold">24</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Clientes Ativos</p>
          <p className="text-2xl font-bold">312</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Taxa de Retorno</p>
          <p className="text-2xl font-bold">78%</p>
        </div>
      </div>
    </section>
  )
}

  return (
    <div className="flex">
      <Sidebar onNavigate={setPage} />

      <main className="flex-1 bg-gray-100 min-h-screen">
        <Header
          title={
            page === "dashboard"
              ? "Visão Geral"
              : page === "atendimentos"
              ? "Atendimentos"
              : "Clientes"
          }
        />

        {renderPage()}
      </main>
    </div>
  )
}