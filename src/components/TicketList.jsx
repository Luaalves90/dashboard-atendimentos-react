import { useState } from "react"
import TicketCard from "./TicketCard"
import tickets from "../data/tickets"

export default function TicketList() {
  const [statusFiltro, setStatusFiltro] = useState("Todos")

  const ticketsFiltrados =
    statusFiltro === "Todos"
      ? tickets
      : tickets.filter(ticket => ticket.status === statusFiltro)

  return (
    <>
      <div className="flex gap-2 mb-6 flex-wrap">
        {["Todos", "Aberto", "Em andamento", "Finalizado"].map(status => (
          <button
            key={status}
            onClick={() => setStatusFiltro(status)}
            className={`px-3 py-1 rounded text-sm border
              ${
                statusFiltro === status
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ticketsFiltrados.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}