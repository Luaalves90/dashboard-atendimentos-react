import { useTema } from '../contexts/TemaContext';

export default function Header({ title }) {
  const { temaEscuro, toggleTema, cores } = useTema();

  return (
    <header 
      className="px-4 py-3 flex justify-between items-center border-b transition-colors duration-300"
      style={{ 
        backgroundColor: cores.bgCard,
        borderColor: cores.borda
      }}
    >
      <h1 
        className="text-lg font-semibold transition-colors duration-300"
        style={{ color: cores.texto }}
      >
        {title}
      </h1>

      <div className="flex items-center gap-2">
        {/* Botão de tema */}
        <button
          onClick={toggleTema}
          className="px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm"
          style={{ 
            backgroundColor: temaEscuro ? '#374151' : '#F3F4F6',
            color: cores.texto,
            border: `1px solid ${cores.borda}`
          }}
        >
          <span className="text-base">
            {temaEscuro ? '☀️' : '🌙'}
          </span>
          <span className="hidden sm:inline">
            {temaEscuro ? 'Claro' : 'Escuro'}
          </span>
        </button>

        {/* Botão do menu mobile (já existia) */}
        <button 
          className="md:hidden p-1.5 rounded-lg transition-colors duration-300"
          style={{ color: cores.texto }}
        >
          ☰
        </button>
      </div>
    </header>
  );
}