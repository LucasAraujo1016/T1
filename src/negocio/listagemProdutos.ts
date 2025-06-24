import Produto from "../modelo/produto";
import { carregarDados } from "../utils/registros";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
    }

    public listar(): void {
        this.produtos = carregarDados<Produto>('produtos.json');
        console.log(`\nLista de produtos: \n`);
        this.produtos.forEach(produto => {
            console.log(`Nome: ${produto.nome}`);
            console.log(`Valor: R$${produto.valor.toFixed(2)}`);
            console.log(`--------------------------------------`);
        });
    }
}