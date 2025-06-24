import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import { reconstruirServicos, carregarDados,salvarDados } from "../utils/registros";

export default class atualizarServico {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor (servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nInicio da atualização de serviços`);
        this.servicos.length = 0;
        this.servicos.push(...reconstruirServicos(carregarDados<Servico>('servicos.json')));
        let nome = this.entrada.receberTexto(`Informe o nome do serviço a ser atualizado: `);
        let servico = this.servicos.find(s => s.getNome === nome);
        if (servico) {
            let novoNome = this.entrada.receberTexto(`Digite o novo nome do serviço: `);
            let servicoExistente = this.servicos.some(s => s.getNome === nome);
            if (servicoExistente) {
                console.log(`\nJá existe um serviço cadastrado com o nome "${novoNome}". atualização cancelada.`);
                return;
            } else {
                servico.nome = novoNome;
            }
            let novoValor = this.entrada.receberNumero(`Digite o novo valor do serviço: `);
            servico.valor = Number(Number(novoValor).toFixed(2));
            salvarDados('servicos.json', this.servicos);
            console.log(`\nServiço atualizado com sucesso!`);
        } else {
            console.log(`\nServiço não encontrado`)
        }
    }
}