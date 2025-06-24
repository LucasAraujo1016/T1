"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_js_1 = require("../io/entrada.js");
var registros_js_1 = require("../utils/registros.js");
var DeletarCliente = /** @class */ (function () {
    function DeletarCliente(clientes) {
        this.clientes = clientes;
        this.entrada = new entrada_js_1.default();
    }
    DeletarCliente.prototype.deletar = function () {
        console.log('\nInicio do processo de exclusão de cliente');
        this.clientes = (0, registros_js_1.reconstruirClientes)((0, registros_js_1.carregarDados)('clientes.json'));
        var cpfValor = this.entrada.receberTexto('Informe o CPF do cliente a ser excluído: ');
        var cliente = this.clientes.findIndex(function (c) { return c.getCpf.getValor === cpfValor; });
        if (cliente !== -1) {
            var confirmacao = this.entrada.receberTexto("Confirma a exclus\u00E3o do cliente com CPF ".concat(cpfValor, "? (S/N): "));
            if (confirmacao.toUpperCase() === 'S') {
                this.clientes.splice(cliente, 1);
                (0, registros_js_1.salvarDados)('clientes.json', this.clientes);
                console.log("\nCliente com CPF ".concat(cpfValor, " foi exclu\u00EDdo com sucesso."));
            }
            else {
                console.log('\n Exclusão cancelada');
            }
        }
        else {
            console.log('\nCliente não encontrado.');
        }
    };
    return DeletarCliente;
}());
exports.default = DeletarCliente;
