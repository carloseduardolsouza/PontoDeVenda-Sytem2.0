import "./CadastrarCliente.css";
import { useState , useContext } from "react";
import AppContext from "../../context/AppContext";
import Executando from "../../components/Executando/Executando"

//icones
import { FaUserAlt } from "react-icons/fa";

//conexão com a api
import fetchapi from "../../api/fetchapi";

function CadastrarCliente() {
  const {setErroApi} = useContext(AppContext)

  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [endereço, setEndereço] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("Selecione o Genero");
  const [nascimento, setNascimento] = useState("");

  const [executando, setExecutando] = useState(false);

  const Data = new Date();
  const log = `${Data.getUTCDate()}/${
    Data.getUTCMonth() + 1
  }/${Data.getUTCFullYear()}`;

  const escreverDados = (param, e) => {
    if (param == "nome") {
      setNome(e.target.value);
    }

    if (param == "numero") {
      setNumero(e.target.value);
    }

    if (param == "Endereço") {
      setEndereço(e.target.value);
    }

    if (param == "CPF") {
      setCpf(e.target.value);
    }

    if (param == "Email") {
      setEmail(e.target.value);
    }

    if (param == "Gênero") {
      setGenero(e.target.value);
    }

    if (param == "Nascimento") {
      setNascimento(e.target.value);
    }
  };

  const cadastrarCliente = (e) => {
    e.preventDefault();
    setExecutando(true)

    let dados = {
      nome: nome,
      cpf_cnpj: cpf,
      email: email,
      genero: genero,
      telefone: numero,
      data_nascimento: nascimento,
      endereco: endereço,
    };

    fetchapi
      .NovoCliente(dados)
      .then((resposta) => {
        setCpf('')
        setEmail('')
        setEndereço('')
        setGenero('')
        setNome('')
        setNumero('')
        setNascimento('')
        setExecutando(false)
      })
      .catch((erro) => {
        setErroApi(true)
      });
  };

  return (
    <div id="novoCliente">
      {executando && <Executando/>}
      <h2>Novo Cliente</h2>
      <p>{log}</p>
      <div id="CENTRALIZAR">
        <main className="MainNovoCliente">
          <div alt="Imagem User" className="ImageUser">
            <FaUserAlt />
          </div>
          <form
            className="articleNovoCliente"
            onSubmit={(e) => cadastrarCliente(e)}
          >
            <p>
              <strong>Nome: </strong>
            </p>
            <input
              type="text"
              className="InputNovoCliente"
              onChange={(event) => escreverDados("nome", event)}
              value={nome}
              placeholder="Nome"
              required
            />
            <p>
              <strong>Numero: </strong>
            </p>
            <input
              type="number"
              className="InputNovoCliente"
              onChange={(event) => escreverDados("numero", event)}
              value={numero}
              placeholder="Numero"
              required
            />
            <p>
              <strong>Endereço</strong>
            </p>
            <input
              type="text"
              className="InputNovoCliente"
              onChange={(event) => escreverDados("Endereço", event)}
              value={endereço}
              placeholder="Endereço"
            />
            <p>
              <strong>CPF</strong>
            </p>
            <input
              type="number"
              className="InputNovoCliente"
              onChange={(event) => escreverDados("CPF", event)}
              value={cpf}
              placeholder="CPF"
            />
            <p>
              <strong>Email</strong>
            </p>
            <input
              type="text"
              className="InputNovoCliente"
              onChange={(event) => escreverDados("Email", event)}
              value={email}
              placeholder="Email"
            />
            <p>
              <strong>Gênero</strong>
            </p>
            <select
              className="SelectNovoCliente"
              onChange={(event) => escreverDados("Gênero", event)}
              value={genero}
              required
            >
              <option value="">Selecione o Genero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            <p>Nascimento: </p>
            <input
              type="date"
              className="DataNovoCliente"
              onChange={(event) => escreverDados("Nascimento", event)}
              value={nascimento}
            />
            <button className="CadastrarNovoCliente" type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CadastrarCliente;
