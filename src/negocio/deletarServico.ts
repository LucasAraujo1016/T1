import Entrada from "../io/entrada"
import Servico from "../modelo/servico";
import { carregarDados, reconstruirServicos, salvarDados } from "../utils/registros";

export default class deletarServico {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public deletar() {
        console.log(`\nInicio do processo de exclusão de serviço`)
        this.servicos = reconstruirServicos(carregarDados('servicos.json'));
        let nome = this.entrada.receberTexto(`Informe o nome do serviço a ser excluído: `);
        let servico= this.servicos.findIndex(s => s.nome === nome);
        if (servico !== -1) {
            let confirmacao = this.entrada.receberTexto(`Confirma a exclusão do serviço ${nome}? (S/N): `);
            if (confirmacao.toUpperCase() === 'S') {
                this.servicos.splice(servico, 1);
                salvarDados('servicos.json', this.servicos);
                console.log(`\nServiço ${nome} foi excluído com sucesso.\n`);
            } else {
                console.log('\n Exclusão cancelada\n');
            }
        } else {
            console.log('\nServiço não encontrado.\n');
        }
    }
}