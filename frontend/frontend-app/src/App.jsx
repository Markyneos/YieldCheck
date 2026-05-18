import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [valorInicial, setValorInicial] = useState('')
  const [dias, setDias] = useState('')
  const [taxaAnual, setTaxaAnual] = useState('')
  const [resultado, setResultado] = useState(null)
  const [historico, setHistorico] = useState([])

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
        taxaAnual: Number(taxaAnual)
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

      <input
        placeholder='Taxa Anual (%)'
        value={taxaAnual}
        onChange={(e) => setTaxaAnual(e.target.value)}
      />

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
            <strong>Taxa:</strong>
            {' '}
            {item.taxaAnual}%
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
