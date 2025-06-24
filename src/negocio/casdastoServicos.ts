import Entrada from "../io/entrada";
import Cadastro from "./cadastro";
import Servico from "../modelo/servico";
import { reconstruirServicos, carregarDados, salvarDados } from "../utils/registros";

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de serviço`);
        let nome = this.entrada.receberTexto(`Informe o nome do serviço: `);

        this.servicos.length = 0;
        this.servicos.push(...reconstruirServicos(carregarDados('servicos.json')));
        const servicoExistente = this.servicos.some(s => s.getNome === nome);
        if (servicoExistente) {
            console.log(`\nJá existe um serviço cadastrado com o nome "${nome}". Cadastro cancelado.`);
            return;
        }

        let valor = this.entrada.receberNumero(`Informe o valor do serviço: `);
        valor = Number(Number(valor).toFixed(2));
        let servico = new Servico(nome, valor);
        this.servicos.push(servico);
        salvarDados('servicos.json', this.servicos);
        console.log(`\nServiço cadastrado com sucesso`);
    }
}