// Carrega os dados da pagina anterior
document.addEventListener('DOMContentLoaded', function() {
  const imcInput = document.getElementById('imc');
  const storedBmi = localStorage.getItem('bmiValue');

  if (storedBmi && imcInput) {
    imcInput.value = storedBmi;
  }
});

// Função para enviar o prompt para a API do ChatGPT
async function sendToChatGPT(prompt, model) {
  try {
    console.log('Enviando requisição para /api/chatgpt...');
    
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na API:', errorText);
      throw new Error(`Erro na API: ${errorText}`);
    }

    const data = await response.json();
    console.log('Resposta da API:', data);

    if (!data.response) {
      throw new Error('Resposta do servidor não contém "response".');
    }

    return data.response;
  } catch (error) {
    console.error('Erro ao chamar a API do ChatGPT:', error);
    return 'Erro ao gerar o plano alimentar.';
  }
}

function extractJsonFromResponse(response) {
  try {
    console.log('Tentando extrair JSON da resposta:', response);

    if (typeof response !== 'string') {
      console.error('Resposta não é uma string:', response);
      return null;
    }

    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);

    if (jsonMatch && jsonMatch[1]) {
      console.log('JSON encontrado nos backticks:', jsonMatch[1]);
      return JSON.parse(jsonMatch[1]);
    } else {
      console.log('Tentando parse direto da resposta:', response);
      return JSON.parse(response);
    }
  } catch (error) {
    console.error('Erro ao parsear o JSON:', error);
    return null;
  }
}

// Adiciona um evento de envio ao formulário
document.getElementById('nutritionForm').addEventListener('submit', async function(e) {
  e.preventDefault();

   // Seleciona os elementos
   const submitButton = e.target.querySelector('button[type="submit"]');
   const loadingDiv = document.getElementById('loading');
   const planoExercicioBtn = document.getElementById('planoExercicioBtn');

   // Esconde o botão de envio e mostra a ampulheta e mensagem de espera
   submitButton.style.display = 'none';
   loadingDiv.style.display = 'flex';

  // Obter os valores dos campos do formulário
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const sex = document.getElementById('sex').value;
  const imc = document.getElementById('imc').value;
  const dietProfile = document.getElementById('dietProfile').value;
  const goal = document.getElementById('goal').value;
  const allergies = document.getElementById('allergies').value;

  // Salvar os dados no localStorage
  localStorage.setItem('age', age);
  localStorage.setItem('sex', sex);
  localStorage.setItem('imc', imc);
  localStorage.setItem('goal', goal);

  const prompt = `Crie um plano alimentar em formato JSON de 7 dias para uma pessoa com as seguintes características:
  - Nome: ${name}
  - Idade: ${age}
  - Sexo: ${sex}
  - IMC: ${imc}
  - Perfil Alimentar: ${dietProfile}
  - Objetivo: ${goal}
  - Alergias/Restrições: ${allergies || 'Nenhuma informada'}
  
  Responda apenas com o JSON no formato:
  [
    {
      "day": "Segunda-feira",
      "meals": [
        { "name": "Café da Manhã", "description": "Descrição do café da manhã" },
        { "name": "Almoço", "description": "Descrição do almoço" },
        { "name": "Lanche da Tarde", "description": "Descrição do lanche da tarde" },
        { "name": "Jantar", "description": "Descrição do jantar" }
      ]
    },
    ...
  ]`;

  // Enviar o prompt para a API do ChatGPT e exibir a resposta
  const model = "gpt-3.5-turbo";
  const chatGPTResponse = await sendToChatGPT(prompt, model);

  // Extrair o plano alimentar em formato JSON
  const plan = extractJsonFromResponse(chatGPTResponse);

  // Verifica se o plano foi extraído corretamente
  if (plan && Array.isArray(plan)) {
    // Gerar e baixar o PDF diretamente
    generateAndDownloadPDF(plan);
  } else {
    console.error('Erro ao processar o plano alimentar:', plan);
  }

  // Esconde a ampulheta e mostra o botão de exercícios após a criação do plano
  loadingDiv.style.display = 'none';
  planoExercicioBtn.style.display = 'block';
});

// Função para gerar e baixar o PDF
function generateAndDownloadPDF(plan) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const rows = [];

  // Iterar sobre cada dia e suas refeições para montar as linhas da tabela
  plan.forEach(day => {
    const dayTitle = day.day;
    rows.push([
      { content: dayTitle, colSpan: 3, styles: { fillColor: [220, 220, 220], fontStyle: 'bold', textColor: [0, 0, 0] } }
    ]);

    day.meals.forEach(meal => {
      rows.push(['', meal.name, meal.description]);
    });
  });

  // Configurar a tabela no PDF com `autoTable`
  doc.setFontSize(10);
  doc.autoTable({
    head: [['', 'Refeição', 'Descrição']],
    body: rows,
    startY: 20,
    margin: { top: 20 },
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [220, 220, 220]
    }
  });

  // Salvar o PDF automaticamente
  doc.save('plano_alimentar_personalizado.pdf');

   // Exibir a mensagem de agradecimento após o download
   const thankYouMessage = document.getElementById('thankYouMessage');
   if (thankYouMessage) {
     thankYouMessage.style.display = 'block';
   }
}
