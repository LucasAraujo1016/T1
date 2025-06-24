import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import { reconstruirProdutos, carregarDados, salvarDados } from "../utils/registros";
import Cadastro from "./cadastro";

export default class CadastroProduto extends Cadastro {
	private produtos: Array<Produto>;
	private entrada: Entrada;

	constructor(produtos: Array<Produto>) {
		super();
		this.produtos = produtos;
		this.entrada = new Entrada();
	}

	public cadastrar(): void {
		console.log(`\nInício do cadastro de produto`);
		let nome = this.entrada.receberTexto(`Informe o nome do produto: `);

		this.produtos.length = 0;
		this.produtos.push(...reconstruirProdutos(carregarDados('produtos.json')));
		const produtoExistente = this.produtos.some(p => p.getNome === nome);
		if (produtoExistente) {
			console.log(`\nJá existe um produto cadastrado com o nome "${nome}". Cadastro cancelado.`);
			return;
		}

		let valor = this.entrada.receberNumero(`Informe o valor do produto: `);
		valor = Number(Number(valor).toFixed(2));
		let produto = new Produto(nome, valor);
		this.produtos.push(produto);
		salvarDados('produtos.json', this.produtos);
		console.log(`\nProduto cadastrado com sucesso\n`);
	}
}