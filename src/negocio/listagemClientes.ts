import Cliente from "../modelo/cliente";
import { carregarDados, reconstruirClientes } from "../utils/registros";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        this.clientes = reconstruirClientes(carregarDados<Cliente>('clientes.json'));
        console.log(`\nLista de todos os clientes:\n`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);

            console.log(`Rgs cadastrados: `);
            const rgs = cliente.getRgs;
            if (rgs.length > 0) {
                rgs.forEach(rg =>
                    console.log(`\n- ${rg.getValor}\n`)
                );
            } else {
                console.log(`Nenhum RG cadastrado`);
            }

            console.log(`Telefones cadastrados: `);
            const telefones = cliente.getTelefones;
            if(telefones.length > 0) {
                telefones.forEach(telefones =>
                    console.log(`\n- (${telefones.getDdd}) ${telefones.getNumero}\n`)
                );
            } else {
                console.log(`Nenhum telefone cadastrado`);
            }

            console.log(`Produtos associados: `);
            const produtos = cliente.getProdutosConsumidos;
            if (produtos.length > 0) {
                produtos.forEach( produto => 
                    console.log(`\n- ${produto.nome}\n`)
                );
            } else {
                console.log(`Nenhum produto associado`);
            }

            console.log(`Serviços associados: `);
            const servicos = cliente.getServicosConsumidos;
            if (servicos.length > 0) {
                servicos.forEach(servico =>
                    console.log(`\n- ${servico.nome}\n`)
                );
            } else {
                console.log(`Nenhum serviço associado`);
            }
            console.log(`--------------------------------------`);
        });
    }
}