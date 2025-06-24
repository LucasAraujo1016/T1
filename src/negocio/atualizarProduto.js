"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = require("../io/entrada");
var registros_1 = require("../utils/registros");
var AtualizarProduto = /** @class */ (function () {
    function AtualizarProduto(produtos) {
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    AtualizarProduto.prototype.atualizar = function () {
        var _a;
        console.log("\nInicio da atualiza\u00E7\u00E3o do produto");
        this.produtos.length = 0;
        (_a = this.produtos).push.apply(_a, (0, registros_1.reconstruirProdutos)((0, registros_1.carregarDados)('produtos.json')));
        var nome = this.entrada.receberTexto("Informe o nome do produto a ser atualizado: ");
        var produto = this.produtos.find(function (p) { return p.getNome === nome; });
        if (produto) {
            var novoNome = this.entrada.receberTexto("Informe o novo nome do produto: ");
            var produtoExistente = this.produtos.some(function (p) { return p.getNome === nome; });
            if (produtoExistente) {
                console.log("\nJ\u00E1 existe um produto cadastrado com o nome \"".concat(novoNome, "\". atualiza\u00E7\u00E3o cancelada."));
                return;
            }
            else {
                produto.nome = novoNome;
            }
            var novoValor = this.entrada.receberNumero("Informe o novo valor do produto: ");
            produto.valor = Number(Number(novoValor).toFixed(2));
            (0, registros_1.salvarDados)('produtos.json', this.produtos);
            console.log("\nProduto atualizado com sucesso!");
        }
        else {
            console.log("\nProduto n\u00E3o encontrado");
        }
    };
    return AtualizarProduto;
}());
exports.default = AtualizarProduto;
