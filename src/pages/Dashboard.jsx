import { useState } from "react"
import { useTema } from '../contexts/TemaContext'
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Atendimentos from "./Atendimentos"
import Clientes from "./Clientes"
import NovoCliente from "./NovoCliente"
import Graficos from "../components/Graficos"
import GraficosAvancados from '../components/GraficosAvancados'
import ExportarDados from '../components/ExportarDados'

export default function Dashboard() {
  const [page, setPage] = useState("dashboard")
  const { cores } = useTema()

  // Dados de exemplo para clientes (para testar exportação)
  const clientesExemplo = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999', status: 'Ativo' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 98888-8888', status: 'Ativo' },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com', telefone: '(11) 97777-7777', status: 'Inativo' },
  ]

  // Dados para exportação dos gráficos
  const dadosDashboard = {
    metricas: {
      atendimentosHoje: 24,
      clientesAtivos: 312,
      taxaRetorno: 78,
      mediaAtendimentos: 22.5,
      satisfacao: 92
    },
    graficos: [
      { nome: 'Gráfico 1', tipo: 'linha' },
      { nome: 'Gráfico 2', tipo: 'barra' }
    ]
  }

  function renderPage() {
    if (page === "atendimentos") return <Atendimentos />
    if (page === "clientes")
      return <Clientes onNovoCliente={() => setPage("novo-cliente")} />
    if (page === "novo-cliente")
      return <NovoCliente onBack={() => setPage("clientes")} />

    // Página inicial com cards e gráficos
    return (
      <div className="p-6">
        {/* Título da seção */}
        <h2 
          className="text-xl font-semibold mb-4 transition-colors duration-300 animate-fadeInUp"
          style={{ color: cores.texto }}
        >
          Visão Geral
        </h2>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Atendimentos Hoje */}
          <div 
            className="p-6 rounded-lg shadow-sm border transition-all duration-300 animate-fadeInUp delay-100"
            style={{ 
              backgroundColor: cores.bgCard,
              borderColor: cores.borda,
              color: cores.texto
            }}
          >
            <p className="text-sm" style={{ color: cores.textoSecundario }}>
              Atendimentos Hoje
            </p>
            <p className="text-2xl font-bold mt-1" style={{ color: cores.texto }}>
              24
            </p>
          </div>

          {/* Card 2 - Clientes Ativos */}
          <div 
            className="p-6 rounded-lg shadow-sm border transition-all duration-300 animate-fadeInUp delay-200"
            style={{ 
              backgroundColor: cores.bgCard,
              borderColor: cores.borda,
              color: cores.texto
            }}
          >
            <p className="text-sm" style={{ color: cores.textoSecundario }}>
              Clientes Ativos
            </p>
            <p className="text-2xl font-bold mt-1" style={{ color: cores.texto }}>
              312
            </p>
          </div>

          {/* Card 3 - Taxa de Retorno */}
          <div 
            className="p-6 rounded-lg shadow-sm border transition-all duration-300 animate-fadeInUp delay-300"
            style={{ 
              backgroundColor: cores.bgCard,
              borderColor: cores.borda,
              color: cores.texto
            }}
          >
            <p className="text-sm" style={{ color: cores.textoSecundario }}>
              Taxa de Retorno
            </p>
            <p className="text-2xl font-bold mt-1" style={{ color: cores.texto }}>
              78%
            </p>
          </div>
        </div>

        {/* Seção de Gráficos */}
        <div className="mt-8">
          {/* Cabeçalho com botões */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 
              className="text-xl font-semibold transition-colors duration-300 animate-fadeInUp delay-400"
              style={{ color: cores.texto }}
            >
              📊 Análise de Dados
            </h2>
            
            {/* Botões de exportação */}
            <div className="animate-fadeInUp delay-450">
              <ExportarDados 
                clientes={clientesExemplo}
                dadosGraficos={dadosDashboard}
              />
            </div>
          </div>
          
          {/* Gráficos */}
          <div className="animate-fadeInUp delay-500">
            <Graficos />
            <div className="mt-8">
              <GraficosAvancados />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar onNavigate={setPage} />

      <main 
        className="flex-1 min-h-screen transition-colors duration-300"
        style={{ backgroundColor: cores.bgPrincipal }}
      >
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