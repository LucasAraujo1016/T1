import Servico from "../modelo/servico";
import { carregarDados } from "../utils/registros";
import Listagem from "./listagem";

export default class listagemServicos extends Listagem{
    private servicos: Array<Servico>;

    constructor (servicos: Array<Servico>) {
        super();
        this.servicos = servicos
    }

    public listar(): void {
        this.servicos = carregarDados<Servico>('servicos.json');
        console.log(`\nLista de serviços: \n`)
        this.servicos.forEach(servico => {
            console.log(`Nome: ${servico.nome}`);
            console.log(`Valor: R$${servico.valor.toFixed(2)}`);
            console.log(`--------------------------------------`);        
        });
    }
}