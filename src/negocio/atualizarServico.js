"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = require("../io/entrada");
var registros_1 = require("../utils/registros");
var atualizarServico = /** @class */ (function () {
    function atualizarServico(servicos) {
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    atualizarServico.prototype.atualizar = function () {
        var _a;
        console.log("\nInicio da atualiza\u00E7\u00E3o de servi\u00E7os");
        this.servicos.length = 0;
        (_a = this.servicos).push.apply(_a, (0, registros_1.reconstruirServicos)((0, registros_1.carregarDados)('servicos.json')));
        var nome = this.entrada.receberTexto("Informe o nome do servi\u00E7o a ser atualizado: ");
        var servico = this.servicos.find(function (s) { return s.getNome === nome; });
        if (servico) {
            var novoNome = this.entrada.receberTexto("Digite o novo nome do servi\u00E7o: ");
            var servicoExistente = this.servicos.some(function (s) { return s.getNome === nome; });
            if (servicoExistente) {
                console.log("\nJ\u00E1 existe um servi\u00E7o cadastrado com o nome \"".concat(novoNome, "\". atualiza\u00E7\u00E3o cancelada."));
                return;
            }
            else {
                servico.nome = novoNome;
            }
            var novoValor = this.entrada.receberNumero("Digite o novo valor do servi\u00E7o: ");
            servico.valor = Number(Number(novoValor).toFixed(2));
            (0, registros_1.salvarDados)('servicos.json', this.servicos);
            console.log("\nServi\u00E7o atualizado com sucesso!");
        }
        else {
            console.log("\nServi\u00E7o n\u00E3o encontrado");
        }
    };
    return atualizarServico;
}());
exports.default = atualizarServico;
