import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import './Home.css';
import { BiX } from 'react-icons/bi';

function Home() {
  const [tipoInvestimento, setTipoInvestimento] = useState(0)
  const [valorInicial, setValorInicial] = useState('')
  const [dias, setDias] = useState('')
  const [resultado, setResultado] = useState(null)
  const [historico, setHistorico] = useState([])
  const [comparacao, setComparacao] = useState([])
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
    : [];
  const [comparacaoFechado, setComparacaoFechado] = useState(true);

  function Comparacao({ onClose }) {
    return (
      <div className='modal-display'>
        <div className='modal-display-inner'>
          <div className='resultado' id='comparacao' >
            <div style={{ display: 'flex' }}>
              <h2 style={{ margin: 'auto', marginRight: '160px' }}>Comparação</h2>

              <BiX onClick={onClose} cursor='pointer' size={25} />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Taxa</th>
                  <th>Líquido</th>
                </tr>
              </thead>

              <tbody>
                {comparacao.map((item) => (
                  <tr key={item.tipo}>
                    <td>{item.tipo}</td>

                    <td>{item.taxa}%</td>

                    <td>
                      R$ {item.liquido.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    carregarHistorico()
  }, [])

  async function calcular() {
    if (!valorInicial || !dias) {
      alert("Insira valores válidos para os dados.")
      return;
    }
    // Docker
    // const response = await fetch('http://localhost:5000/api/simulacao', {
    // VS
    const response = await fetch('https://localhost:7217/api/simulacao', {
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
    // Docker
    // const response = await fetch('http://localhost:5000/api/simulacao')
    // VS
    const response = await fetch('https://localhost:7217/api/simulacao')

    const data = await response.json()

    setHistorico(data)
  }

  async function comparar() {
    // Docker
    // const response = await fetch(
    //   `http://localhost:5000/api/simulacao/comparar?valorInicial=${valorInicial}&dias=${dias}`
    // )
    // VS
    const response = await fetch(
      `https://localhost:7217/api/simulacao/comparar?valorInicial=${valorInicial}&dias=${dias}`
    )

    const data = await response.json()

    setComparacao(data)
    setComparacaoFechado(false)
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

      <button onClick={comparar}>
        Comparar Investimentos
      </button>

      {resultado && (
        <div className='resultado'>
          <h2>Resultado</h2>

          <p>
            Valor Líquido:
            <strong>
              {' '}
              R$ {resultado.liquido.toFixed(2)}
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

      <h2 id='historico'>Histórico</h2>

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
            R$ {item.liquido.toFixed(2)}
          </p>
        </div>
      ))}

      {comparacao.length > 0 && !comparacaoFechado && <Comparacao onClose={() => setComparacaoFechado(true)} />}
    </div>
  )
}

export default Home
