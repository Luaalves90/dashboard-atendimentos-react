import { useEffect, useState } from 'react'
import { getClientes, salvarCliente } from '../utils/clientes'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [modalAberto, setModalAberto] = useState(false)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  // EXCLUSÃO
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null)
  const [senhaExclusao, setSenhaExclusao] = useState('')
  const [erroSenha, setErroSenha] = useState('')

  // ===== CARREGAR CLIENTES =====
  useEffect(() => {
    const clientesSalvos = getClientes()
    setClientes(clientesSalvos)
  }, [])

  // ===== MODAL CADASTRO =====
  function abrirModal() {
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setNome('')
    setEmail('')
    setTelefone('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    const novoCliente = {
      id: Date.now(), // ID simples para controle
      nome,
      email,
      telefone,
    }

    salvarCliente(novoCliente)
    setClientes((prev) => [...prev, novoCliente])
    fecharModal()
  }

  // ===== MODAL EXCLUSÃO =====
  function abrirModalExcluir(cliente) {
    setClienteParaExcluir(cliente)
    setModalExcluirAberto(true)
  }

  function fecharModalExcluir() {
    setModalExcluirAberto(false)
    setClienteParaExcluir(null)
    setSenhaExclusao('')
    setErroSenha('')
  }

  function confirmarExclusao(e) {
    e.preventDefault()

    const SENHA_CORRETA = '1234'

    if (senhaExclusao !== SENHA_CORRETA) {
      setErroSenha('Senha inválida')
      return
    }

    const novaLista = clientes.filter(
      (cliente) => cliente.id !== clienteParaExcluir.id
    )

    setClientes(novaLista)
    localStorage.setItem('clientes', JSON.stringify(novaLista))

    fecharModalExcluir()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <button
          onClick={abrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Novo Cliente
        </button>
      </div>

      {clientes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-gray-500 text-center">
          Nenhum cliente cadastrado ainda.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition flex justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {cliente.nome}
                </p>
                <p className="text-sm text-gray-500">
                  {cliente.email}
                </p>
                <p className="text-sm text-gray-500">
                  {cliente.telefone}
                </p>
              </div>

              <button
                onClick={() => abrirModalExcluir(cliente)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ===== MODAL CADASTRO ===== */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Cadastrar Cliente
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  onClick={fecharModal}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL EXCLUSÃO ===== */}
      {modalExcluirAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              Confirmar exclusão
            </h2>

            <p className="mb-4 text-sm text-gray-600">
              Para excluir o cliente{' '}
              <strong>{clienteParaExcluir?.nome}</strong>,
              informe a senha.
            </p>

            <form onSubmit={confirmarExclusao} className="space-y-4">
              <input
                type="password"
                value={senhaExclusao}
                onChange={(e) => setSenhaExclusao(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Senha"
                required
              />

              {erroSenha && (
                <p className="text-sm text-red-600">{erroSenha}</p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={fecharModalExcluir}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Excluir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}