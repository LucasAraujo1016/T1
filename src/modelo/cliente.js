"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente = /** @class */ (function () {
    function Cliente(nome, nomeSocial, genero, cpf) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.genero = genero;
        this.cpf = cpf;
        this.rgs = [];
        this.dataCadastro = new Date();
        this.telefones = [];
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
    }
    Cliente.prototype.getProdutos = function () {
        throw new Error("Method not implemented.");
    };
    Object.defineProperty(Cliente.prototype, "getCpf", {
        get: function () {
            return this.cpf;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "getRgs", {
        get: function () {
            return this.rgs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "getDataCadastro", {
        get: function () {
            return this.dataCadastro;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "getTelefones", {
        get: function () {
            return this.telefones;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "getProdutosConsumidos", {
        get: function () {
            return this.produtosConsumidos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "getServicosConsumidos", {
        get: function () {
            return this.servicosConsumidos;
        },
        enumerable: false,
        configurable: true
    });
    Cliente.prototype.adicionarRg = function (rg) {
        this.rgs.push(rg);
    };
    Cliente.prototype.removerRg = function (valor) {
        this.rgs = this.rgs.filter(function (rg) { return rg.getValor !== valor; });
    };
    Cliente.prototype.adicionarTelefone = function (telefone) {
        this.telefones.push(telefone);
    };
    Cliente.prototype.removerTelefone = function (ddd, numero) {
        this.telefones = this.telefones.filter(function (telefone) { return !(telefone.getDdd === ddd && telefone.getNumero === numero); });
    };
    Cliente.prototype.adicionarProduto = function (produto) {
        this.produtosConsumidos.push(produto);
    };
    Cliente.prototype.removerProduto = function (nome) {
        this.produtosConsumidos = this.produtosConsumidos.filter(function (produto) { return produto.nome !== nome; });
    };
    Cliente.prototype.adicionarServico = function (servico) {
        this.servicosConsumidos.push(servico);
    };
    Cliente.prototype.removerServico = function (nome) {
        this.servicosConsumidos = this.servicosConsumidos.filter(function (servico) { return servico.nome !== nome; });
    };
    return Cliente;
}());
exports.default = Cliente;
