import nodemailer from 'nodemailer';

export const handler = async (event) => {
  try {
    const { email, pdfBase64, tipoPlano, nome } = JSON.parse(event.body);

    const assunto = tipoPlano === 'alimentar'
      ? 'Plano Alimentar Personalizado'
      : 'Plano de Exercício Personalizado';

    const mensagem = tipoPlano === 'alimentar'
      ? 'Segue o seu plano alimentar personalizado em anexo.'
      : 'Segue o seu plano de exercício personalizado em anexo.';

    const nomeArquivo = tipoPlano === 'alimentar'
      ? 'plano_alimentar.pdf'
      : 'plano_exercicio.pdf';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'imc.calculator.app@gmail.com',
        pass: 'tekh oxut jmka qgvy',
      },
    });

    const mailOptions = {
      from: 'imc.calculator.app@gmail.com',
      to: email,
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

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso:', info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email enviado com sucesso!' }),
    };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar o email.' }),
    };
  }
};

/*// Configuração do transporte SMTP usando Gmail
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
*/