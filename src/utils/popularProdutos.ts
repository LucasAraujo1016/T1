import * as fs from 'fs';
import * as path from 'path';

const produtos = [
  { "nome": "Esmalte Vermelho Intenso", "valor": 12.90 },
  { "nome": "Removedor de Esmalte Sem Acetona", "valor": 9.50 },
  { "nome": "Creme Hidratante para Mãos", "valor": 18.00 },
  { "nome": "Máscara Capilar Nutritiva", "valor": 45.90 },
  { "nome": "Tintura para Cabelo Loiro Claro", "valor": 27.80 },
  { "nome": "Shampoo Reconstrutor", "valor": 22.30 },
  { "nome": "Condicionador Hidratante", "valor": 24.00 },
  { "nome": "Óleo Capilar de Argan", "valor": 38.50 },
  { "nome": "Pomada Modeladora Masculina", "valor": 32.00 },
  { "nome": "Cera para Barba e Bigode", "valor": 19.90 },
  { "nome": "Balm Pós-Barba Refrescante", "valor": 26.00 },
  { "nome": "Espuma de Barbear Refrescante", "valor": 21.75 },
  { "nome": "Loção Tônica Facial", "valor": 29.90 },
  { "nome": "Creme Anti-idade Facial", "valor": 59.90 },
  { "nome": "Sabonete Facial Detox", "valor": 16.50 },
  { "nome": "Spray Fixador de Cabelo", "valor": 20.00 },
  { "nome": "Protetor Térmico Capilar", "valor": 28.40 },
  { "nome": "Máscara de Argila Verde", "valor": 25.00 },
  { "nome": "Sérum para Crescimento de Cílios", "valor": 39.99 },
  { "nome": "Shampoo Antiqueda Masculino", "valor": 34.20 }
];

const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const filePath = path.join(dataDir, 'produtos.json');
fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf-8');
console.log('Arquivo produtos.json populado com sucesso!');