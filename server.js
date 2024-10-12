import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração necessária para obter __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// retirar
app.use(cors({
  origin: '*', // Ou '*' para permitir todas as origens
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Servir arquivos estáticos da raiz
app.use(express.static(path.join(__dirname)));

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));


// Rota POST para a API do ChatGPT
app.post('/api/chatgpt', async (req, res) => {
  const { prompt, model } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});

//retirar
app.options('*', cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
