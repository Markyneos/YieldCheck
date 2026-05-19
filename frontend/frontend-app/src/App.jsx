import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tipoInvestimento, setTipoInvestimento] = useState(0)
  const [valorInicial, setValorInicial] = useState('')
  const [dias, setDias] = useState('')
  const [taxaAnual, setTaxaAnual] = useState('')
  const [resultado, setResultado] = useState(null)
  const [historico, setHistorico] = useState([])
  const dadosGraficos = resultado ? [
    {
      nome: 'Inicial',
      valor: Number(resultado.valorInicial)
    },
    {
      nome: 'Líquido',
      valor: Number(resultado.liquido)
    }
  ]
    : []

  useEffect(() => {
    carregarHistorico()
  }, [])

  async function calcular() {
    const response = await fetch('http://localhost:5000/api/simulacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valorInicial: Number(valorInicial),
        dias: Number(dias),
        tipoInvestimento
      })
    })

    const data = await response.json()
    setResultado(data)
    carregarHistorico()
  }

  async function carregarHistorico() {
    const response = await fetch('http://localhost:5000/api/simulacao')

    const data = await response.json()

    setHistorico(data)
  }

  return (
    <div className='container'>
      <h1>YieldCheck</h1>

      <input
        placeholder='Valor Inicial'
        value={valorInicial}
        onChange={(e) => setValorInicial(e.target.value)}
      />

      <input
        placeholder='Dias'
        value={dias}
        onChange={(e) => setDias(e.target.value)}
      />

      <select
        value={tipoInvestimento}
        onChange={(e) =>
          setTipoInvestimento(Number(e.target.value))}
      >
        <option value={0}>CDI</option>

        <option value={1}>SELIC</option>

        <option value={2}>LCI/LCA</option>

        <option value={3}>CDB</option>

      </select>

      <button onClick={calcular}>
        Calcular
      </button>

      {resultado && (
        <div className='resultado'>
          <h2>Resultado</h2>

          <p>
            Valor Líquido:
            <strong>
              {' '}
              R$ {resultado.liquido}
            </strong>
          </p>

          <p>
            Rendimento Bruto:
            <strong>
              {' '}
              R$ {resultado.rendimentoBruto}
            </strong>
          </p>

          <p>
            Imposto:
            <strong>
              {' '}
              R$ {resultado.imposto}
            </strong>
          </p>

          <p>
            Taxa aplicada:
            <strong>
              {' '}
              {resultado.taxaAplicada}%
            </strong>
          </p>
        </div>
      )}

      {resultado && (
        <div className="resultado">
          <h2>Gráfico</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosGraficos}>
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="valor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <h2>Histórico</h2>

      {historico.map((item) => (
        <div className='historico-item' key={item.id}>
          <p>
            <strong>Valor:</strong>
            {' '}
            R$ {item.valorInicial}
          </p>

          <p>
            <strong>Dias:</strong>
            {' '}
            {item.dias}
          </p>

          <p>
            <strong>Taxa aplicada:</strong>
            {' '}
            {item.taxaAplicada}%
          </p>

          <p>
            <strong>Líquido</strong>
            {' '}
            R$ {item.liquido}
          </p>
        </div>
      ))}
    </div>
  )
}

export default App
