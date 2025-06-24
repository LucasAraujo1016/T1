import Entrada from '../io/entrada.js';
import Cliente from '../modelo/cliente.js';
import { carregarDados, reconstruirClientes, salvarDados } from '../utils/registros.js';

export default class DeletarCliente {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }
    
    public deletar(): void {
        console.log('\nInicio do processo de exclusão de cliente');
        this.clientes = reconstruirClientes(carregarDados('clientes.json'));
        let cpfValor = this.entrada.receberTexto('Informe o CPF do cliente a ser excluído: ');
        let cliente = this.clientes.findIndex(c => c.getCpf.getValor === cpfValor)
        if (cliente !== -1) {
            let confirmacao = this.entrada.receberTexto(`Confirma a exclusão do cliente com CPF ${cpfValor}? (S/N): `);
            if (confirmacao.toUpperCase() === 'S') {
                this.clientes.splice(cliente, 1);
                salvarDados('clientes.json', this.clientes);
                console.log(`\nCliente com CPF ${cpfValor} foi excluído com sucesso.`);
            } else {
                console.log('\n Exclusão cancelada')
            }
        } else {
            console.log('\nCliente não encontrado.');
        }
    }
}