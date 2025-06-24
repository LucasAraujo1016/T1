import * as fs from 'fs';
import * as path from 'path';
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

function getCaminhoAbsoluto(nomeArquivo: string): string {
    return path.resolve(__dirname, '../../data', nomeArquivo);
}

export function salvarDados<T>(caminho: string, dados: T[]): void {
    const caminhoAbsoluto = getCaminhoAbsoluto(caminho);
    fs.mkdirSync(path.dirname(caminhoAbsoluto), { recursive: true });
    fs.writeFileSync(caminhoAbsoluto, JSON.stringify(dados, null, 2), 'utf-8');
}

export function carregarDados<T>(caminho: string): T[] {
    const caminhoAbsoluto = getCaminhoAbsoluto(caminho);
    if (!fs.existsSync(caminhoAbsoluto)) return [];
    const conteudo = fs.readFileSync(caminhoAbsoluto, 'utf-8');
    return JSON.parse(conteudo);
}

export function reconstruirClientes(dados: any[]): Cliente[] {
    return dados.map(obj => {
        const cpf = new CPF(obj.cpf.valor, new Date(obj.cpf.dataEmissao));
        const cliente = new Cliente(obj.nome, obj.nomeSocial, obj.genero, cpf);

        if (obj.rgs) {
            obj.rgs.forEach((rg: any) => {
                cliente.adicionarRg(new RG(rg.valor, new Date(rg.dataEmissao)));
            });
        }

        if (obj.telefones) {
            obj.telefones.forEach((telefone: any) => {
                cliente.adicionarTelefone(new Telefone(telefone.ddd, telefone.numero));
            });
        }

        if (obj.produtosConsumidos) {
            obj.produtosConsumidos.forEach((produto: any) => {
                cliente.adicionarProduto(new Produto(produto.nome, produto.valor));
            });
        }

        if (obj.servicosConsumidos) {
            obj.servicosConsumidos.forEach((servico: any) => {
                cliente.adicionarServico(new Servico(servico.nome, servico.valor));
            });
        }

        return cliente;
    });
}

export function reconstruirProdutos(dados: any[]): Produto[] {
    return dados.map(obj => new Produto(obj.nome, Number(Number(obj.valor).toFixed(2))));
}

export function reconstruirServicos(dados: any[]): Servico[] {
    return dados.map(obj => new Servico(obj.nome, Number(Number(obj.valor).toFixed(2))));
}