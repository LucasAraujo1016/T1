"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Produto = /** @class */ (function () {
    function Produto(nome, valor) {
        this.nome = nome;
        this.valor = Number(Number(valor).toFixed(2));
    }
    Object.defineProperty(Produto.prototype, "getNome", {
        get: function () {
            return this.nome;
        },
        enumerable: false,
        configurable: true
    });
    return Produto;
}());
exports.default = Produto;
