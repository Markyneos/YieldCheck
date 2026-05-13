import { useState } from 'react'
import './App.css'

function App() {
  const [valorInicial, setValorInicial] = useState('')
  const [dias, setDias] = useState('')
  const [taxaAnual, setTaxaAnual] = useState('')
  const [resultado, setResultado] = useState(null)

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
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>YieldCheck</h1>

      <input
        placeholder='Valor Inicial'
        value={valorInicial}
        onChange={(e) => setValorInicial(e.target.value)}
      />

      <br /><br />

      <input
        placeholder='Dias'
        value={dias}
        onChange={(e) => setDias(e.target.value)}
      />

      <br /><br />

      <input
        placeholder='Taxa Anual'
        value={taxaAnual}
        onChange={(e) => setTaxaAnual(e.target.value)}
      />

      <br /><br />

      <button onClick={calcular}>Calcular</button>

      {resultado && (
        <div>
          <h2>Resultado</h2>
          <p>Liquido: R$ {resultado.liquido}</p>
        </div>
      )}
    </div>
  )
}

export default App
