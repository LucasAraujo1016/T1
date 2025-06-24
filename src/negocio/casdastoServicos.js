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
var entrada_1 = require("../io/entrada");
var cadastro_1 = require("./cadastro");
var servico_1 = require("../modelo/servico");
var registros_1 = require("../utils/registros");
var CadastroServico = /** @class */ (function (_super) {
    __extends(CadastroServico, _super);
    function CadastroServico(servicos) {
        var _this = _super.call(this) || this;
        _this.servicos = servicos;
        _this.entrada = new entrada_1.default();
        return _this;
    }
    CadastroServico.prototype.cadastrar = function () {
        var _a;
        console.log("\nIn\u00EDcio do cadastro de servi\u00E7o");
        var nome = this.entrada.receberTexto("Informe o nome do servi\u00E7o: ");
        this.servicos.length = 0;
        (_a = this.servicos).push.apply(_a, (0, registros_1.reconstruirServicos)((0, registros_1.carregarDados)('servicos.json')));
        var servicoExistente = this.servicos.some(function (s) { return s.getNome === nome; });
        if (servicoExistente) {
            console.log("\nJ\u00E1 existe um servi\u00E7o cadastrado com o nome \"".concat(nome, "\". Cadastro cancelado."));
            return;
        }
        var valor = this.entrada.receberNumero("Informe o valor do servi\u00E7o: ");
        valor = Number(Number(valor).toFixed(2));
        var servico = new servico_1.default(nome, valor);
        this.servicos.push(servico);
        (0, registros_1.salvarDados)('servicos.json', this.servicos);
        console.log("\nServi\u00E7o cadastrado com sucesso");
    };
    return CadastroServico;
}(cadastro_1.default));
exports.default = CadastroServico;
