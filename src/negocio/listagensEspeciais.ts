import { carregarDados, reconstruirClientes } from "../utils/registros";
import Listagem from "./listagem";
import Cliente from "../modelo/cliente";

export class ListagemTop10Consumidores extends Listagem {
    public listar(): void {
        const clientes = reconstruirClientes(carregarDados<Cliente>('clientes.json'));
        const ranking = clientes.map(cliente => ({
            cliente, total: (cliente.getProdutosConsumidos.length || 0) + (cliente.getServicosConsumidos.length || 0)
        })).sort((a,b) => b.total - a.total).slice(0,10);

        console.log(`\nTop 10 clientes que mais consumiram:\n`);
        ranking.forEach((item, index) => {
            console.log(`${index + 1}. ${item.cliente.nome} - Total consumido: ${item.total}`);
        });
    }
}

export class ListagemClientesGenero extends Listagem {
    public listar(): void {
        const clientes = reconstruirClientes(carregarDados<Cliente>('clientes.json'));
        const generos = { F: [] as Cliente[], M: []  as Cliente[] };

        clientes.forEach(cliente => {
            if (cliente.genero === 'F') {
                generos.F.push(cliente);
            } else if (cliente.genero === 'M') {
                generos.M.push(cliente);
            }
        });

        console.log("\nClientes do gênero Feminino:");
        generos.F.forEach(c => console.log(`- ${c.nome}`));
        console.log("\nClientes do gênero Masculino:");
        generos.M.forEach(c => console.log(`- ${c.nome}`));
    }
}

export class ListagemMaisConsumidos extends Listagem {
    public listar(): void {
        const clientes = reconstruirClientes(carregarDados<Cliente>('clientes.json'));
        const consumo: {[nome: string]: {tipo: string, quantidade: number}} = {};

        clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(Produto => {
                if (!consumo[Produto.nome]) 
                    consumo[Produto.nome] = {tipo: "Produto", quantidade: 0};
                    consumo[Produto.nome].quantidade++;
            });
            cliente.getServicosConsumidos.forEach(servico => {
                if (!consumo[servico.nome]) 
                    consumo[servico.nome] = {tipo: "Serviço", quantidade: 0};
                    consumo[servico.nome].quantidade++;
            });
        });

        const ranking = Object.entries(consumo).sort((a,b) => b[1].quantidade - a[1].quantidade);
        console.log("\nProdutos e serviços mais consumidos (geral):\n");
        ranking.forEach(([nome, info], idx) => {
            console.log(`${idx + 1}. ${nome} (${info.tipo}) - ${info.quantidade} vezes`);
        });
    }
}

export class ListagemMaisConsumidosPorGenero extends Listagem {
    public listar(): void {
        const clientes = reconstruirClientes(carregarDados<Cliente>('clientes.json'));
        const generos = ['F', 'M'];

        generos.forEach(genero => {
            const consumo: { [nome: string]: { tipo: string, quantidade: number } } = {};
            clientes.filter(c => c.genero === genero).forEach(cliente => {
                cliente.getProdutosConsumidos.forEach(produto => {
                    if (!consumo[produto.nome]) 
                        consumo[produto.nome] = { tipo: "Produto", quantidade: 0 };
                        consumo[produto.nome].quantidade++;
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    if (!consumo[servico.nome]) 
                        consumo[servico.nome] = { tipo: "Serviço", quantidade: 0 };
                        consumo[servico.nome].quantidade++;
                });
            });

            const ranking = Object.entries(consumo).sort((a, b) => b[1].quantidade - a[1].quantidade);
            console.log(`\nMais consumidos pelo gênero ${genero === 'F' ? 'Feminino' : 'Masculino'}:`);
            ranking.forEach(([nome, info], index) => {
                console.log(`${index + 1}. ${nome} (${info.tipo}) - ${info.quantidade} vezes`);
            });
        });
    }
}

export class ListagemTop10MenosConsumidores extends Listagem {
    public listar(): void {
        const clientes = reconstruirClientes(carregarDados<Cliente>('clientes.json'));
        const ranking = clientes.map(cliente => ({
            cliente, total: (cliente.getProdutosConsumidos.length || 0) + (cliente.getServicosConsumidos.length || 0)
        })).sort((a, b) => a.total - b.total).slice(0, 10);

        console.log("\nTop 10 clientes que menos consumiram (quantidade):\n");
        ranking.forEach((item, index) => {
            console.log(`${index + 1}. ${item.cliente.nome} - Total consumido: ${item.total}`);
        });
    }
}

export class ListagemTop5MaiorValor extends Listagem {
    public listar(): void {
        const clientes = reconstruirClientes(carregarDados<Cliente>('clientes.json'));
        const ranking = clientes.map(cliente => {
            const valorProdutos = cliente.getProdutosConsumidos.reduce((soma, p) => soma + (p.valor || 0), 0);
            const valorServicos = cliente.getServicosConsumidos.reduce((soma, s) => soma + (s.valor || 0), 0);
            return {
                cliente, valorTotal: valorProdutos + valorServicos
            };
        }).sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 5);

        console.log("\nTop 5 clientes que mais consumiram em valor:\n");
        ranking.forEach((item, index) => {
            console.log(`${index + 1}. ${item.cliente.nome} - Valor total: R$ ${item.valorTotal.toFixed(2)}`);
        });
    }
}