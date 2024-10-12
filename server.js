const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const OpenAI = require('openai');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname)));


// Forçar cabeçalhos CORS para todas as requisições
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Tratamento de preflight requests (OPTIONS)
app.options('/api/chatgpt', (req, res) => {
  res.sendStatus(204);
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
