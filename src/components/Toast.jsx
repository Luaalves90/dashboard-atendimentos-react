export default function Toast({ mensagem, tipo = 'success' }) {
  if (!mensagem) return null

  const cores = {
    success: 'bg-green-600',
    error: 'bg-red-600',
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`${cores[tipo]} text-white px-5 py-3 rounded-lg shadow-lg animate-fade-in`}
      >
        {mensagem}
      </div>
    </div>
  )
}