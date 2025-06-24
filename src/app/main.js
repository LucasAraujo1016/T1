"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = require("../io/entrada");
var empresa_1 = require("../modelo/empresa");
var cadastroCliente_1 = require("../negocio/cadastroCliente");
var atualizarCliente_1 = require("../negocio/atualizarCliente");
var listagemClientes_1 = require("../negocio/listagemClientes");
var deletarCliente_1 = require("../negocio/deletarCliente");
var cadastroProduto_1 = require("../negocio/cadastroProduto");
var atualizarProduto_1 = require("../negocio/atualizarProduto");
var listagemProdutos_1 = require("../negocio/listagemProdutos");
var deletarProduto_1 = require("../negocio/deletarProduto");
var casdastoServicos_1 = require("../negocio/casdastoServicos");
var atualizarServico_1 = require("../negocio/atualizarServico");
var deletarServico_1 = require("../negocio/deletarServico");
var listagemServico_1 = require("../negocio/listagemServico");
var registros_1 = require("../utils/registros");
var listagensEspeciais_1 = require("../negocio/listagensEspeciais");
var clientes = (0, registros_1.carregarDados)('clientes.json');
var produtos = (0, registros_1.carregarDados)('produtos.json');
var servicos = (0, registros_1.carregarDados)('servicos.json');
console.log("Bem-vindo ao sistema do Grupo World Beauty");
var empresa = new empresa_1.default(clientes, produtos, servicos);
var execucao = true;
var entrada = new entrada_1.default();
while (execucao) {
    console.log("\nMenu principal");
    console.log("1 - Gerenciar Clientes");
    console.log("2 - Gerenciar Produtos");
    console.log("3 - Gerenciar Servi\u00E7os");
    console.log("4 - Listagem mais consumidos");
    console.log("0 - Sair");
    var escolhaPrincipal = entrada.receberNumero("Por favor, escolha uma op\u00E7\u00E3o: ");
    switch (escolhaPrincipal) {
        case 1:
            console.log("\nGerenciamento de Clientes");
            console.log("1 - Cadastrar cliente");
            console.log("2 - Atualizar cliente");
            console.log("3 - Excluir cliente");
            console.log("4 - Listagens");
            console.log("0 - Voltar");
            var opcaoCliente = entrada.receberNumero("Por favor, escolha uma op\u00E7\u00E3o: ");
            switch (opcaoCliente) {
                case 1:
                    new cadastroCliente_1.default(empresa.getClientes, empresa.getProdutos, empresa.getServicos).cadastrar();
                    break;
                case 2:
                    new atualizarCliente_1.default(empresa.getClientes, empresa.getProdutos, empresa.getServicos).atualizar();
                    break;
                case 3:
                    new deletarCliente_1.default(empresa.getClientes).deletar();
                    break;
                case 4:
                    console.log("\nTipos de listagens:");
                    console.log("1 - Listagem geral");
                    console.log("2 - Listagem por genero");
                    console.log("3 - Top 10 maiores consumidores");
                    console.log("4 - Top 10 menores consumidores");
                    console.log("5 - Top 5 consumidores (Valor)");
                    console.log("0 - Voltar");
                    var opcaoListagem = entrada.receberNumero("Por favor, escolha uma op\u00E7\u00E3o: ");
                    switch (opcaoListagem) {
                        case 1:
                            new listagemClientes_1.default(empresa.getClientes).listar();
                            break;
                        case 2:
                            new listagensEspeciais_1.ListagemClientesGenero().listar();
                            break;
                        case 3:
                            new listagensEspeciais_1.ListagemTop10Consumidores().listar();
                            break;
                        case 4:
                            new listagensEspeciais_1.ListagemTop10MenosConsumidores().listar();
                            break;
                        case 5:
                            new listagensEspeciais_1.ListagemTop5MaiorValor().listar();
                            break;
                        case 0:
                            break;
                        default:
                            console.log("Opera\u00E7\u00E3o n\u00E3o entendida :(");
                    }
                    break;
                case 0:
                    break;
                default:
                    console.log("Opera\u00E7\u00E3o n\u00E3o entendida :(");
            }
            break;
        case 2:
            console.log("\nGerenciamento de Produtos");
            console.log("1 - Cadastrar Produto");
            console.log("2 - Atualizar Produto");
            console.log("3 - Excluir Produto");
            console.log("4 - Listar todos os Produtos");
            console.log("0 - Voltar");
            var opcaoProduto = entrada.receberNumero("Por favor, escolha uma op\u00E7\u00E3o: ");
            switch (opcaoProduto) {
                case 1:
                    new cadastroProduto_1.default(empresa.getProdutos).cadastrar();
                    break;
                case 2:
                    new atualizarProduto_1.default(empresa.getProdutos).atualizar();
                    break;
                case 3:
                    new deletarProduto_1.default(empresa.getProdutos).deletar();
                    break;
                case 4:
                    new listagemProdutos_1.default(empresa.getProdutos).listar();
                    break;
                case 0:
                    break;
                default:
                    console.log("Opera\u00E7\u00E3o n\u00E3o entendida :(");
            }
            break;
        case 3:
            console.log("\nGerenciamento de Servi\u00E7os");
            console.log("1 - Cadastrar Servi\u00E7o");
            console.log("2 - Atualizar Servi\u00E7o");
            console.log("3 - Excluir Servi\u00E7o");
            console.log("4 - Listar todos os Servi\u00E7os");
            console.log("0 - Voltar");
            var opcaoServico = entrada.receberNumero("Por favor, escolha uma op\u00E7\u00E3o: ");
            switch (opcaoServico) {
                case 1:
                    new casdastoServicos_1.default(empresa.getServicos).cadastrar();
                    break;
                case 2:
                    new atualizarServico_1.default(empresa.getServicos).atualizar();
                    break;
                case 3:
                    new deletarServico_1.default(empresa.getServicos).deletar();
                    break;
                case 4:
                    new listagemServico_1.default(empresa.getServicos).listar();
                    break;
                case 0:
                    break;
                default:
                    console.log("Opera\u00E7\u00E3o n\u00E3o entendida :(");
            }
            break;
        case 4:
            console.log("\nTipos de listagem:");
            console.log("1 - Listagem de mais consumidos");
            console.log("2 - Listagem de mais consumidos por g\u00EAnero");
            console.log("0 - Voltar");
            var opcaoListagemConsumidos = entrada.receberNumero('Por favor escolha uma opção: ');
            switch (opcaoListagemConsumidos) {
                case 1:
                    new listagensEspeciais_1.ListagemMaisConsumidos().listar();
                    break;
                case 2:
                    new listagensEspeciais_1.ListagemMaisConsumidosPorGenero().listar();
                    break;
                case 0:
                    break;
                default:
                    console.log("Opera\u00E7\u00E3o n\u00E3o entendida :(");
            }
            break;
        case 0:
            execucao = false;
            console.log("At\u00E9 mais!");
            break;
        default:
            console.log("Opera\u00E7\u00E3o n\u00E3o entendida :(");
    }
}
