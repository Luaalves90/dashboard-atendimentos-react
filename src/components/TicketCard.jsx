import { useTema } from '../contexts/TemaContext'

export default function TicketCard({ ticket }) {
  const { cores, temaEscuro } = useTema()

  const statusClasses = {
    "Aberto": temaEscuro ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700",
    "Em andamento": temaEscuro ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-700",
    "Finalizado": temaEscuro ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"
  }

  return (
    <div 
      className="p-4 rounded-lg shadow-sm border transition-colors duration-300"
      style={{ 
        backgroundColor: cores.bgCard,
        borderColor: cores.borda
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold" style={{ color: cores.texto }}>
          {ticket.cliente}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded ${statusClasses[ticket.status]}`}
        >
          {ticket.status}
        </span>
      </div>

      <p className="text-sm" style={{ color: cores.textoSecundario }}>
        {ticket.assunto}
      </p>

      <p className="text-xs mt-2" style={{ color: cores.textoSecundario }}>
        {ticket.data}
      </p>
    </div>
  )
}