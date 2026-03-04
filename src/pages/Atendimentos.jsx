import { useTema } from '../contexts/TemaContext'

export default function Atendimentos() {
  const { cores } = useTema()

  return (
    <div className="p-6">
      <h2 
        className="text-xl font-semibold mb-4 transition-colors duration-300"
        style={{ color: cores.texto }}
      >
        Atendimentos
      </h2>

      {/* Cards de métricas de atendimentos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="p-6 rounded-lg shadow-sm border transition-colors duration-300"
          style={{ 
            backgroundColor: cores.bgCard,
            borderColor: cores.borda
          }}
        >
          <p style={{ color: cores.textoSecundario }} className="text-sm">
            Atendimentos Hoje
          </p>
          <p style={{ color: cores.texto }} className="text-2xl font-bold">
            24
          </p>
        </div>

        <div 
          className="p-6 rounded-lg shadow-sm border transition-colors duration-300"
          style={{ 
            backgroundColor: cores.bgCard,
            borderColor: cores.borda
          }}
        >
          <p style={{ color: cores.textoSecundario }} className="text-sm">
            Em Andamento
          </p>
          <p style={{ color: cores.texto }} className="text-2xl font-bold">
            8
          </p>
        </div>

        <div 
          className="p-6 rounded-lg shadow-sm border transition-colors duration-300"
          style={{ 
            backgroundColor: cores.bgCard,
            borderColor: cores.borda
          }}
        >
          <p style={{ color: cores.textoSecundario }} className="text-sm">
            Finalizados
          </p>
          <p style={{ color: cores.texto }} className="text-2xl font-bold">
            156
          </p>
        </div>
      </div>

      {/* Tabela de atendimentos (exemplo) */}
      <div className="mt-8">
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: cores.texto }}
        >
          Últimos Atendimentos
        </h3>
        
        <div 
          className="rounded-lg border transition-colors duration-300 overflow-hidden"
          style={{ 
            backgroundColor: cores.bgCard,
            borderColor: cores.borda
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${cores.borda}` }}>
                <th className="p-3 text-left" style={{ color: cores.texto }}>Cliente</th>
                <th className="p-3 text-left" style={{ color: cores.texto }}>Data</th>
                <th className="p-3 text-left" style={{ color: cores.texto }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${cores.borda}` }}>
                <td className="p-3" style={{ color: cores.texto }}>João Silva</td>
                <td className="p-3" style={{ color: cores.textoSecundario }}>10/03/2024</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Concluído
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${cores.borda}` }}>
                <td className="p-3" style={{ color: cores.texto }}>Maria Santos</td>
                <td className="p-3" style={{ color: cores.textoSecundario }}>10/03/2024</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Em andamento
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}