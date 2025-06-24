"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = require("../io/entrada");
var registros_1 = require("../utils/registros");
var DeletarProduto = /** @class */ (function () {
    function DeletarProduto(produtos) {
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    DeletarProduto.prototype.deletar = function () {
        console.log("\nInicio do processo de exclus\u00E3o de produto");
        this.produtos = (0, registros_1.reconstruirProdutos)((0, registros_1.carregarDados)('produtos.json'));
        var nome = this.entrada.receberTexto("Informe o nome do produto a ser exclu\u00EDdo: ");
        var produto = this.produtos.findIndex(function (p) { return p.nome === nome; });
        if (produto !== -1) {
            var confirmacao = this.entrada.receberTexto("Confirma a exclus\u00E3o do produto ".concat(nome, "? (S/N): "));
            if (confirmacao.toUpperCase() === 'S') {
                this.produtos.splice(produto, 1);
                (0, registros_1.salvarDados)('produtos.json', this.produtos);
                console.log("\nProduto ".concat(nome, " foi exclu\u00EDdo com sucesso.\n"));
            }
            else {
                console.log('\n Exclusão cancelada\n');
            }
        }
        else {
            console.log('\nProduto não encontrado.\n');
        }
    };
    return DeletarProduto;
}());
exports.default = DeletarProduto;
