import Cliente from "../modelo/cliente";
import Entrada from "../io/entrada";
import CPF from "../modelo/cpf";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import { carregarDados, reconstruirClientes, reconstruirProdutos, reconstruirServicos, salvarDados } from "../utils/registros";

export default class AtualizarCliente {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private entrada: Entrada;
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>){
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        this.clientes.length = 0;
        this.clientes.push(...reconstruirClientes(carregarDados('clientes.json')));
        this.produtos.length = 0;
        this.produtos.push(...reconstruirProdutos(carregarDados('produtos.json')));
        this.servicos.length = 0;
        this.servicos.push(...reconstruirServicos(carregarDados('servicos.json')));

        console.log(`\nInício da atualização do cliente`);
        let cpfValor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let cliente = this.clientes.find(c => c.getCpf.getValor === cpfValor);
        if (!cliente) {
            console.log(`\nCliente com CPF ${cpfValor} não encontrado.\n`);
            return;
        }

        let execucao = true;
        while (execucao) {
            console.log(`\nO que deseja atualizar?`);
            console.log(`1 - Nome`);
            console.log(`2 - Nome Social`);
            console.log(`3 - Gênero`);
            console.log(`4 - CPF`);
            console.log(`5 - RGs`);
            console.log(`6 - Telefones`);
            console.log(`7 - Produtos Consumidos`);
            console.log(`8 - Serviços Consumidos`);
            console.log(`0 - Sair`);

            let opcao = this.entrada.receberNumero(`Escolha uma opção: `);

            switch (opcao) {
                case 1:
                    let nome = this.entrada.receberTexto(`Por favor informe o novo nome do cliente: `);
                    cliente.nome = nome;
                    console.log(`Nome atualizado com sucesso!`);
                    break;
                case 2:
                    let nomeSocial = this.entrada.receberTexto(`Por favor informe o novo nome social do cliente: `);
                    cliente.nomeSocial = nomeSocial;
                    console.log(`Nome social atualizado com sucesso!`);
                    break;
                case 3:
                    let genero = this.entrada.receberTexto(`Por favor informe o novo gênero do cliente: `);
                    while (genero !== 'M' && genero !== 'F') {
                        genero = this.entrada.receberTexto(`Por favor informe um gênero valido para o sistema (M/F): `).toLocaleUpperCase();
                    }
                    cliente.genero = genero;
                    console.log(`Gênero atualizado com sucesso!`);
                    break;
                case 4:
                    let valor = this.entrada.receberTexto(`Por favor informe o novo cpf: `);
                    const cpfExistente = this.clientes.some(c => c.getCpf.getValor === valor);
                    if (cpfExistente) {
                        console.log(`\nJá existe um cliente cadastrado com o CPF ${valor}. Atualização cancelada.\n`);
                        break;
                    }
                    let data = this.entrada.receberTexto(`Por favor informe a nova data de emissão do cpf, no padrão dd/mm/yyyy: `);
                    let partesData = data.split('/');
                    let ano = Number(partesData[2]);
                    let mes = Number(partesData[1]) - 1;
                    let dia = Number(partesData[0]);
                    let dataEmissao = new Date(ano, mes, dia);
                    let novoCpf = new CPF(valor, dataEmissao);
                    (cliente as any).cpf = novoCpf;
                    console.log(`CPF atualizado com sucesso!`);
                    break;
                case 5:
                    let alterarRgs = this.entrada.receberTexto(`Deseja alterar os RGs associados ao cliente? (S/N): `).toUpperCase();
                    if (alterarRgs === 'S') {
                        let rgsAtuais = cliente.getRgs;
                        if (rgsAtuais.length > 0) {
                            console.log(`\nRGs atualmente associados:`);
                            rgsAtuais.forEach((rg, index) => {
                                console.log(`${index + 1} - ${rg.getValor}`);
                            });

                            let remover = this.entrada.receberTexto(`Deseja remover algum RG? (S/N): `).toUpperCase();
                            while (remover === 'S') {
                                let rgRemover = this.entrada.receberTexto(`Informe o número do RG a ser removido: `);
                                cliente.removerRg(rgRemover);
                                console.log(`RG "${rgRemover}" removido com sucesso!`);
                                remover = this.entrada.receberTexto(`Deseja remover outro RG? (S/N): `).toUpperCase();
                            }
                        }

                        let associar = this.entrada.receberTexto(`Deseja associar novos RGs ao cliente? (S/N): `).toUpperCase();
                        while (associar === 'S') {
                            let numero = this.entrada.receberTexto(`Informe o número do novo RG: `);
                            let data = this.entrada.receberTexto(`Informe a data de emissão (dd/mm/yyyy): `);
                            let [dia, mes, ano] = data.split('/').map(num => Number(num));
                            let dataEmissao = new Date(ano, mes - 1, dia);
                            let novoRg = new RG(numero, dataEmissao);
                            cliente.adicionarRg(novoRg);
                            console.log(`RG "${numero}" associado com sucesso!`);
                            associar = this.entrada.receberTexto(`Deseja associar outro RG? (S/N): `).toUpperCase();
                        }
                    }
                    break;
                case 6:
                    let alterarTelefones = this.entrada.receberTexto(`Deseja alterar os telefones associados ao cliente? (S/N): `).toUpperCase();
                    if (alterarTelefones === 'S') {
                        let telefonesAtuais = cliente.getTelefones;
                        if (telefonesAtuais.length > 0) {
                            console.log(`\nTelefones atualmente associados:`);
                            telefonesAtuais.forEach((telefone, index) => {
                                console.log(`${index + 1} - (${telefone.getDdd}) ${telefone.getNumero}`);
                            });

                            let remover = this.entrada.receberTexto(`Deseja remover algum telefone? (S/N): `).toUpperCase();
                            while (remover === 'S') {
                                let ddd = this.entrada.receberTexto(`Informe o DDD do telefone a ser removido: `);
                                let numero = this.entrada.receberTexto(`Informe o número do telefone a ser removido: `);
                                cliente.removerTelefone(ddd, numero);
                                console.log(`Telefone (${ddd}) ${numero} removido com sucesso!`);
                                remover = this.entrada.receberTexto(`Deseja remover outro telefone? (S/N): `).toUpperCase();
                            }
                        }

                        let associar = this.entrada.receberTexto(`Deseja associar novos telefones ao cliente? (S/N): `).toUpperCase();
                        while (associar === 'S') {
                            let ddd = this.entrada.receberTexto(`Informe o DDD do novo telefone: `);
                            let numero = this.entrada.receberTexto(`Informe o número do novo telefone: `);
                            let novoTelefone = new Telefone(ddd, numero);
                            cliente.adicionarTelefone(novoTelefone);
                            console.log(`Telefone (${ddd}) ${numero} associado com sucesso!`);
                            associar = this.entrada.receberTexto(`Deseja associar outro telefone? (S/N): `).toUpperCase();
                        }
                    }
                    break;
                case 7:
                    let alterarProdutos = this.entrada.receberTexto(`Deseja alterar os produtos associados ao cliente? (S/N): `).toUpperCase();
                    if (alterarProdutos === 'S') {
                        let produtosAtuais = cliente.getProdutosConsumidos;
                        if (produtosAtuais && produtosAtuais.length > 0) {
                            console.log(`\nProdutos atualmente associados:`);
                            produtosAtuais.forEach((produto, index) => {
                                console.log(`${index + 1} - ${produto.nome}`);
                            });

                            let remover = this.entrada.receberTexto(`Deseja remover algum produto? (S/N): `).toUpperCase();
                            while (remover === 'S') {
                                let nomeRemover = this.entrada.receberTexto(`Informe o nome do produto a ser removido: `).toLowerCase();
                                let produto = produtosAtuais.find(p => p.nome.toLowerCase() === nomeRemover);

                                if (produto) {
                                    cliente.removerProduto(nomeRemover);
                                    console.log(`Produto "${nomeRemover}" removido com sucesso!`);
                                } else {
                                    console.log(`Produto "${nomeRemover}" não associado a esse cliente.`);
                                }

                                remover = this.entrada.receberTexto(`Deseja remover outro produto? (S/N): `).toUpperCase();
                            }
                        }

                        let associarProduto = this.entrada.receberTexto(`Deseja associar novos produtos ao cliente? (S/N): `).toUpperCase();
                        while (associarProduto === 'S') {
                            if (this.produtos.length > 0) {
                                console.log(`\nProdutos disponíveis:`);
                                this.produtos.forEach((produto, index) => {
                                    console.log(`${index + 1} - ${produto.nome}`);
                                });

                                let nomeAssociar = this.entrada.receberTexto(`Informe o nome do produto que deseja associar: `).toLowerCase();
                                let produto = this.produtos.find(p => p.nome.toLowerCase() === nomeAssociar);

                                let jaAssociado = cliente.getProdutosConsumidos.some(p => p.nome === nomeAssociar);

                                if (!produto) {
                                    console.log(`Produto "${nomeAssociar}" não está disponível.`);
                                } else if (jaAssociado) {
                                    console.log(`Produto "${nomeAssociar}" já está associado a este cliente.`);
                                } else {
                                    cliente.adicionarProduto(produto);
                                    console.log(`Produto "${nomeAssociar}" associado com sucesso!`);
                                }

                                associarProduto = this.entrada.receberTexto(`Deseja associar outro produto? (S/N): `).toUpperCase();
                            }
                        }
                    }
                    break;
                case 8:
                    let alterarServicos = this.entrada.receberTexto(`Deseja alterar os serviços associados ao cliente? (S/N): `).toUpperCase();
                    if (alterarServicos === 'S') {
                        let servicosAtuais = cliente.getServicosConsumidos;
                        if (servicosAtuais && servicosAtuais.length > 0) {
                            console.log(`\nServiços atualmente associados:`);
                            servicosAtuais.forEach((servico, index) => {
                                console.log(`${index + 1} - ${servico.nome}`);
                            });

                            let remover = this.entrada.receberTexto(`Deseja remover algum serviço? (S/N): `).toUpperCase();
                            while (remover === 'S') {
                                let nomeRemover = this.entrada.receberTexto(`Informe o nome do serviço a ser removido: `).toLowerCase();
                                let servico = servicosAtuais.find(s => s.nome.toLowerCase() === nomeRemover);

                                if (servico) {
                                    cliente.removerServico(nomeRemover);
                                    console.log(`Serviço "${nomeRemover}" removido com sucesso!`);
                                } else {
                                    console.log(`Serviço "${nomeRemover}" não associado a esse cliente.`);
                                }

                                remover = this.entrada.receberTexto(`Deseja remover outro serviço? (S/N): `).toUpperCase();
                            }
                        }

                        let associarServico = this.entrada.receberTexto(`Deseja associar novos serviços ao cliente? (S/N): `).toUpperCase();
                        while (associarServico === 'S') {
                            if (this.servicos.length > 0) {
                                console.log(`\nServiços disponíveis:`);
                                this.servicos.forEach((servico, index) => {
                                    console.log(`${index + 1} - ${servico.nome}`);
                                });

                                let nomeAssociar = this.entrada.receberTexto(`Informe o nome do serviço que deseja associar: `).toLowerCase();
                                let servico = this.servicos.find(s => s.nome.toLowerCase() === nomeAssociar);

                                let jaAssociado = cliente.getServicosConsumidos.some(s => s.nome === nomeAssociar);

                                if (!servico) {
                                    console.log(`Serviço "${nomeAssociar}" não está disponível.`);
                                } else if (jaAssociado) {
                                    console.log(`Serviço "${nomeAssociar}" já está associado a este cliente.`);
                                } else {
                                    cliente.adicionarServico(servico);
                                    console.log(`Serviço "${nomeAssociar}" associado com sucesso!`);
                                }

                                associarServico = this.entrada.receberTexto(`Deseja associar outro serviço? (S/N): `).toUpperCase();
                            }
                        }
                    }
                    break;
                case 0:
                    execucao = false;
                    break;
                default:
                    console.log(`Opção não entendida :(`);
            }
            salvarDados('clientes.json', this.clientes);
        }
        console.log(`\nAtualização concluída :)\n`); 
    }
}