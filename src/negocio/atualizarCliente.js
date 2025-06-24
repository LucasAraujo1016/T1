"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = require("../io/entrada");
var cpf_1 = require("../modelo/cpf");
var rg_1 = require("../modelo/rg");
var telefone_1 = require("../modelo/telefone");
var registros_1 = require("../utils/registros");
var AtualizarCliente = /** @class */ (function () {
    function AtualizarCliente(clientes, produtos, servicos) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    AtualizarCliente.prototype.atualizar = function () {
        var _a, _b, _c;
        this.clientes.length = 0;
        (_a = this.clientes).push.apply(_a, (0, registros_1.reconstruirClientes)((0, registros_1.carregarDados)('clientes.json')));
        this.produtos.length = 0;
        (_b = this.produtos).push.apply(_b, (0, registros_1.reconstruirProdutos)((0, registros_1.carregarDados)('produtos.json')));
        this.servicos.length = 0;
        (_c = this.servicos).push.apply(_c, (0, registros_1.reconstruirServicos)((0, registros_1.carregarDados)('servicos.json')));
        console.log("\nIn\u00EDcio da atualiza\u00E7\u00E3o do cliente");
        var cpfValor = this.entrada.receberTexto("Por favor informe o n\u00FAmero do cpf: ");
        var cliente = this.clientes.find(function (c) { return c.getCpf.getValor === cpfValor; });
        if (!cliente) {
            console.log("\nCliente com CPF ".concat(cpfValor, " n\u00E3o encontrado.\n"));
            return;
        }
        var execucao = true;
        var _loop_1 = function () {
            console.log("\nO que deseja atualizar?");
            console.log("1 - Nome");
            console.log("2 - Nome Social");
            console.log("3 - G\u00EAnero");
            console.log("4 - CPF");
            console.log("5 - RGs");
            console.log("6 - Telefones");
            console.log("7 - Produtos Consumidos");
            console.log("8 - Servi\u00E7os Consumidos");
            console.log("0 - Sair");
            var opcao = this_1.entrada.receberNumero("Escolha uma op\u00E7\u00E3o: ");
            switch (opcao) {
                case 1:
                    var nome = this_1.entrada.receberTexto("Por favor informe o novo nome do cliente: ");
                    cliente.nome = nome;
                    console.log("Nome atualizado com sucesso!");
                    break;
                case 2:
                    var nomeSocial = this_1.entrada.receberTexto("Por favor informe o novo nome social do cliente: ");
                    cliente.nomeSocial = nomeSocial;
                    console.log("Nome social atualizado com sucesso!");
                    break;
                case 3:
                    var genero = this_1.entrada.receberTexto("Por favor informe o novo g\u00EAnero do cliente: ");
                    while (genero !== 'M' && genero !== 'F') {
                        genero = this_1.entrada.receberTexto("Por favor informe um g\u00EAnero valido para o sistema (M/F): ").toLocaleUpperCase();
                    }
                    cliente.genero = genero;
                    console.log("G\u00EAnero atualizado com sucesso!");
                    break;
                case 4:
                    var valor_1 = this_1.entrada.receberTexto("Por favor informe o novo cpf: ");
                    var cpfExistente = this_1.clientes.some(function (c) { return c.getCpf.getValor === valor_1; });
                    if (cpfExistente) {
                        console.log("\nJ\u00E1 existe um cliente cadastrado com o CPF ".concat(valor_1, ". Atualiza\u00E7\u00E3o cancelada.\n"));
                        break;
                    }
                    var data = this_1.entrada.receberTexto("Por favor informe a nova data de emiss\u00E3o do cpf, no padr\u00E3o dd/mm/yyyy: ");
                    var partesData = data.split('/');
                    var ano = Number(partesData[2]);
                    var mes = Number(partesData[1]) - 1;
                    var dia = Number(partesData[0]);
                    var dataEmissao = new Date(ano, mes, dia);
                    var novoCpf = new cpf_1.default(valor_1, dataEmissao);
                    cliente.cpf = novoCpf;
                    console.log("CPF atualizado com sucesso!");
                    break;
                case 5:
                    var alterarRgs = this_1.entrada.receberTexto("Deseja alterar os RGs associados ao cliente? (S/N): ").toUpperCase();
                    if (alterarRgs === 'S') {
                        var rgsAtuais = cliente.getRgs;
                        if (rgsAtuais.length > 0) {
                            console.log("\nRGs atualmente associados:");
                            rgsAtuais.forEach(function (rg, index) {
                                console.log("".concat(index + 1, " - ").concat(rg.getValor));
                            });
                            var remover = this_1.entrada.receberTexto("Deseja remover algum RG? (S/N): ").toUpperCase();
                            while (remover === 'S') {
                                var rgRemover = this_1.entrada.receberTexto("Informe o n\u00FAmero do RG a ser removido: ");
                                cliente.removerRg(rgRemover);
                                console.log("RG \"".concat(rgRemover, "\" removido com sucesso!"));
                                remover = this_1.entrada.receberTexto("Deseja remover outro RG? (S/N): ").toUpperCase();
                            }
                        }
                        var associar = this_1.entrada.receberTexto("Deseja associar novos RGs ao cliente? (S/N): ").toUpperCase();
                        while (associar === 'S') {
                            var numero = this_1.entrada.receberTexto("Informe o n\u00FAmero do novo RG: ");
                            var data_1 = this_1.entrada.receberTexto("Informe a data de emiss\u00E3o (dd/mm/yyyy): ");
                            var _d = data_1.split('/').map(function (num) { return Number(num); }), dia_1 = _d[0], mes_1 = _d[1], ano_1 = _d[2];
                            var dataEmissao_1 = new Date(ano_1, mes_1 - 1, dia_1);
                            var novoRg = new rg_1.default(numero, dataEmissao_1);
                            cliente.adicionarRg(novoRg);
                            console.log("RG \"".concat(numero, "\" associado com sucesso!"));
                            associar = this_1.entrada.receberTexto("Deseja associar outro RG? (S/N): ").toUpperCase();
                        }
                    }
                    break;
                case 6:
                    var alterarTelefones = this_1.entrada.receberTexto("Deseja alterar os telefones associados ao cliente? (S/N): ").toUpperCase();
                    if (alterarTelefones === 'S') {
                        var telefonesAtuais = cliente.getTelefones;
                        if (telefonesAtuais.length > 0) {
                            console.log("\nTelefones atualmente associados:");
                            telefonesAtuais.forEach(function (telefone, index) {
                                console.log("".concat(index + 1, " - (").concat(telefone.getDdd, ") ").concat(telefone.getNumero));
                            });
                            var remover = this_1.entrada.receberTexto("Deseja remover algum telefone? (S/N): ").toUpperCase();
                            while (remover === 'S') {
                                var ddd = this_1.entrada.receberTexto("Informe o DDD do telefone a ser removido: ");
                                var numero = this_1.entrada.receberTexto("Informe o n\u00FAmero do telefone a ser removido: ");
                                cliente.removerTelefone(ddd, numero);
                                console.log("Telefone (".concat(ddd, ") ").concat(numero, " removido com sucesso!"));
                                remover = this_1.entrada.receberTexto("Deseja remover outro telefone? (S/N): ").toUpperCase();
                            }
                        }
                        var associar = this_1.entrada.receberTexto("Deseja associar novos telefones ao cliente? (S/N): ").toUpperCase();
                        while (associar === 'S') {
                            var ddd = this_1.entrada.receberTexto("Informe o DDD do novo telefone: ");
                            var numero = this_1.entrada.receberTexto("Informe o n\u00FAmero do novo telefone: ");
                            var novoTelefone = new telefone_1.default(ddd, numero);
                            cliente.adicionarTelefone(novoTelefone);
                            console.log("Telefone (".concat(ddd, ") ").concat(numero, " associado com sucesso!"));
                            associar = this_1.entrada.receberTexto("Deseja associar outro telefone? (S/N): ").toUpperCase();
                        }
                    }
                    break;
                case 7:
                    var alterarProdutos = this_1.entrada.receberTexto("Deseja alterar os produtos associados ao cliente? (S/N): ").toUpperCase();
                    if (alterarProdutos === 'S') {
                        var produtosAtuais = cliente.getProdutosConsumidos;
                        if (produtosAtuais && produtosAtuais.length > 0) {
                            console.log("\nProdutos atualmente associados:");
                            produtosAtuais.forEach(function (produto, index) {
                                console.log("".concat(index + 1, " - ").concat(produto.nome));
                            });
                            var remover = this_1.entrada.receberTexto("Deseja remover algum produto? (S/N): ").toUpperCase();
                            var _loop_2 = function () {
                                var nomeRemover = this_1.entrada.receberTexto("Informe o nome do produto a ser removido: ").toLowerCase();
                                var produto = produtosAtuais.find(function (p) { return p.nome.toLowerCase() === nomeRemover; });
                                if (produto) {
                                    cliente.removerProduto(nomeRemover);
                                    console.log("Produto \"".concat(nomeRemover, "\" removido com sucesso!"));
                                }
                                else {
                                    console.log("Produto \"".concat(nomeRemover, "\" n\u00E3o associado a esse cliente."));
                                }
                                remover = this_1.entrada.receberTexto("Deseja remover outro produto? (S/N): ").toUpperCase();
                            };
                            while (remover === 'S') {
                                _loop_2();
                            }
                        }
                        var associarProduto = this_1.entrada.receberTexto("Deseja associar novos produtos ao cliente? (S/N): ").toUpperCase();
                        var _loop_3 = function () {
                            if (this_1.produtos.length > 0) {
                                console.log("\nProdutos dispon\u00EDveis:");
                                this_1.produtos.forEach(function (produto, index) {
                                    console.log("".concat(index + 1, " - ").concat(produto.nome));
                                });
                                var nomeAssociar_1 = this_1.entrada.receberTexto("Informe o nome do produto que deseja associar: ").toLowerCase();
                                var produto = this_1.produtos.find(function (p) { return p.nome.toLowerCase() === nomeAssociar_1; });
                                var jaAssociado = cliente.getProdutosConsumidos.some(function (p) { return p.nome === nomeAssociar_1; });
                                if (!produto) {
                                    console.log("Produto \"".concat(nomeAssociar_1, "\" n\u00E3o est\u00E1 dispon\u00EDvel."));
                                }
                                else if (jaAssociado) {
                                    console.log("Produto \"".concat(nomeAssociar_1, "\" j\u00E1 est\u00E1 associado a este cliente."));
                                }
                                else {
                                    cliente.adicionarProduto(produto);
                                    console.log("Produto \"".concat(nomeAssociar_1, "\" associado com sucesso!"));
                                }
                                associarProduto = this_1.entrada.receberTexto("Deseja associar outro produto? (S/N): ").toUpperCase();
                            }
                        };
                        while (associarProduto === 'S') {
                            _loop_3();
                        }
                    }
                    break;
                case 8:
                    var alterarServicos = this_1.entrada.receberTexto("Deseja alterar os servi\u00E7os associados ao cliente? (S/N): ").toUpperCase();
                    if (alterarServicos === 'S') {
                        var servicosAtuais = cliente.getServicosConsumidos;
                        if (servicosAtuais && servicosAtuais.length > 0) {
                            console.log("\nServi\u00E7os atualmente associados:");
                            servicosAtuais.forEach(function (servico, index) {
                                console.log("".concat(index + 1, " - ").concat(servico.nome));
                            });
                            var remover = this_1.entrada.receberTexto("Deseja remover algum servi\u00E7o? (S/N): ").toUpperCase();
                            var _loop_4 = function () {
                                var nomeRemover = this_1.entrada.receberTexto("Informe o nome do servi\u00E7o a ser removido: ").toLowerCase();
                                var servico = servicosAtuais.find(function (s) { return s.nome.toLowerCase() === nomeRemover; });
                                if (servico) {
                                    cliente.removerServico(nomeRemover);
                                    console.log("Servi\u00E7o \"".concat(nomeRemover, "\" removido com sucesso!"));
                                }
                                else {
                                    console.log("Servi\u00E7o \"".concat(nomeRemover, "\" n\u00E3o associado a esse cliente."));
                                }
                                remover = this_1.entrada.receberTexto("Deseja remover outro servi\u00E7o? (S/N): ").toUpperCase();
                            };
                            while (remover === 'S') {
                                _loop_4();
                            }
                        }
                        var associarServico = this_1.entrada.receberTexto("Deseja associar novos servi\u00E7os ao cliente? (S/N): ").toUpperCase();
                        var _loop_5 = function () {
                            if (this_1.servicos.length > 0) {
                                console.log("\nServi\u00E7os dispon\u00EDveis:");
                                this_1.servicos.forEach(function (servico, index) {
                                    console.log("".concat(index + 1, " - ").concat(servico.nome));
                                });
                                var nomeAssociar_2 = this_1.entrada.receberTexto("Informe o nome do servi\u00E7o que deseja associar: ").toLowerCase();
                                var servico = this_1.servicos.find(function (s) { return s.nome.toLowerCase() === nomeAssociar_2; });
                                var jaAssociado = cliente.getServicosConsumidos.some(function (s) { return s.nome === nomeAssociar_2; });
                                if (!servico) {
                                    console.log("Servi\u00E7o \"".concat(nomeAssociar_2, "\" n\u00E3o est\u00E1 dispon\u00EDvel."));
                                }
                                else if (jaAssociado) {
                                    console.log("Servi\u00E7o \"".concat(nomeAssociar_2, "\" j\u00E1 est\u00E1 associado a este cliente."));
                                }
                                else {
                                    cliente.adicionarServico(servico);
                                    console.log("Servi\u00E7o \"".concat(nomeAssociar_2, "\" associado com sucesso!"));
                                }
                                associarServico = this_1.entrada.receberTexto("Deseja associar outro servi\u00E7o? (S/N): ").toUpperCase();
                            }
                        };
                        while (associarServico === 'S') {
                            _loop_5();
                        }
                    }
                    break;
                case 0:
                    execucao = false;
                    break;
                default:
                    console.log("Op\u00E7\u00E3o n\u00E3o entendida :(");
            }
            (0, registros_1.salvarDados)('clientes.json', this_1.clientes);
        };
        var this_1 = this;
        while (execucao) {
            _loop_1();
        }
        console.log("\nAtualiza\u00E7\u00E3o conclu\u00EDda :)\n");
    };
    return AtualizarCliente;
}());
exports.default = AtualizarCliente;
