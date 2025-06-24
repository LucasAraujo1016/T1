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
var produto_1 = require("../modelo/produto");
var registros_1 = require("../utils/registros");
var cadastro_1 = require("./cadastro");
var CadastroProduto = /** @class */ (function (_super) {
    __extends(CadastroProduto, _super);
    function CadastroProduto(produtos) {
        var _this = _super.call(this) || this;
        _this.produtos = produtos;
        _this.entrada = new entrada_1.default();
        return _this;
    }
    CadastroProduto.prototype.cadastrar = function () {
        var _a;
        console.log("\nIn\u00EDcio do cadastro de produto");
        var nome = this.entrada.receberTexto("Informe o nome do produto: ");
        this.produtos.length = 0;
        (_a = this.produtos).push.apply(_a, (0, registros_1.reconstruirProdutos)((0, registros_1.carregarDados)('produtos.json')));
        var produtoExistente = this.produtos.some(function (p) { return p.getNome === nome; });
        if (produtoExistente) {
            console.log("\nJ\u00E1 existe um produto cadastrado com o nome \"".concat(nome, "\". Cadastro cancelado."));
            return;
        }
        var valor = this.entrada.receberNumero("Informe o valor do produto: ");
        valor = Number(Number(valor).toFixed(2));
        var produto = new produto_1.default(nome, valor);
        this.produtos.push(produto);
        (0, registros_1.salvarDados)('produtos.json', this.produtos);
        console.log("\nProduto cadastrado com sucesso\n");
    };
    return CadastroProduto;
}(cadastro_1.default));
exports.default = CadastroProduto;
