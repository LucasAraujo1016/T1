import CPF from "./cpf"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    getProdutos() {
        throw new Error("Method not implemented.")
    }
    public nome: string
    public nomeSocial: string
    public genero: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    constructor(nome: string, nomeSocial: string, genero: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.genero = genero
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }

    public adicionarRg(rg: RG): void {
        this.rgs.push(rg);
    }

    public removerRg(valor: string): void {
        this.rgs = this.rgs.filter(
                rg => rg.getValor !== valor
        );
    }

    public adicionarTelefone(telefone: Telefone): void {
        this.telefones.push(telefone)
    }

    public removerTelefone(ddd: string, numero: string): void {
        this.telefones = this.telefones.filter(
            telefone => !(telefone.getDdd === ddd && telefone.getNumero === numero)
        );
    }

    public adicionarProduto(produto: Produto): void {
        this.produtosConsumidos.push(produto)
    }

    public removerProduto(nome: string): void {
        this.produtosConsumidos = this.produtosConsumidos.filter(
            produto => produto.nome !== nome
        );
    }

    public adicionarServico(servico: Servico): void {
        this.servicosConsumidos.push(servico)
    }

    public removerServico(nome: string): void {
        this.servicosConsumidos = this.servicosConsumidos.filter(
            servico => servico.nome !== nome
        )
    }
}