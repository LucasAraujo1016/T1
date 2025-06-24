export default class Servico {
    public nome!: string;
    public valor: number;

    constructor(nome: string, valor: number) {
        this.nome = nome;
        this.valor = Number(Number(valor).toFixed(2));
    }

    public get getNome(): string {
        return this.nome;
    }
}