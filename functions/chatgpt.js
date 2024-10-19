import OpenAI from 'openai';
import nodemailer from 'nodemailer';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: `Method ${event.httpMethod} Not Allowed` }),
    };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('API Key não encontrada.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API Key não configurada.' }),
      };
    }

    const { prompt, model, email, pdfBase64, tipoPlano, nome } = JSON.parse(event.body);

    if (!prompt) {
      console.error('Prompt não fornecido.');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prompt não fornecido.' }),
      };
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      console.error('Resposta inválida do OpenAI:', completion);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Resposta inválida do OpenAI.' }),
      };
    }

    console.log('Resposta do OpenAI:', content);

    // Se houver e-mail e PDF, enviar o e-mail
    if (email && pdfBase64) {
      const result = await sendEmailWithPDF(email, pdfBase64, tipoPlano, nome);
      if (!result.success) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Erro ao enviar o email.' }),
        };
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ response: content }),
    };
  } catch (error) {
    console.error('Erro ao chamar a API do OpenAI:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar o plano alimentar.' }),
    };
  }
};

// Configuração do transporte SMTP usando Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'imc.calculator.app@gmail.com',
    pass: 'tekh oxut jmka qgvy', // Senha de App gerada
  },
});

// Função para enviar o e-mail com o PDF como anexo
async function sendEmailWithPDF(emailSend, pdfBase64, tipoPlano, nome) {
  const assunto = tipoPlano === 'alimentar' 
    ? 'Plano Alimentar Personalizado' 
    : 'Plano de Exercício Personalizado';

  const mensagem = tipoPlano === 'alimentar' 
    ? 'Segue o seu plano alimentar personalizado em anexo.' 
    : 'Segue o seu plano de exercício personalizado em anexo.';

  const nomeArquivo = tipoPlano === 'alimentar' 
    ? 'plano_alimentar.pdf' 
    : 'plano_exercicio.pdf';

  const mailOptions = {
    from: 'imc.calculator.app@gmail.com',
    to: emailSend,
    subject: assunto,
    html: `<p>Olá, ${nome}!</p><p>${mensagem}</p>`,
    attachments: [
      {
        filename: nomeArquivo,
        content: pdfBase64,
        encoding: 'base64',
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso:', info.response);
    return { success: true, message: 'Email enviado com sucesso!' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, message: 'Erro ao enviar o email.' };
  }
}
