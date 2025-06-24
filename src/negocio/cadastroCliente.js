"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = require("../io/entrada");
var cliente_1 = require("../modelo/cliente");
var cpf_1 = require("../modelo/cpf");
var rg_1 = require("../modelo/rg");
var telefone_1 = require("../modelo/telefone");
var cadastro_1 = require("./cadastro");
var registros_1 = require("../utils/registros");
var CadastroCliente = /** @class */ (function (_super) {
    __extends(CadastroCliente, _super);
    function CadastroCliente(clientes, produtos, servicos) {
        var _this = _super.call(this) || this;
        _this.clientes = clientes;
        _this.produtos = produtos;
        _this.servicos = servicos;
        _this.entrada = new entrada_1.default();
        return _this;
    }
    CadastroCliente.prototype.cadastrar = function () {
        var _a;
        console.log("\nIn\u00EDcio do cadastro do cliente");
        var nome = this.entrada.receberTexto("Por favor informe o nome do cliente: ");
        var nomeSocial = this.entrada.receberTexto("Por favor informe o nome social do cliente: ");
        var genero = this.entrada.receberTexto("Por favor informe o g\u00EAnero do cliente (M/F): ").toLocaleUpperCase();
        while (genero !== 'M' && genero !== 'F') {
            genero = this.entrada.receberTexto("Por favor informe um g\u00EAnero valido para o sistema (M/F): ").toLocaleUpperCase();
        }
        var valor = this.entrada.receberTexto("Por favor informe o n\u00FAmero do cpf: ");
        this.clientes.length = 0;
        (_a = this.clientes).push.apply(_a, (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json')));
        var cpfExistente = this.clientes.some(function (cliente) { return cliente.getCpf.getValor === valor; });
        if (cpfExistente) {
            console.log("\nJ\u00E1 existe um cliente cadastrado com o CPF ".concat(valor, ". Cadastro cancelado."));
            return;
        }
        var data = this.entrada.receberTexto("Por favor informe a data de emiss\u00E3o do cpf, no padr\u00E3o dd/mm/yyyy: ");
        var partesData = data.split('/');
        var ano = new Number(partesData[2].valueOf()).valueOf();
        var mes = new Number(partesData[1].valueOf()).valueOf();
        var dia = new Number(partesData[0].valueOf()).valueOf();
        var dataEmissao = new Date(ano, mes, dia);
        var cpf = new cpf_1.default(valor, dataEmissao);
        var cliente = new cliente_1.default(nome, nomeSocial, genero, cpf);
        var cadastrarRg = this.entrada.receberTexto("Deseja cadastrar um RG? (S/N): ").toLocaleUpperCase();
        var contadorRg = 1;
        while (cadastrarRg === 'S') {
            var valorRg = this.entrada.receberTexto("Informe o n\u00FAmero do RG ".concat(contadorRg, ": "));
            var dataRg = this.entrada.receberTexto("Informe a data de emiss\u00E3o do RG ".concat(contadorRg, " (dd/mm/yyyy): "));
            var partesDataRg = dataRg.split('/');
            var anoRg = Number(partesDataRg[2]);
            var mesRg = Number(partesDataRg[1]);
            var diaRg = Number(partesDataRg[0]);
            var dataEmissaoRg = new Date(anoRg, mesRg, diaRg);
            var rg = new rg_1.default(valorRg, dataEmissaoRg);
            cliente.adicionarRg(rg);
            cadastrarRg = this.entrada.receberTexto("Deseja cadastrar mais um RG? (S/N): ").toLocaleUpperCase();
            contadorRg++;
        }
        var cadastrarTelefone = this.entrada.receberTexto("Deseja cadastrar um telefone? (S/N): ").toLocaleUpperCase();
        var contadorTelefone = 1;
        while (cadastrarTelefone === 'S') {
            var ddd = this.entrada.receberTexto("Informe o DDD do telefone ".concat(contadorTelefone, ": "));
            var numero = this.entrada.receberTexto("Informe o n\u00FAmero do telefone ".concat(contadorTelefone, ": "));
            var telefone = new telefone_1.default(ddd, numero);
            cliente.adicionarTelefone(telefone);
            cadastrarTelefone = this.entrada.receberTexto("Deseja cadastrar mais um telefone? (S/N): ").toLocaleUpperCase();
            contadorTelefone++;
        }
        var produtosDisponiveis = (0, registros_1.reconstruirProdutos)((0, registros_1.carregarDados)('produtos.json'));
        if (produtosDisponiveis.length > 0) {
            console.log("\nProdutos disponiveis para associa\u00E7\u00E3o: ");
            produtosDisponiveis.forEach(function (produto, index) {
                console.log("".concat(index + 1, " - ").concat(produto.nome));
            });
            var associarProdutos = this.entrada.receberTexto("Deseja associar um produto ao cliente? (S/N): ").toLocaleUpperCase();
            var _loop_1 = function () {
                var nomeProduto = this_1.entrada.receberTexto("Digite o nome do produto que deseja associar: ").toLowerCase();
                var produtoSelecionado = produtosDisponiveis.find(function (p) { return p.nome.toLowerCase() === nomeProduto; });
                if (produtoSelecionado) {
                    cliente.adicionarProduto(produtoSelecionado);
                    console.log("Produto \"".concat(nomeProduto, "\" associado com sucesso!"));
                }
                else {
                    console.log("Produto \"".concat(nomeProduto, "\" n\u00E3o encontrado."));
                }
                associarProdutos = this_1.entrada.receberTexto("Deseja associar mais um produto? (S/N): ").toLocaleUpperCase();
            };
            var this_1 = this;
            while (associarProdutos === 'S') {
                _loop_1();
            }
        }
        else {
            console.log("Sem produtos disponiveis no momento");
        }
        var servicosDisponiveis = (0, registros_1.reconstruirServicos)((0, registros_1.carregarDados)('servicos.json'));
        if (servicosDisponiveis.length > 0) {
            console.log("\nServi\u00E7os disponiveis para associa\u00E7\u00E3o: ");
            servicosDisponiveis.forEach(function (servico, index) {
                console.log("".concat(index + 1, " - ").concat(servico.nome));
            });
            var associarServico = this.entrada.receberTexto("Deseja associar um servi\u00E7o ao cliente? (S/N): ").toLocaleUpperCase();
            var _loop_2 = function () {
                var nomeServico = this_2.entrada.receberTexto("Digite o nome do servi\u00E7o que deseja associar: ").toLowerCase();
                var servicoSelecionado = servicosDisponiveis.find(function (s) { return s.nome.toLowerCase() === nomeServico; });
                if (servicoSelecionado) {
                    cliente.adicionarServico(servicoSelecionado);
                    console.log("Servi\u00E7o \"".concat(nomeServico, "\" associado com sucesso!"));
                }
                else {
                    console.log("Servi\u00E7o \"".concat(nomeServico, "\" n\u00E3o encontrado."));
                }
                associarServico = this_2.entrada.receberTexto("Deseja associar mais um servi\u00E7o? (S/N): ").toLocaleUpperCase();
            };
            var this_2 = this;
            while (associarServico === 'S') {
                _loop_2();
            }
        }
        else {
            console.log("Sem servi\u00E7os disponiveis no momento");
        }
        this.clientes.push(cliente);
        (0, registros_1.salvarDados)('clientes.json', this.clientes);
        console.log("\nCadastro conclu\u00EDdo :)");
    };
    return CadastroCliente;
}(cadastro_1.default));
exports.default = CadastroCliente;
