import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"
import CadastroCliente from "../negocio/cadastroCliente";
import AtualizarCliente from "../negocio/atualizarCliente";
import ListagemClientes from "../negocio/listagemClientes";
import DeletarCliente from "../negocio/deletarCliente";
import CadastroProduto from "../negocio/cadastroProduto";
import AtualizarProduto from "../negocio/atualizarProduto";
import ListagemProdutos from "../negocio/listagemProdutos";
import DeletarProduto from "../negocio/deletarProduto";
import CadastroServico from "../negocio/casdastoServicos";
import atualizarServico from "../negocio/atualizarServico";
import deletarServico from "../negocio/deletarServico";
import listagemServicos from "../negocio/listagemServico";
import { carregarDados } from "../utils/registros";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import { ListagemClientesGenero, ListagemMaisConsumidos, ListagemMaisConsumidosPorGenero, ListagemTop10Consumidores, ListagemTop10MenosConsumidores, ListagemTop5MaiorValor } from "../negocio/listagensEspeciais";

const clientes: Cliente[] = carregarDados<Cliente>('clientes.json');
const produtos: Produto[] = carregarDados<Produto>('produtos.json');
const servicos: Servico[] = carregarDados<Servico>('servicos.json');

console.log(`Bem-vindo ao sistema do Grupo World Beauty`);
let empresa = new Empresa(clientes, produtos, servicos);
let execucao = true
let entrada = new Entrada()

while (execucao) {
    console.log(`\nMenu principal`);
    console.log(`1 - Gerenciar Clientes`);
    console.log(`2 - Gerenciar Produtos`);
    console.log(`3 - Gerenciar Serviços`)
    console.log(`4 - Listagem mais consumidos`)
    console.log(`0 - Sair`);

    let escolhaPrincipal = entrada.receberNumero(`Por favor, escolha uma opção: `)
    switch(escolhaPrincipal) {
        case 1:
            console.log(`\nGerenciamento de Clientes`);
            console.log(`1 - Cadastrar cliente`);
            console.log(`2 - Atualizar cliente`);
            console.log(`3 - Excluir cliente`);
            console.log(`4 - Listagens`);
            console.log(`0 - Voltar`);

            let opcaoCliente = entrada.receberNumero(`Por favor, escolha uma opção: `)

            switch (opcaoCliente) {
                case 1:
                    new CadastroCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos).cadastrar();
                    break;
                case 2:
                    new AtualizarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos).atualizar();
                    break;
                case 3:
                    new DeletarCliente(empresa.getClientes).deletar();
                    break;
                case 4:
                    console.log(`\nTipos de listagens:`);
                    console.log(`1 - Listagem geral`);
                    console.log(`2 - Listagem por genero`);
                    console.log(`3 - Top 10 maiores consumidores`);
                    console.log(`4 - Top 10 menores consumidores`);
                    console.log(`5 - Top 5 consumidores (Valor)`)
                    console.log(`0 - Voltar`)

                    let opcaoListagem = entrada.receberNumero(`Por favor, escolha uma opção: `)

                    switch (opcaoListagem) {
                        case 1:
                            new ListagemClientes(empresa.getClientes).listar();
                            break;
                        case 2:
                            new ListagemClientesGenero().listar();
                            break;
                        case 3:
                            new ListagemTop10Consumidores().listar();
                            break;
                        case 4:
                            new ListagemTop10MenosConsumidores().listar();
                            break;
                        case 5:
                            new ListagemTop5MaiorValor().listar();
                            break;
                        case 0:
                            break;
                        default:
                            console.log(`Operação não entendida :(`);
                    }
                    break;

                case 0:
                    break;
                default:
                    console.log(`Operação não entendida :(`);
            }
            break;

        case 2:          
            console.log(`\nGerenciamento de Produtos`);
            console.log(`1 - Cadastrar Produto`);
            console.log(`2 - Atualizar Produto`);
            console.log(`3 - Excluir Produto`);
            console.log(`4 - Listar todos os Produtos`);
            console.log(`0 - Voltar`);
            
            let opcaoProduto = entrada.receberNumero(`Por favor, escolha uma opção: `)

            switch (opcaoProduto) {
                case 1:
                    new CadastroProduto(empresa.getProdutos).cadastrar();
                    break;
                case 2:
                    new AtualizarProduto(empresa.getProdutos).atualizar();
                    break;
                case 3:
                    new DeletarProduto(empresa.getProdutos).deletar();
                    break;
                case 4:
                    new ListagemProdutos(empresa.getProdutos).listar();
                    break;
                case 0:
                    break;
                default:
                    console.log(`Operação não entendida :(`);
            }
            break;

        case 3:
            console.log(`\nGerenciamento de Serviços`);
            console.log(`1 - Cadastrar Serviço`);
            console.log(`2 - Atualizar Serviço`);
            console.log(`3 - Excluir Serviço`);
            console.log(`4 - Listar todos os Serviços`);
            console.log(`0 - Voltar`);
            
            let opcaoServico = entrada.receberNumero(`Por favor, escolha uma opção: `)

            switch (opcaoServico) {
                case 1:
                    new CadastroServico(empresa.getServicos).cadastrar();
                    break;
                case 2:
                    new atualizarServico(empresa.getServicos).atualizar();
                    break;
                case 3:
                    new deletarServico(empresa.getServicos).deletar();
                    break;
                case 4:
                    new listagemServicos(empresa.getServicos).listar();
                    break;
                case 0:
                    break;
                default:
                    console.log(`Operação não entendida :(`);
            }
            break;
            
        case 4:
            console.log(`\nTipos de listagem:`);
            console.log(`1 - Listagem de mais consumidos`);
            console.log(`2 - Listagem de mais consumidos por gênero`);
            console.log(`0 - Voltar`);

            let opcaoListagemConsumidos = entrada.receberNumero('Por favor escolha uma opção: ');

            switch (opcaoListagemConsumidos) {
                case 1:
                    new ListagemMaisConsumidos().listar();
                    break;
                case 2:
                    new ListagemMaisConsumidosPorGenero().listar();
                    break;
                case 0:
                    break;
                default:
                    console.log(`Operação não entendida :(`);
            }
            break;
            
        case 0:
            execucao = false;
            console.log(`Até mais!`);
            break;
        
        default:
            console.log(`Operação não entendida :(`)
    }
}