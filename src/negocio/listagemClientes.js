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
var registros_1 = require("../utils/registros");
var listagem_1 = require("./listagem");
var ListagemClientes = /** @class */ (function (_super) {
    __extends(ListagemClientes, _super);
    function ListagemClientes(clientes) {
        var _this = _super.call(this) || this;
        _this.clientes = clientes;
        return _this;
    }
    ListagemClientes.prototype.listar = function () {
        this.clientes = (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json'));
        console.log("\nLista de todos os clientes:\n");
        this.clientes.forEach(function (cliente) {
            console.log("Nome: " + cliente.nome);
            console.log("Nome social: " + cliente.nomeSocial);
            console.log("CPF: " + cliente.getCpf.getValor);
            console.log("Rgs cadastrados: ");
            var rgs = cliente.getRgs;
            if (rgs.length > 0) {
                rgs.forEach(function (rg) {
                    return console.log("\n- ".concat(rg.getValor, "\n"));
                });
            }
            else {
                console.log("Nenhum RG cadastrado");
            }
            console.log("Telefones cadastrados: ");
            var telefones = cliente.getTelefones;
            if (telefones.length > 0) {
                telefones.forEach(function (telefones) {
                    return console.log("\n- (".concat(telefones.getDdd, ") ").concat(telefones.getNumero, "\n"));
                });
            }
            else {
                console.log("Nenhum telefone cadastrado");
            }
            console.log("Produtos associados: ");
            var produtos = cliente.getProdutosConsumidos;
            if (produtos.length > 0) {
                produtos.forEach(function (produto) {
                    return console.log("\n- ".concat(produto.nome, "\n"));
                });
            }
            else {
                console.log("Nenhum produto associado");
            }
            console.log("Servi\u00E7os associados: ");
            var servicos = cliente.getServicosConsumidos;
            if (servicos.length > 0) {
                servicos.forEach(function (servico) {
                    return console.log("\n- ".concat(servico.nome, "\n"));
                });
            }
            else {
                console.log("Nenhum servi\u00E7o associado");
            }
            console.log("--------------------------------------");
        });
    };
    return ListagemClientes;
}(listagem_1.default));
exports.default = ListagemClientes;
