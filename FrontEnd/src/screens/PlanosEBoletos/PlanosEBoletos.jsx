import "./PlanosEBoletos.css";
import { GoGear } from "react-icons/go";
import { Link } from "react-router-dom";

function PlanosEBoletos() {
  return (
    <div id="PlanosEBoletos">
      <h2>Planos e Boletos</h2>
      <p>
        Tudo sobre pagamentos, assinaturas e vencimentos dos serviços da
        CashInBox.
      </p>

      <div id="areaPlanosEPagamento">
        <div id="BlocoUmDetalhesPagamento">
          <h2>Boleto Menssal</h2>
          <div>
            <span>
              <p>Plano - {"Basic"}</p>
              <p>{"R$ 69,90"}</p>
            </span>

            <span>
              <p>De 26/12/2024 a 21/12/2025</p>
              <p>Próximo boleto em 28 dias</p>
            </span>

            <a id="mudarPlanoPlanosBoletos">Mudar Plano</a>

            <div id="areaStatusPagamento">
              <button id="ButtonDowloadBoleto">Dowload Boleto</button>
              <strong>Pagamento recebido</strong>
            </div>
          </div>
        </div>

        <div id="cardDadosDoEstabelecimentoPlanosEBoletos">
          <h2>Dados da conta</h2>
          <p>
            <strong>Nome do estabelecimento: </strong> {"CashInBox - Dev"}
          </p>
          <p>
            <strong>Cnpj: </strong> {"8481000185485"}
          </p>

          <Link to={`/configurações`} id="EditarDadosPlanosEBoletos"><GoGear /> Editar Dados</Link>
        </div>
      </div>
    </div>
  );
}

export default PlanosEBoletos;
