import { useTema } from '../contexts/TemaContext'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Bar, Line, Scatter,
  Cell
} from 'recharts'

// Dados simulados para os gráficos avançados
const dadosTendencia = [
  { mes: 'Jan', atendimentos: 65, clientes: 28, satisfacao: 85 },
  { mes: 'Fev', atendimentos: 59, clientes: 32, satisfacao: 82 },
  { mes: 'Mar', atendimentos: 80, clientes: 41, satisfacao: 88 },
  { mes: 'Abr', atendimentos: 81, clientes: 37, satisfacao: 90 },
  { mes: 'Mai', atendimentos: 76, clientes: 45, satisfacao: 87 },
  { mes: 'Jun', atendimentos: 85, clientes: 48, satisfacao: 92 },
]

const dadosRadar = [
  { categoria: 'Qualidade', valor: 90, media: 85 },
  { categoria: 'Velocidade', valor: 75, media: 70 },
  { categoria: 'Satisfação', valor: 92, media: 80 },
  { categoria: 'Retorno', valor: 78, media: 75 },
  { categoria: 'Eficiência', valor: 82, media: 78 },
  { categoria: 'Produtividade', valor: 88, media: 82 },
]

const dadosComposicao = [
  { dia: 'Seg', novos: 12, recorrentes: 18, inativos: 4 },
  { dia: 'Ter', novos: 15, recorrentes: 22, inativos: 3 },
  { dia: 'Qua', novos: 18, recorrentes: 24, inativos: 5 },
  { dia: 'Qui', novos: 14, recorrentes: 20, inativos: 2 },
  { dia: 'Sex', novos: 22, recorrentes: 26, inativos: 6 },
  { dia: 'Sáb', novos: 10, recorrentes: 15, inativos: 2 },
  { dia: 'Dom', novos: 8, recorrentes: 12, inativos: 1 },
]

export default function GraficosAvancados() {
  const { cores, temaEscuro } = useTema()

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold" style={{ color: cores.texto }}>
        📈 Análises Avançadas
      </h3>

      {/* Grid de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. GRÁFICO DE ÁREA - Tendência */}
        <div 
          className="p-4 rounded-lg shadow-sm border transition-colors duration-300"
          style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}
        >
          <h4 className="text-sm font-medium mb-4" style={{ color: cores.textoSecundario }}>
            Tendência de Crescimento
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dadosTendencia}>
              <defs>
                <linearGradient id="colorAtendimentos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={temaEscuro ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="mes" stroke={cores.textoSecundario} tick={{ fill: cores.textoSecundario }} />
              <YAxis stroke={cores.textoSecundario} tick={{ fill: cores.textoSecundario }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: cores.bgCard,
                  borderColor: cores.borda,
                  color: cores.texto,
                  borderRadius: '8px'
                }}
              />
              <Legend wrapperStyle={{ color: cores.texto }} />
              <Area type="monotone" dataKey="atendimentos" stroke="#8884d8" fillOpacity={1} fill="url(#colorAtendimentos)" />
              <Area type="monotone" dataKey="clientes" stroke="#82ca9d" fillOpacity={1} fill="url(#colorClientes)" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs mt-2 text-right" style={{ color: cores.textoSecundario }}>
            Crescimento de 30% no semestre
          </p>
        </div>

        {/* 2. GRÁFICO DE RADAR - Comparativo Multidimensional */}
        <div 
          className="p-4 rounded-lg shadow-sm border transition-colors duration-300"
          style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}
        >
          <h4 className="text-sm font-medium mb-4" style={{ color: cores.textoSecundario }}>
            Performance por Categoria
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dadosRadar}>
              <PolarGrid stroke={cores.borda} />
              <PolarAngleAxis dataKey="categoria" tick={{ fill: cores.textoSecundario, fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: cores.textoSecundario }} />
              <Radar name="Sua Empresa" dataKey="valor" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Média do Mercado" dataKey="media" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: cores.bgCard,
                  borderColor: cores.borda,
                  color: cores.texto,
                  borderRadius: '8px'
                }}
              />
              <Legend wrapperStyle={{ color: cores.texto }} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-xs mt-2 text-right" style={{ color: cores.textoSecundario }}>
            Acima da média em 5 categorias
          </p>
        </div>

        {/* 3. GRÁFICO COMPOSTO - Barras empilhadas + linha */}
        <div 
          className="p-4 rounded-lg shadow-sm border transition-colors duration-300 lg:col-span-2"
          style={{ backgroundColor: cores.bgCard, borderColor: cores.borda }}
        >
          <h4 className="text-sm font-medium mb-4" style={{ color: cores.textoSecundario }}>
            Composição Diária de Clientes
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={dadosComposicao}>
              <CartesianGrid strokeDasharray="3 3" stroke={temaEscuro ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="dia" stroke={cores.textoSecundario} tick={{ fill: cores.textoSecundario }} />
              <YAxis stroke={cores.textoSecundario} tick={{ fill: cores.textoSecundario }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: cores.bgCard,
                  borderColor: cores.borda,
                  color: cores.texto,
                  borderRadius: '8px'
                }}
              />
              <Legend wrapperStyle={{ color: cores.texto }} />
              <Bar dataKey="novos" stackId="a" fill="#10b981" />
              <Bar dataKey="recorrentes" stackId="a" fill="#3b82f6" />
              <Bar dataKey="inativos" stackId="a" fill="#ef4444" />
              <Line type="monotone" dataKey="novos" stroke="#f59e0b" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs" style={{ color: cores.texto }}>Novos: 99</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs" style={{ color: cores.texto }}>Recorrentes: 147</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs" style={{ color: cores.texto }}>Inativos: 23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}