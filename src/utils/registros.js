"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salvarDados = salvarDados;
exports.carregarDados = carregarDados;
exports.reconstruirClientes = reconstruirClientes;
exports.reconstruirProdutos = reconstruirProdutos;
exports.reconstruirServicos = reconstruirServicos;
var fs = require("fs");
var path = require("path");
var cliente_1 = require("../modelo/cliente");
var cpf_1 = require("../modelo/cpf");
var rg_1 = require("../modelo/rg");
var telefone_1 = require("../modelo/telefone");
var produto_1 = require("../modelo/produto");
var servico_1 = require("../modelo/servico");
function getCaminhoAbsoluto(nomeArquivo) {
    return path.resolve(__dirname, '../../data', nomeArquivo);
}
function salvarDados(caminho, dados) {
    var caminhoAbsoluto = getCaminhoAbsoluto(caminho);
    fs.mkdirSync(path.dirname(caminhoAbsoluto), { recursive: true });
    fs.writeFileSync(caminhoAbsoluto, JSON.stringify(dados, null, 2), 'utf-8');
}
function carregarDados(caminho) {
    var caminhoAbsoluto = getCaminhoAbsoluto(caminho);
    if (!fs.existsSync(caminhoAbsoluto))
        return [];
    var conteudo = fs.readFileSync(caminhoAbsoluto, 'utf-8');
    return JSON.parse(conteudo);
}
function reconstruirClientes(dados) {
    return dados.map(function (obj) {
        var cpf = new cpf_1.default(obj.cpf.valor, new Date(obj.cpf.dataEmissao));
        var cliente = new cliente_1.default(obj.nome, obj.nomeSocial, obj.genero, cpf);
        if (obj.rgs) {
            obj.rgs.forEach(function (rg) {
                cliente.adicionarRg(new rg_1.default(rg.valor, new Date(rg.dataEmissao)));
            });
        }
        if (obj.telefones) {
            obj.telefones.forEach(function (telefone) {
                cliente.adicionarTelefone(new telefone_1.default(telefone.ddd, telefone.numero));
            });
        }
        if (obj.produtosConsumidos) {
            obj.produtosConsumidos.forEach(function (produto) {
                cliente.adicionarProduto(new produto_1.default(produto.nome, produto.valor));
            });
        }
        if (obj.servicosConsumidos) {
            obj.servicosConsumidos.forEach(function (servico) {
                cliente.adicionarServico(new servico_1.default(servico.nome, servico.valor));
            });
        }
        return cliente;
    });
}
function reconstruirProdutos(dados) {
    return dados.map(function (obj) { return new produto_1.default(obj.nome, Number(Number(obj.valor).toFixed(2))); });
}
function reconstruirServicos(dados) {
    return dados.map(function (obj) { return new servico_1.default(obj.nome, Number(Number(obj.valor).toFixed(2))); });
}
