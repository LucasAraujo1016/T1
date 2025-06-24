import Entrada from "../io/entrada"
import Produto from "../modelo/produto";
import { carregarDados, reconstruirProdutos, salvarDados } from "../utils/registros";

export default class AtualizarProduto {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor (produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nInicio da atualização do produto`);
        this.produtos.length = 0;
        this.produtos.push(...reconstruirProdutos(carregarDados<Produto>('produtos.json')));
        let nome = this.entrada.receberTexto(`Informe o nome do produto a ser atualizado: `);
        let produto = this.produtos.find(p => p.getNome === nome);
        if (produto) {
            let novoNome = this.entrada.receberTexto(`Informe o novo nome do produto: `);
            let produtoExistente = this.produtos.some(p => p.getNome === nome);
            if (produtoExistente) {
                console.log(`\nJá existe um produto cadastrado com o nome "${novoNome}". atualização cancelada.`);
                return;
            } else {
                produto.nome = novoNome;
            }
            let novoValor = this.entrada.receberNumero(`Informe o novo valor do produto: `);
            produto.valor = Number(Number(novoValor).toFixed(2));
            salvarDados('produtos.json', this.produtos);
            console.log(`\nProduto atualizado com sucesso!`)
        } else {
            console.log(`\nProduto não encontrado`)
        }
    }
}