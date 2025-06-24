"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Empresa = /** @class */ (function () {
    function Empresa(clientes, produtos, servicos) {
        if (clientes === void 0) { clientes = []; }
        if (produtos === void 0) { produtos = []; }
        if (servicos === void 0) { servicos = []; }
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
    }
    Object.defineProperty(Empresa.prototype, "getClientes", {
        get: function () {
            return this.clientes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Empresa.prototype, "getProdutos", {
        get: function () {
            return this.produtos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Empresa.prototype, "getServicos", {
        get: function () {
            return this.servicos;
        },
        enumerable: false,
        configurable: true
    });
    return Empresa;
}());
exports.default = Empresa;
