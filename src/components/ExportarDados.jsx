import { useTema } from '../contexts/TemaContext'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import toast from 'react-hot-toast'

export default function ExportarDados({ clientes, dadosGraficos }) {
  const { cores, temaEscuro } = useTema()

  // FUNÇÃO 1: Exportar para Excel
  function exportarExcel() {
    try {
      const temClientes = clientes && clientes.length > 0
      
      if (!temClientes && !dadosGraficos) {
        toast.error('Não há dados para exportar!')
        return
      }

      const wb = XLSX.utils.book_new()

      if (temClientes) {
        const dadosExcel = clientes.map(cliente => ({
          ID: cliente.id || '',
          Nome: cliente.nome || '',
          Email: cliente.email || '',
          Telefone: cliente.telefone || '',
          Status: cliente.status || ''
        }))

        const ws = XLSX.utils.json_to_sheet(dadosExcel)
        XLSX.utils.book_append_sheet(wb, ws, 'Clientes')
      }

      const metricas = []

      if (temClientes) {
        metricas.push(
          { Metrica: 'Total de Clientes', Valor: clientes.length },
          { Metrica: 'Clientes Ativos', Valor: clientes.filter(c => c?.status === 'Ativo').length },
          { Metrica: 'Clientes Inativos', Valor: clientes.filter(c => c?.status === 'Inativo').length },
          { Metrica: 'Taxa de Ativação', Valor: clientes.length > 0 
            ? `${Math.round((clientes.filter(c => c?.status === 'Ativo').length / clientes.length) * 100)}%` 
            : '0%' 
          }
        )
      }

      if (dadosGraficos?.metricas) {
        Object.entries(dadosGraficos.metricas).forEach(([key, value]) => {
          metricas.push({ 
            Metrica: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), 
            Valor: value 
          })
        })
      }

      if (metricas.length > 0) {
        const wsMetricas = XLSX.utils.json_to_sheet(metricas)
        XLSX.utils.book_append_sheet(wb, wsMetricas, 'Métricas')
      }

      XLSX.writeFile(wb, `relatorio_${new Date().toISOString().split('T')[0]}.xlsx`)
      
      // USANDO cores e temaEscuro AQUI
      toast.success('Excel exportado com sucesso! 📊', {
        style: {
          backgroundColor: temaEscuro ? cores.bgCard : '#10b981',
          color: temaEscuro ? cores.texto : 'white',
          border: temaEscuro ? `1px solid ${cores.borda}` : 'none'
        }
      })
    } catch (error) {
      console.error('Erro ao exportar Excel:', error)
      toast.error('Erro ao exportar Excel', {
        style: {
          backgroundColor: temaEscuro ? cores.bgCard : '#ef4444',
          color: temaEscuro ? cores.texto : 'white'
        }
      })
    }
  }

  // FUNÇÃO 2: Exportar para PDF Simples
  async function exportarPDFSimples() {
    try {
      const doc = new jsPDF()
      
      // Usando cores do tema no PDF
      const corTitulo = temaEscuro ? [150, 150, 255] : [59, 130, 246]
      const corTexto = temaEscuro ? [200, 200, 200] : [80, 80, 80]
      const corSecundaria = temaEscuro ? [150, 150, 150] : [100, 100, 100]
      const corFundo = temaEscuro ? [50, 50, 50] : [240, 240, 240]
      
      // Título
      doc.setFontSize(18)
      doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2])
      doc.text('Relatório de Clientes', 14, 20)
      
      // Data
      doc.setFontSize(10)
      doc.setTextColor(corSecundaria[0], corSecundaria[1], corSecundaria[2])
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30)
      
      let yPos = 40

      // Métricas
      if (dadosGraficos?.metricas) {
        doc.setFontSize(14)
        doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2])
        doc.text('Métricas:', 14, yPos)
        yPos += 8

        doc.setFontSize(11)
        doc.setTextColor(corTexto[0], corTexto[1], corTexto[2])
        
        Object.entries(dadosGraficos.metricas).forEach(([key, value]) => {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
          doc.text(`${label}: ${value}`, 20, yPos)
          yPos += 7
        })
        yPos += 5
      }

      // Clientes
      if (clientes && clientes.length > 0) {
        doc.setFontSize(14)
        doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2])
        doc.text('Lista de Clientes:', 14, yPos)
        yPos += 8

        doc.setFontSize(8)
        doc.setTextColor(corTexto[0], corTexto[1], corTexto[2])
        
        // Cabeçalho da tabela
        doc.setFillColor(corFundo[0], corFundo[1], corFundo[2])
        doc.rect(14, yPos - 4, 180, 6, 'F')
        doc.text('Nome', 15, yPos)
        doc.text('Email', 70, yPos)
        doc.text('Telefone', 130, yPos)
        doc.text('Status', 170, yPos)
        yPos += 6

        // Linhas da tabela
        const clientesMostrar = clientes.slice(0, 10)
        clientesMostrar.forEach(cliente => {
          if (yPos > 280) {
            doc.addPage()
            yPos = 20
          }
          
          doc.text(cliente.nome?.substring(0, 15) || '', 15, yPos)
          doc.text(cliente.email?.substring(0, 15) || '', 70, yPos)
          doc.text(cliente.telefone || '', 130, yPos)
          doc.text(cliente.status || '', 170, yPos)
          yPos += 6
        })

        if (clientes.length > 10) {
          doc.text(`... e mais ${clientes.length - 10} clientes`, 14, yPos)
        }
      }

      doc.save(`clientes_${new Date().toISOString().split('T')[0]}.pdf`)
      
      toast.success('PDF exportado com sucesso! 📄', {
        style: {
          backgroundColor: temaEscuro ? cores.bgCard : '#ef4444',
          color: temaEscuro ? cores.texto : 'white'
        }
      })
    } catch (error) {
      console.error('Erro ao exportar PDF:', error)
      toast.error('Erro ao exportar PDF', {
        style: {
          backgroundColor: temaEscuro ? cores.bgCard : '#ef4444',
          color: temaEscuro ? cores.texto : 'white'
        }
      })
    }
  }

  // FUNÇÃO 3: Exportar para PDF Completo
  async function exportarPDFCompleto() {
    try {
      toast.loading('Gerando relatório completo...', { 
        id: 'exportPDF',
        style: {
          backgroundColor: temaEscuro ? cores.bgCard : '#3b82f6',
          color: temaEscuro ? cores.texto : 'white'
        }
      })
      
      const doc = new jsPDF()
      
      // Usando cores do tema no PDF
      const corTitulo = temaEscuro ? [150, 150, 255] : [59, 130, 246]
      const corTexto = temaEscuro ? [200, 200, 200] : [80, 80, 80]
      const corSecundaria = temaEscuro ? [150, 150, 150] : [100, 100, 100]
      const corFundo = temaEscuro ? [50, 50, 50] : [240, 240, 240]
      
      // CAPA
      doc.setFontSize(24)
      doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2])
      doc.text('Relatório Completo', 105, 80, { align: 'center' })
      
      doc.setFontSize(14)
      doc.setTextColor(corSecundaria[0], corSecundaria[1], corSecundaria[2])
      doc.text('TargetView', 105, 100, { align: 'center' })
      
      doc.setFontSize(11)
      doc.setTextColor(corSecundaria[0], corSecundaria[1], corSecundaria[2])
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 105, 120, { align: 'center' })
      
      doc.addPage()

      let yPos = 30

      // MÉTRICAS
      if (dadosGraficos?.metricas) {
        doc.setFontSize(16)
        doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2])
        doc.text('Métricas do Dashboard', 14, yPos)
        yPos += 10

        doc.setFontSize(12)
        doc.setTextColor(corTexto[0], corTexto[1], corTexto[2])
        
        Object.entries(dadosGraficos.metricas).forEach(([key, value]) => {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
          doc.text(`${label}: ${value}`, 20, yPos)
          yPos += 8
        })
        yPos += 10
      }

      // CLIENTES
      if (clientes && clientes.length > 0) {
        doc.setFontSize(16)
        doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2])
        doc.text('Lista de Clientes', 14, yPos)
        yPos += 10

        doc.setFontSize(8)
        doc.setTextColor(corTexto[0], corTexto[1], corTexto[2])
        
        // Cabeçalho da tabela
        doc.setFillColor(corFundo[0], corFundo[1], corFundo[2])
        doc.rect(14, yPos - 4, 180, 6, 'F')
        doc.text('Nome', 15, yPos)
        doc.text('Email', 70, yPos)
        doc.text('Telefone', 130, yPos)
        doc.text('Status', 170, yPos)
        yPos += 6

        // Linhas da tabela
        const clientesMostrar = clientes.slice(0, 15)
        clientesMostrar.forEach(cliente => {
          if (yPos > 280) {
            doc.addPage()
            yPos = 20
          }
          
          doc.text(cliente.nome?.substring(0, 15) || '', 15, yPos)
          doc.text(cliente.email?.substring(0, 15) || '', 70, yPos)
          doc.text(cliente.telefone || '', 130, yPos)
          doc.text(cliente.status || '', 170, yPos)
          yPos += 6
        })
      }

      // GRÁFICOS
      const elementosGraficos = document.querySelectorAll('.recharts-wrapper')
      
      if (elementosGraficos.length > 0) {
        doc.addPage()
        doc.setFontSize(16)
        doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2])
        doc.text('Análise Gráfica', 14, 20)

        for (let i = 0; i < Math.min(elementosGraficos.length, 2); i++) {
          try {
            const canvas = await html2canvas(elementosGraficos[i], {
              scale: 1.5,
              backgroundColor: temaEscuro ? cores.bgCard : '#ffffff'
            })
            
            const imgData = canvas.toDataURL('image/png')
            
            const posY = 30 + (i * 70)
            doc.addImage(imgData, 'PNG', 10, posY, 190, 60)
          } catch (err) {
            console.log(`Erro ao capturar gráfico ${i}:`, err)
          }
        }
      }

      doc.save(`relatorio_completo_${new Date().toISOString().split('T')[0]}.pdf`)
      
      toast.success('Relatório completo gerado! 📊', { 
        id: 'exportPDF',
        style: {
          backgroundColor: temaEscuro ? cores.bgCard : '#10b981',
          color: temaEscuro ? cores.texto : 'white'
        }
      })
      
    } catch (error) {
      console.error('Erro ao exportar PDF completo:', error)
      toast.error('Erro ao gerar relatório completo', { 
        id: 'exportPDF',
        style: {
          backgroundColor: temaEscuro ? cores.bgCard : '#ef4444',
          color: temaEscuro ? cores.texto : 'white'
        }
      })
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportarExcel}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:brightness-110 flex items-center gap-2"
        style={{ 
          backgroundColor: temaEscuro ? cores.bgCard : '#10b981',
          color: temaEscuro ? cores.texto : 'white',
          border: temaEscuro ? `1px solid ${cores.borda}` : 'none'
        }}
        title="Exportar para Excel"
      >
        <span>📊</span>
        <span className="hidden sm:inline">Excel</span>
      </button>

      <button
        onClick={exportarPDFSimples}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:brightness-110 flex items-center gap-2"
        style={{ 
          backgroundColor: temaEscuro ? cores.bgCard : '#ef4444',
          color: temaEscuro ? cores.texto : 'white',
          border: temaEscuro ? `1px solid ${cores.borda}` : 'none'
        }}
        title="Exportar relatório simples PDF"
      >
        <span>📄</span>
        <span className="hidden sm:inline">PDF Simples</span>
      </button>

      <button
        onClick={exportarPDFCompleto}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:brightness-110 flex items-center gap-2"
        style={{ 
          backgroundColor: temaEscuro ? cores.bgCard : '#3b82f6',
          color: temaEscuro ? cores.texto : 'white',
          border: temaEscuro ? `1px solid ${cores.borda}` : 'none'
        }}
        title="Exportar relatório completo com gráficos"
      >
        <span>📑</span>
        <span className="hidden sm:inline">PDF Completo</span>
      </button>
    </div>
  )
}