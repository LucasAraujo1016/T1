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
var ListagemProdutos = /** @class */ (function (_super) {
    __extends(ListagemProdutos, _super);
    function ListagemProdutos(produtos) {
        var _this = _super.call(this) || this;
        _this.produtos = produtos;
        return _this;
    }
    ListagemProdutos.prototype.listar = function () {
        this.produtos = (0, registros_1.carregarDados)('produtos.json');
        console.log("\nLista de produtos: \n");
        this.produtos.forEach(function (produto) {
            console.log("Nome: ".concat(produto.nome));
            console.log("Valor: R$".concat(produto.valor.toFixed(2)));
            console.log("--------------------------------------");
        });
    };
    return ListagemProdutos;
}(listagem_1.default));
exports.default = ListagemProdutos;
