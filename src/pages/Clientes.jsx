import { useState } from 'react'
import { useTema } from '../contexts/TemaContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import ExportarDados from '../components/ExportarDados'

// Função para gerar 50 clientes fictícios
function gerarClientesIniciais() {
  const nomes = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Souza', 'Carlos Lima',
    'Beatriz Costa', 'Rafael Almeida', 'Juliana Ferreira', 'Lucas Rodrigues', 'Fernanda Gomes',
    'Marcos Paulo', 'Patrícia Nunes', 'Ricardo Mendes', 'Camila Rocha', 'Gustavo Castro',
    'Amanda Cardoso', 'Bruno Teixeira', 'Larissa Dias', 'Eduardo Barbosa', 'Tatiana Pinto',
    'Fábio Correia', 'Vanessa Freitas', 'André Barros', 'Cristina Melo', 'Leandro Azevedo',
    'Natália Fogaça', 'Thiago Neves', 'Aline Pires', 'Diego Ramos', 'Priscila Lopes',
    'Alexandre Vargas', 'Renata Monteiro', 'Rodrigo Antunes', 'Carolina Assis', 'Daniel Duarte',
    'Mariana Franco', 'Leonardo Caldas', 'Luciana Mendonça', 'Felipe Cardoso', 'Gabriela Sá',
    'Henrique Barreto', 'Isabela Peixoto', 'Otávio Fontes', 'Clara Nascimento', 'Sérgio Bittencourt',
    'Elisa Andrade', 'Vitor Hugo', 'Bianca Moura', 'Jorge Luiz', 'Helena Campos'
  ]

  const emails = [
    '@gmail.com', '@hotmail.com', '@yahoo.com.br', '@outlook.com', '@empresa.com.br'
  ]

  const telefones = [
    '(11) 9', '(21) 9', '(31) 9', '(41) 9', '(51) 9', '(61) 9', '(71) 9', '(81) 9', '(91) 9'
  ]

  const clientes = []
  
  for (let i = 0; i < 50; i++) {
    const nome = nomes[i % nomes.length] + (i >= nomes.length ? ` ${Math.floor(i/nomes.length) + 1}` : '')
    const emailDomain = emails[Math.floor(Math.random() * emails.length)]
    const email = nome.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '') + emailDomain
    const dddTelefone = telefones[Math.floor(Math.random() * telefones.length)]
    const numero = Math.floor(10000000 + Math.random() * 90000000)
    const status = Math.random() > 0.3 ? 'Ativo' : 'Inativo'
    
    clientes.push({
      id: i + 1,
      nome: nome,
      email: email,
      telefone: `${dddTelefone}${numero}`,
      status: status
    })
  }
  
  return clientes
}

// Gerar os 50 clientes
const CLIENTES_INICIAIS = gerarClientesIniciais()

