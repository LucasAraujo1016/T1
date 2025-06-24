import * as fs from 'fs';
import * as path from 'path';

const dataDir = path.resolve(__dirname, '../../data');
const produtos: any[] = JSON.parse(fs.readFileSync(path.join(dataDir, 'produtos.json'), 'utf-8'));
const servicos: any[] = JSON.parse(fs.readFileSync(path.join(dataDir, 'servicos.json'), 'utf-8'));

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[], count: number): T[] {
    const copy = [...arr];
    const result: T[] = [];
    for (let i = 0; i < count && copy.length > 0; i++) {
        const idx = randomInt(0, copy.length - 1);
        result.push(copy[idx]);
        copy.splice(idx, 1);
    }
    return result;
}

const nomes = [
    "Ana", "Beatriz", "Carla", "Daniela", "Eduarda", "Fernanda", "Gabriela", "Helena", "Isabela", "Juliana",
    "Karla", "Larissa", "Marina", "Natália", "Olívia", "Patrícia", "Quésia", "Rafaela", "Sabrina", "Tatiane",
    "Ursula", "Vanessa", "Wanda", "Ximena", "Yasmin", "Zuleica", "Bruno", "Carlos", "Diego", "Eduardo"
];
const sobrenomes = [
    "Silva", "Santos", "Oliveira", "Souza", "Pereira", "Lima", "Ferreira", "Almeida", "Costa", "Gomes",
    "Martins", "Araújo", "Barbosa", "Ribeiro", "Alves", "Cardoso", "Rocha", "Moura", "Batista", "Dias"
];

const clientes: any[] = [];

for (let i = 0; i < 30; i++) {
    const nome = `${nomes[i]} ${sobrenomes[randomInt(0, sobrenomes.length - 1)]}`;
    const nomeSocial = `${nomes[i]} ${sobrenomes[randomInt(0, sobrenomes.length - 1)]}`;
    const genero = i < 15 ? 'F' : 'M';
    const cpf = {
        valor: `${randomInt(100,999)}.${randomInt(100,999)}.${randomInt(100,999)}-${randomInt(10,99)}`,
        dataEmissao: new Date(2015 + randomInt(0, 8), randomInt(0, 11), randomInt(1, 28)).toISOString()
    };
    const rgs = [
        {
            valor: `${randomInt(10,99)}.${randomInt(100,999)}.${randomInt(100,999)}-${randomInt(1,9)}`,
            dataEmissao: new Date(2010 + randomInt(0, 10), randomInt(0, 11), randomInt(1, 28)).toISOString()
        }
    ];
    const telefones = [
        {
            ddd: `${randomInt(11, 99)}`,
            numero: `${randomInt(90000, 99999)}-${randomInt(1000, 9999)}`
        }
    ];
    const produtosConsumidos = pickRandom(produtos, randomInt(2, 5));
    const servicosConsumidos = pickRandom(servicos, randomInt(2, 5));

    clientes.push({
        nome,
        nomeSocial,
        genero,
        cpf,
        rgs,
        dataCadastro: new Date(2024, randomInt(0, 11), randomInt(1, 28)).toISOString(),
        telefones,
        produtosConsumidos,
        servicosConsumidos
    });
}

fs.writeFileSync(path.join(dataDir, 'clientes.json'), JSON.stringify(clientes, null, 2), 'utf-8');
console.log('Arquivo clientes.json populado com 30 clientes de teste!');