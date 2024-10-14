import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Configurar as rotas de arquivos estáticos
app.use(express.static(path.join(__dirname)));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Rota POST para a API do ChatGPT
app.post('/api/chatgpt', async (req, res) => {
  try {
    const { prompt, model } = req.body;
    const completion = await new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      .chat.completions.create({
        model: model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao gerar o plano alimentar.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
