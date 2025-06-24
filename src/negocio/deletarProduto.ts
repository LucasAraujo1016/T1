import Entrada from "../io/entrada"
import Produto from "../modelo/produto";
import { carregarDados, reconstruirProdutos, salvarDados } from "../utils/registros";

export default class DeletarProduto {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public deletar() {
        console.log(`\nInicio do processo de exclusão de produto`)
        this.produtos = reconstruirProdutos(carregarDados('produtos.json'));
        let nome = this.entrada.receberTexto(`Informe o nome do produto a ser excluído: `);
        let produto = this.produtos.findIndex(p => p.nome === nome);
        if (produto !== -1) {
            let confirmacao = this.entrada.receberTexto(`Confirma a exclusão do produto ${nome}? (S/N): `);
            if (confirmacao.toUpperCase() === 'S') {
                this.produtos.splice(produto, 1);
                salvarDados('produtos.json', this.produtos);
                console.log(`\nProduto ${nome} foi excluído com sucesso.\n`);
            } else {
                console.log('\n Exclusão cancelada\n');
            }
        } else {
            console.log('\nProduto não encontrado.\n');
        }
    }
}