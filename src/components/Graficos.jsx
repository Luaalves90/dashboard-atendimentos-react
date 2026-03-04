import { useTema } from '../contexts/TemaContext'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dadosAtendimentos = [
  { dia: 'Seg', atendimentos: 18 },
  { dia: 'Ter', atendimentos: 22 },
  { dia: 'Qua', atendimentos: 24 },
  { dia: 'Qui', atendimentos: 20 },
  { dia: 'Sex', atendimentos: 26 },
  { dia: 'Sáb', atendimentos: 15 },
  { dia: 'Dom', atendimentos: 10 },
];

const dadosClientes = [
  { nome: 'Novos', valor: 45 },
  { nome: 'Recorrentes', valor: 55 },
];

const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Graficos() {
  const { cores, temaEscuro } = useTema();

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px 0'
    }}>
      {/* Gráfico de Linha */}
      <div 
        className="rounded-lg shadow-sm border transition-colors duration-300 p-4"
        style={{ 
          backgroundColor: cores.bgCard,
          borderColor: cores.borda
        }}
      >
        <h3 style={{ color: cores.texto }} className="font-semibold mb-4">
          Atendimentos por Dia
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosAtendimentos}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={temaEscuro ? '#374151' : '#E5E7EB'}
            />
            <XAxis 
              dataKey="dia" 
              stroke={cores.textoSecundario}
              tick={{ fill: cores.textoSecundario }}
            />
            <YAxis 
              stroke={cores.textoSecundario}
              tick={{ fill: cores.textoSecundario }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: cores.bgCard,
                borderColor: cores.borda,
                color: cores.texto,
                borderRadius: '8px'
              }}
              labelStyle={{ color: cores.texto }}
            />
            <Legend 
              wrapperStyle={{ color: cores.texto }}
            />
            <Line type="monotone" dataKey="atendimentos" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Barras */}
      <div 
        className="rounded-lg shadow-sm border transition-colors duration-300 p-4"
        style={{ 
          backgroundColor: cores.bgCard,
          borderColor: cores.borda
        }}
      >
        <h3 style={{ color: cores.texto }} className="font-semibold mb-4">
          Comparativo Diário
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosAtendimentos}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={temaEscuro ? '#374151' : '#E5E7EB'}
            />
            <XAxis 
              dataKey="dia" 
              stroke={cores.textoSecundario}
              tick={{ fill: cores.textoSecundario }}
            />
            <YAxis 
              stroke={cores.textoSecundario}
              tick={{ fill: cores.textoSecundario }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: cores.bgCard,
                borderColor: cores.borda,
                color: cores.texto,
                borderRadius: '8px'
              }}
              labelStyle={{ color: cores.texto }}
            />
            <Legend 
              wrapperStyle={{ color: cores.texto }}
            />
            <Bar dataKey="atendimentos" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Pizza */}
      <div 
        className="rounded-lg shadow-sm border transition-colors duration-300 p-4"
        style={{ 
          backgroundColor: cores.bgCard,
          borderColor: cores.borda
        }}
      >
        <h3 style={{ color: cores.texto }} className="font-semibold mb-4">
          Distribuição de Clientes
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dadosClientes}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={entry => `${entry.nome}: ${entry.valor}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="valor"
            >
              {dadosClientes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: cores.bgCard,
                borderColor: cores.borda,
                color: cores.texto,
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graficos;