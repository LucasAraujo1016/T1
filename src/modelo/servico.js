"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Servico = /** @class */ (function () {
    function Servico(nome, valor) {
        this.nome = nome;
        this.valor = Number(Number(valor).toFixed(2));
    }
    Object.defineProperty(Servico.prototype, "getNome", {
        get: function () {
            return this.nome;
        },
        enumerable: false,
        configurable: true
    });
    return Servico;
}());
exports.default = Servico;
