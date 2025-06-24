import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Cadastro from "./cadastro";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import { carregarDados, reconstruirClientes, reconstruirProdutos, reconstruirServicos, salvarDados } from "../utils/registros";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        super()
        this.clientes = clientes
        this.produtos = produtos
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
        let genero = this.entrada.receberTexto(`Por favor informe o gênero do cliente (M/F): `).toLocaleUpperCase();
        while (genero !== 'M' && genero !== 'F') {
            genero = this.entrada.receberTexto(`Por favor informe um gênero valido para o sistema (M/F): `).toLocaleUpperCase();
        }

        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        
        this.clientes.length = 0;
        this.clientes.push(...reconstruirClientes(carregarDados('clientes.json')));
        const cpfExistente = this.clientes.some(cliente => cliente.getCpf.getValor === valor);
        if (cpfExistente) {
            console.log(`\nJá existe um cliente cadastrado com o CPF ${valor}. Cadastro cancelado.`);
            return;
        }

        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/')
        let ano = new Number(partesData[2].valueOf()).valueOf()
        let mes = new Number(partesData[1].valueOf()).valueOf()
        let dia = new Number(partesData[0].valueOf()).valueOf()
        let dataEmissao = new Date(ano, mes, dia);
        let cpf = new CPF(valor, dataEmissao);
        let cliente = new Cliente(nome, nomeSocial, genero, cpf);

        let cadastrarRg = this.entrada.receberTexto(`Deseja cadastrar um RG? (S/N): `).toLocaleUpperCase();
        let contadorRg = 1;
        while (cadastrarRg === 'S') {
            let valorRg = this.entrada.receberTexto(`Informe o número do RG ${contadorRg}: `);
            let dataRg = this.entrada.receberTexto(`Informe a data de emissão do RG ${contadorRg} (dd/mm/yyyy): `);
            let partesDataRg = dataRg.split('/');
            let anoRg = Number(partesDataRg[2]);
            let mesRg = Number(partesDataRg[1]); 
            let diaRg = Number(partesDataRg[0]);
            let dataEmissaoRg = new Date(anoRg, mesRg, diaRg);
            let rg = new RG(valorRg, dataEmissaoRg);
            cliente.adicionarRg(rg);
            cadastrarRg = this.entrada.receberTexto(`Deseja cadastrar mais um RG? (S/N): `).toLocaleUpperCase();
            contadorRg++
        }

        let cadastrarTelefone = this.entrada.receberTexto(`Deseja cadastrar um telefone? (S/N): `).toLocaleUpperCase();
        let contadorTelefone = 1;
        while (cadastrarTelefone === 'S') {
            let ddd = this.entrada.receberTexto(`Informe o DDD do telefone ${contadorTelefone}: `)
            let numero = this.entrada.receberTexto(`Informe o número do telefone ${contadorTelefone}: `);
            let telefone = new Telefone(ddd, numero);
            cliente.adicionarTelefone(telefone);
            cadastrarTelefone = this.entrada.receberTexto(`Deseja cadastrar mais um telefone? (S/N): `).toLocaleUpperCase();
            contadorTelefone++
        }

        const produtosDisponiveis = reconstruirProdutos(carregarDados('produtos.json'));
        if(produtosDisponiveis.length > 0){
            console.log(`\nProdutos disponiveis para associação: `);
            produtosDisponiveis.forEach((produto, index) => {
                console.log(`${index + 1} - ${produto.nome}`);
            });

            let associarProdutos = this.entrada.receberTexto(`Deseja associar um produto ao cliente? (S/N): `).toLocaleUpperCase();
            while(associarProdutos === 'S') {
                let nomeProduto = this.entrada.receberTexto(`Digite o nome do produto que deseja associar: `).toLowerCase();
                let produtoSelecionado = produtosDisponiveis.find(p => p.nome.toLowerCase() === nomeProduto);

                if (produtoSelecionado) {
                    cliente.adicionarProduto(produtoSelecionado);
                    console.log(`Produto "${nomeProduto}" associado com sucesso!`);
                } else {
                    console.log(`Produto "${nomeProduto}" não encontrado.`);
                }

                associarProdutos = this.entrada.receberTexto(`Deseja associar mais um produto? (S/N): `).toLocaleUpperCase();
            }
        } else {
            console.log(`Sem produtos disponiveis no momento`)
        }

        const servicosDisponiveis = reconstruirServicos(carregarDados('servicos.json'));
        if(servicosDisponiveis.length > 0){
            console.log(`\nServiços disponiveis para associação: `);
            servicosDisponiveis.forEach((servico, index) => {
                console.log(`${index + 1} - ${servico.nome}`);
            });

            let associarServico = this.entrada.receberTexto(`Deseja associar um serviço ao cliente? (S/N): `).toLocaleUpperCase();
            while(associarServico === 'S') {
                let nomeServico = this.entrada.receberTexto(`Digite o nome do serviço que deseja associar: `).toLowerCase();
                let servicoSelecionado = servicosDisponiveis.find(s => s.nome.toLowerCase() === nomeServico);

                if (servicoSelecionado) {
                    cliente.adicionarServico(servicoSelecionado);
                    console.log(`Serviço "${nomeServico}" associado com sucesso!`);
                } else {
                    console.log(`Serviço "${nomeServico}" não encontrado.`);
                }

                associarServico = this.entrada.receberTexto(`Deseja associar mais um serviço? (S/N): `).toLocaleUpperCase();
            }
        } else {
            console.log(`Sem serviços disponiveis no momento`)
        }
        this.clientes.push(cliente)
        salvarDados('clientes.json', this.clientes);
        console.log(`\nCadastro concluído :)`);
    }
}

