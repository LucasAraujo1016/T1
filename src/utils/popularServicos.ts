import * as fs from 'fs';
import * as path from 'path';

const servicos = [
  { nome: "Manicure Tradicional", valor: 35.00 },
  { nome: "Pedicure Tradicional", valor: 40.00 },
  { nome: "Design de Sobrancelhas", valor: 30.00 },
  { nome: "Corte de Cabelo Feminino", valor: 50.00 },
  { nome: "Coloração de Cabelo", valor: 120.00 },
  { nome: "Hidratação Capilar", valor: 60.00 },
  { nome: "Escova Progressiva", valor: 180.00 },
  { nome: "Botox Capilar", valor: 150.00 },
  { nome: "Remoção de Rugas com Laser", valor: 300.00 },
  { nome: "Remoção de Manchas na Pele", valor: 250.00 },
  { nome: "Aplicação de Botox Facial", valor: 400.00 },
  { nome: "Tratamento para Emagrecimento", valor: 350.00 },
  { nome: "Redução de Medidas com Drenagem", valor: 200.00 },
  { nome: "Corte de Cabelo Masculino", valor: 35.00 },
  { nome: "Barba Completa com Navalha", valor: 25.00 },
  { nome: "Modelagem de Barba", valor: 30.00 },
  { nome: "Tratamento para Queda de Cabelo", valor: 220.00 },
  { nome: "Massagem Relaxante", valor: 90.00 },
  { nome: "Venda de Pomada Modeladora", valor: 45.00 },
  { nome: "Venda de Shampoo Antiqueda", valor: 60.00 }
];

const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const filePath = path.join(dataDir, 'servicos.json');
fs.writeFileSync(filePath, JSON.stringify(servicos, null, 2), 'utf-8');
console.log('Arquivo servicos.json populado com sucesso!');