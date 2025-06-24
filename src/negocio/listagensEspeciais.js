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
exports.ListagemTop5MaiorValor = exports.ListagemTop10MenosConsumidores = exports.ListagemMaisConsumidosPorGenero = exports.ListagemMaisConsumidos = exports.ListagemClientesGenero = exports.ListagemTop10Consumidores = void 0;
var registros_1 = require("../utils/registros");
var listagem_1 = require("./listagem");
var ListagemTop10Consumidores = /** @class */ (function (_super) {
    __extends(ListagemTop10Consumidores, _super);
    function ListagemTop10Consumidores() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListagemTop10Consumidores.prototype.listar = function () {
        var clientes = (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json'));
        var ranking = clientes.map(function (cliente) { return ({
            cliente: cliente,
            total: (cliente.getProdutosConsumidos.length || 0) + (cliente.getServicosConsumidos.length || 0)
        }); }).sort(function (a, b) { return b.total - a.total; }).slice(0, 10);
        console.log("\nTop 10 clientes que mais consumiram:\n");
        ranking.forEach(function (item, index) {
            console.log("".concat(index + 1, ". ").concat(item.cliente.nome, " - Total consumido: ").concat(item.total));
        });
    };
    return ListagemTop10Consumidores;
}(listagem_1.default));
exports.ListagemTop10Consumidores = ListagemTop10Consumidores;
var ListagemClientesGenero = /** @class */ (function (_super) {
    __extends(ListagemClientesGenero, _super);
    function ListagemClientesGenero() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListagemClientesGenero.prototype.listar = function () {
        var clientes = (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json'));
        var generos = { F: [], M: [] };
        clientes.forEach(function (cliente) {
            if (cliente.genero === 'F') {
                generos.F.push(cliente);
            }
            else if (cliente.genero === 'M') {
                generos.M.push(cliente);
            }
        });
        console.log("\nClientes do gênero Feminino:");
        generos.F.forEach(function (c) { return console.log("- ".concat(c.nome)); });
        console.log("\nClientes do gênero Masculino:");
        generos.M.forEach(function (c) { return console.log("- ".concat(c.nome)); });
    };
    return ListagemClientesGenero;
}(listagem_1.default));
exports.ListagemClientesGenero = ListagemClientesGenero;
var ListagemMaisConsumidos = /** @class */ (function (_super) {
    __extends(ListagemMaisConsumidos, _super);
    function ListagemMaisConsumidos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListagemMaisConsumidos.prototype.listar = function () {
        var clientes = (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json'));
        var consumo = {};
        clientes.forEach(function (cliente) {
            cliente.getProdutosConsumidos.forEach(function (Produto) {
                if (!consumo[Produto.nome])
                    consumo[Produto.nome] = { tipo: "Produto", quantidade: 0 };
                consumo[Produto.nome].quantidade++;
            });
            cliente.getServicosConsumidos.forEach(function (servico) {
                if (!consumo[servico.nome])
                    consumo[servico.nome] = { tipo: "Serviço", quantidade: 0 };
                consumo[servico.nome].quantidade++;
            });
        });
        var ranking = Object.entries(consumo).sort(function (a, b) { return b[1].quantidade - a[1].quantidade; });
        console.log("\nProdutos e serviços mais consumidos (geral):\n");
        ranking.forEach(function (_a, idx) {
            var nome = _a[0], info = _a[1];
            console.log("".concat(idx + 1, ". ").concat(nome, " (").concat(info.tipo, ") - ").concat(info.quantidade, " vezes"));
        });
    };
    return ListagemMaisConsumidos;
}(listagem_1.default));
exports.ListagemMaisConsumidos = ListagemMaisConsumidos;
var ListagemMaisConsumidosPorGenero = /** @class */ (function (_super) {
    __extends(ListagemMaisConsumidosPorGenero, _super);
    function ListagemMaisConsumidosPorGenero() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListagemMaisConsumidosPorGenero.prototype.listar = function () {
        var clientes = (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json'));
        var generos = ['F', 'M'];
        generos.forEach(function (genero) {
            var consumo = {};
            clientes.filter(function (c) { return c.genero === genero; }).forEach(function (cliente) {
                cliente.getProdutosConsumidos.forEach(function (produto) {
                    if (!consumo[produto.nome])
                        consumo[produto.nome] = { tipo: "Produto", quantidade: 0 };
                    consumo[produto.nome].quantidade++;
                });
                cliente.getServicosConsumidos.forEach(function (servico) {
                    if (!consumo[servico.nome])
                        consumo[servico.nome] = { tipo: "Serviço", quantidade: 0 };
                    consumo[servico.nome].quantidade++;
                });
            });
            var ranking = Object.entries(consumo).sort(function (a, b) { return b[1].quantidade - a[1].quantidade; });
            console.log("\nMais consumidos pelo g\u00EAnero ".concat(genero === 'F' ? 'Feminino' : 'Masculino', ":"));
            ranking.forEach(function (_a, index) {
                var nome = _a[0], info = _a[1];
                console.log("".concat(index + 1, ". ").concat(nome, " (").concat(info.tipo, ") - ").concat(info.quantidade, " vezes"));
            });
        });
    };
    return ListagemMaisConsumidosPorGenero;
}(listagem_1.default));
exports.ListagemMaisConsumidosPorGenero = ListagemMaisConsumidosPorGenero;
var ListagemTop10MenosConsumidores = /** @class */ (function (_super) {
    __extends(ListagemTop10MenosConsumidores, _super);
    function ListagemTop10MenosConsumidores() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListagemTop10MenosConsumidores.prototype.listar = function () {
        var clientes = (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json'));
        var ranking = clientes.map(function (cliente) { return ({
            cliente: cliente,
            total: (cliente.getProdutosConsumidos.length || 0) + (cliente.getServicosConsumidos.length || 0)
        }); }).sort(function (a, b) { return a.total - b.total; }).slice(0, 10);
        console.log("\nTop 10 clientes que menos consumiram (quantidade):\n");
        ranking.forEach(function (item, index) {
            console.log("".concat(index + 1, ". ").concat(item.cliente.nome, " - Total consumido: ").concat(item.total));
        });
    };
    return ListagemTop10MenosConsumidores;
}(listagem_1.default));
exports.ListagemTop10MenosConsumidores = ListagemTop10MenosConsumidores;
var ListagemTop5MaiorValor = /** @class */ (function (_super) {
    __extends(ListagemTop5MaiorValor, _super);
    function ListagemTop5MaiorValor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListagemTop5MaiorValor.prototype.listar = function () {
        var clientes = (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json'));
        var ranking = clientes.map(function (cliente) {
            var valorProdutos = cliente.getProdutosConsumidos.reduce(function (soma, p) { return soma + (p.valor || 0); }, 0);
            var valorServicos = cliente.getServicosConsumidos.reduce(function (soma, s) { return soma + (s.valor || 0); }, 0);
            return {
                cliente: cliente,
                valorTotal: valorProdutos + valorServicos
            };
        }).sort(function (a, b) { return b.valorTotal - a.valorTotal; }).slice(0, 5);
        console.log("\nTop 5 clientes que mais consumiram em valor:\n");
        ranking.forEach(function (item, index) {
            console.log("".concat(index + 1, ". ").concat(item.cliente.nome, " - Valor total: R$ ").concat(item.valorTotal.toFixed(2)));
        });
    };
    return ListagemTop5MaiorValor;
}(listagem_1.default));
exports.ListagemTop5MaiorValor = ListagemTop5MaiorValor;
