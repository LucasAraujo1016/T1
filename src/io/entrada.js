"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promptSync = require("prompt-sync");
var Entrada = /** @class */ (function () {
    function Entrada() {
    }
    Entrada.prototype.receberNumero = function (mensagem) {
        var prompt = promptSync();
        var valor = prompt(mensagem);
        var numero = new Number(valor);
        return numero.valueOf();
    };
    Entrada.prototype.receberTexto = function (mensagem) {
        var prompt = promptSync();
        var texto = prompt(mensagem);
        return texto;
    };
    return Entrada;
}());
exports.default = Entrada;
