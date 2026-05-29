import { useState } from "react";

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function submitDados() {
    // const response = fetch('https://localhost:7217/api/cadastro')
  }

  return (
    <div className="cadastro">
      <h2>Cadastro</h2>
      <form>
        <input type="text" name="nome" value={nome} placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
        <input type="email" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="senha" value={senha} placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />

        <button type="submit" onClick={submitDados}></button>
      </form>
    </div>
  )
}

export default Cadastro;