export default function Clientes({ onNovoCliente }) {
  const { cores, temaEscuro } = useTema()
  const [clientes, setClientes] = useState(CLIENTES_INICIAIS)
  const [termoBusca, setTermoBusca] = useState('')
  
  // Estados para paginação
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 10
  
  // Estados para o modal de edição
  const [modalAberto, setModalAberto] = useState(false)
  const [clienteEditando, setClienteEditando] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    status: 'Ativo'
  })

  // Dados para os gráficos
  const dadosStatus = [
    { name: 'Ativos', valor: clientes.filter(c => c.status === 'Ativo').length },
    { name: 'Inativos', valor: clientes.filter(c => c.status === 'Inativo').length }
  ]

  // Dados para exportação
  const dadosGraficosClientes = {
    metricas: {
      totalClientes: clientes.length,
      clientesAtivos: clientes.filter(c => c.status === 'Ativo').length,
      clientesInativos: clientes.filter(c => c.status === 'Inativo').length,
      taxaAtivacao: Math.round((clientes.filter(c => c.status === 'Ativo').length / clientes.length) * 100)
    }
  }

  // Função para alternar status
  function toggleStatus(clienteId, statusAtual) {
    const novoStatus = statusAtual === 'Ativo' ? 'Inativo' : 'Ativo'
    
    const clientesAtualizados = clientes.map(cliente =>
      cliente.id === clienteId
        ? { ...cliente, status: novoStatus }
        : cliente
    )
    
    setClientes(clientesAtualizados)
    toast.success(`Cliente ${novoStatus === 'Ativo' ? 'ativado' : 'inativado'} com sucesso!`)
  }

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente => {
    const termo = termoBusca.toLowerCase()
    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.email.toLowerCase().includes(termo) ||
      cliente.telefone.toLowerCase().includes(termo) ||
      cliente.status.toLowerCase().includes(termo)
    )
  })

  // Paginação
  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina)
  const inicio = (paginaAtual - 1) * itensPorPagina
  const fim = inicio + itensPorPagina
  const clientesPaginados = clientesFiltrados.slice(inicio, fim)

  // Funções de navegação
  function proximaPagina() {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1)
    }
  }

  function paginaAnterior() {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1)
    }
  }

  // FUNÇÃO PARA IR PARA UMA PÁGINA ESPECÍFICA
  function irParaPagina(pagina) {
    setPaginaAtual(pagina)
  }

  function handleBusca(e) {
    setTermoBusca(e.target.value)
    setPaginaAtual(1)
  }

  // Funções do modal
  function abrirEdicao(cliente) {
    setClienteEditando(cliente)
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      status: cliente.status
    })
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setClienteEditando(null)
    setFormData({ nome: '', email: '', telefone: '', status: 'Ativo' })
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function salvarEdicao(e) {
    e.preventDefault()
    
    if (!formData.nome || !formData.email) {
      toast.error('Nome e email são obrigatórios!')
      return
    }

    const clientesAtualizados = clientes.map(cliente => 
      cliente.id === clienteEditando.id ? { ...cliente, ...formData } : cliente
    )

    setClientes(clientesAtualizados)
    toast.success('Cliente atualizado com sucesso!')
    fecharModal()
  }

  function excluirCliente(clienteId, clienteNome) {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p>Confirmar exclusão de <strong>{clienteNome}</strong>?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              setClientes(clientes.filter(c => c.id !== clienteId))
              if (clientesPaginados.length === 1 && paginaAtual > 1) {
                setPaginaAtual(paginaAtual - 1)
              }
              toast.success('Cliente excluído com sucesso!')
            }}
            className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
          >
            Sim, excluir
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-lg text-sm"
            style={{ backgroundColor: cores.hover }}
          >
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold" style={{ color: cores.texto }}>
          Clientes
        </h2>
        
        <div className="flex gap-2">
          <ExportarDados 
            clientes={clientes}
            dadosGraficos={dadosGraficosClientes}
          />
          <button
            onClick={onNovoCliente}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            + Novo Cliente
          </button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}>
          <p className="text-sm" style={{ color: cores.textoSecundario }}>Total de Clientes</p>
          <p className="text-2xl font-bold" style={{ color: cores.texto }}>{clientes.length}</p>
        </div>
        <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}>
          <p className="text-sm" style={{ color: cores.textoSecundario }}>Clientes Ativos</p>
          <p className="text-2xl font-bold" style={{ color: cores.texto }}>{clientes.filter(c => c.status === 'Ativo').length}</p>
        </div>
        <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}>
          <p className="text-sm" style={{ color: cores.textoSecundario }}>Inativos</p>
          <p className="text-2xl font-bold" style={{ color: cores.texto }}>{clientes.filter(c => c.status === 'Inativo').length}</p>
        </div>
        <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}>
          <p className="text-sm" style={{ color: cores.textoSecundario }}>Taxa de Ativação</p>
          <p className="text-2xl font-bold" style={{ color: cores.texto }}>
            {Math.round((clientes.filter(c => c.status === 'Ativo').length / clientes.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4" style={{ color: cores.texto }}>
          📊 Distribuição de Clientes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg border" style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}>
            <h4 className="text-sm font-medium mb-4" style={{ color: cores.textoSecundario }}>Distribuição (Pizza)</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={dadosStatus} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="valor">
                  {dadosStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Ativos' ? '#10b981' : '#ef4444'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: cores.bgCard, borderColor: cores.borda }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 rounded-lg border" style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}>
            <h4 className="text-sm font-medium mb-4" style={{ color: cores.textoSecundario }}>Comparativo</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dadosStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke={temaEscuro ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="name" stroke={cores.textoSecundario} tick={{ fill: cores.textoSecundario }} />
                <YAxis stroke={cores.textoSecundario} tick={{ fill: cores.textoSecundario }} />
                <Tooltip contentStyle={{ backgroundColor: cores.bgCard, borderColor: cores.borda }} />
                <Bar dataKey="valor">
                  {dadosStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Ativos' ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar clientes por nome, email, telefone ou status..."
          value={termoBusca}
          onChange={handleBusca}
          className="w-full px-4 py-2 rounded-lg border"
          style={{ backgroundColor: cores.bgCard, borderColor: cores.borda, color: cores.texto }}
        />
        <p className="text-sm mt-2" style={{ color: cores.textoSecundario }}>
          Mostrando {clientesPaginados.length} de {clientesFiltrados.length} clientes
        </p>
      </div>

      {/* Tabela */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: `1px solid ${cores.borda}` }}>
              <th className="p-3 text-left" style={{ color: cores.texto }}>#</th>
              <th className="p-3 text-left" style={{ color: cores.texto }}>Nome</th>
              <th className="p-3 text-left" style={{ color: cores.texto }}>Email</th>
              <th className="p-3 text-left" style={{ color: cores.texto }}>Telefone</th>
              <th className="p-3 text-left" style={{ color: cores.texto }}>Status</th>
              <th className="p-3 text-left" style={{ color: cores.texto }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesPaginados.map((cliente, index) => (
              <tr key={cliente.id} style={{ borderBottom: `1px solid ${cores.borda}` }}>
                <td className="p-3" style={{ color: cores.textoSecundario }}>{(paginaAtual - 1) * itensPorPagina + index + 1}</td>
                <td className="p-3" style={{ color: cores.texto }}>{cliente.nome}</td>
                <td className="p-3" style={{ color: cores.textoSecundario }}>{cliente.email}</td>
                <td className="p-3" style={{ color: cores.textoSecundario }}>{cliente.telefone}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {cliente.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleStatus(cliente.id, cliente.status)} 
                      className={`px-2 py-1 rounded text-xs ${cliente.status === 'Ativo' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                    >
                      {cliente.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                    </button>
                    <button onClick={() => abrirEdicao(cliente)} className="text-blue-600 hover:text-blue-800">✏️</button>
                    <button onClick={() => excluirCliente(cliente.id, cliente.nome)} className="text-red-600 hover:text-red-800">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Componente de Paginação */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: cores.borda }}>
            <p className="text-sm" style={{ color: cores.textoSecundario }}>
              Página {paginaAtual} de {totalPaginas}
            </p>
            
            <div className="flex items-center gap-2">
              {/* Botão Anterior */}
              <button
                onClick={paginaAnterior}
                disabled={paginaAtual === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: cores.hover,
                  color: cores.texto,
                  border: `1px solid ${cores.borda}`
                }}
              >
                « Anterior
              </button>

              {/* Números das páginas - USANDO A FUNÇÃO irParaPagina */}
              <div className="flex items-center gap-1">
                {[...Array(totalPaginas)].map((_, i) => {
                  const pagina = i + 1
                  if (
                    pagina === 1 ||
                    pagina === totalPaginas ||
                    (pagina >= paginaAtual - 2 && pagina <= paginaAtual + 2)
                  ) {
                    return (
                      <button
                        key={pagina}
                        onClick={() => irParaPagina(pagina)} // FUNÇÃO SENDO USADA AQUI
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                          paginaAtual === pagina ? 'text-white' : ''
                        }`}
                        style={{ 
                          backgroundColor: paginaAtual === pagina ? '#3B82F6' : cores.hover,
                          color: paginaAtual === pagina ? 'white' : cores.texto,
                          border: `1px solid ${cores.borda}`
                        }}
                      >
                        {pagina}
                      </button>
                    )
                  } else if (
                    pagina === paginaAtual - 3 ||
                    pagina === paginaAtual + 3
                  ) {
                    return <span key={pagina} style={{ color: cores.textoSecundario }}>...</span>
                  }
                  return null
                })}
              </div>

              {/* Botão Próxima */}
              <button
                onClick={proximaPagina}
                disabled={paginaAtual === totalPaginas}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: cores.hover,
                  color: cores.texto,
                  border: `1px solid ${cores.borda}`
                }}
              >
                Próxima »
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de edição */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 w-full max-w-md" style={{ backgroundColor: cores.bgCard }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: cores.texto }}>Editar Cliente</h3>
            <form onSubmit={salvarEdicao} className="space-y-4">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome *"
                className="w-full p-2 rounded border"
                style={{ backgroundColor: cores.bgPrincipal, borderColor: cores.borda, color: cores.texto }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className="w-full p-2 rounded border"
                style={{ backgroundColor: cores.bgPrincipal, borderColor: cores.borda, color: cores.texto }}
              />
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                className="w-full p-2 rounded border"
                style={{ backgroundColor: cores.bgPrincipal, borderColor: cores.borda, color: cores.texto }}
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                style={{ backgroundColor: cores.bgPrincipal, borderColor: cores.borda, color: cores.texto }}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 py-2 border rounded hover:bg-gray-100"
                  style={{ borderColor: cores.borda }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}