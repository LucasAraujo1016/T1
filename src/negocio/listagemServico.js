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
var listagemServicos = /** @class */ (function (_super) {
    __extends(listagemServicos, _super);
    function listagemServicos(servicos) {
        var _this = _super.call(this) || this;
        _this.servicos = servicos;
        return _this;
    }
    listagemServicos.prototype.listar = function () {
        this.servicos = (0, registros_1.carregarDados)('servicos.json');
        console.log("\nLista de servi\u00E7os: \n");
        this.servicos.forEach(function (servico) {
            console.log("Nome: ".concat(servico.nome));
            console.log("Valor: R$".concat(servico.valor.toFixed(2)));
            console.log("--------------------------------------");
        });
    };
    return listagemServicos;
}(listagem_1.default));
exports.default = listagemServicos;
