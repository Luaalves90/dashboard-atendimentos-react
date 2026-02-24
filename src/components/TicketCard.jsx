export default function TicketCard({ ticket }) {

  const statusClasses = {
    "Aberto": "bg-green-100 text-green-700",
    "Em andamento": "bg-yellow-100 text-yellow-700",
    "Finalizado": "bg-blue-100 text-blue-700"
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{ticket.cliente}</h3>

        <span
          className={`text-xs px-2 py-1 rounded ${statusClasses[ticket.status]}`}
        >
          {ticket.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">{ticket.assunto}</p>

      <p className="text-xs text-gray-400 mt-2">
        {ticket.data}
      </p>
    </div>
  )
}