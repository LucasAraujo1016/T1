"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = require("../io/entrada");
var registros_1 = require("../utils/registros");
var deletarServico = /** @class */ (function () {
    function deletarServico(servicos) {
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    deletarServico.prototype.deletar = function () {
        console.log("\nInicio do processo de exclus\u00E3o de servi\u00E7o");
        this.servicos = (0, registros_1.reconstruirServicos)((0, registros_1.carregarDados)('servicos.json'));
        var nome = this.entrada.receberTexto("Informe o nome do servi\u00E7o a ser exclu\u00EDdo: ");
        var servico = this.servicos.findIndex(function (s) { return s.nome === nome; });
        if (servico !== -1) {
            var confirmacao = this.entrada.receberTexto("Confirma a exclus\u00E3o do servi\u00E7o ".concat(nome, "? (S/N): "));
            if (confirmacao.toUpperCase() === 'S') {
                this.servicos.splice(servico, 1);
                (0, registros_1.salvarDados)('servicos.json', this.servicos);
                console.log("\nServi\u00E7o ".concat(nome, " foi exclu\u00EDdo com sucesso.\n"));
            }
            else {
                console.log('\n Exclusão cancelada\n');
            }
        }
        else {
            console.log('\nServiço não encontrado.\n');
        }
    };
    return deletarServico;
}());
exports.default = deletarServico;
