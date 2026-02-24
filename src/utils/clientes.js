export function getClientes() {
  try {
    const clientes = localStorage.getItem('clientes')
    return clientes ? JSON.parse(clientes) : []
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
    return []
  }
}

export function salvarCliente(cliente) {
  try {
    const clientes = getClientes()
    clientes.push(cliente)
    localStorage.setItem('clientes', JSON.stringify(clientes))
  } catch (error) {
    console.error('Erro ao salvar cliente:', error)
  }
}