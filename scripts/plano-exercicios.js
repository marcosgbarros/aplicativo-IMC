// Formulário Plano de Exercícios
document.getElementById('practiceExercise').addEventListener('change', function() {
  const exerciseType = document.getElementById('exerciseType');
  const desiredExercise = document.getElementById('desiredExercise');
  if (this.value === 'sim') {
    exerciseType.style.display = 'block';
    desiredExercise.style.display = 'none';
  } else if (this.value === 'nao') {
    exerciseType.style.display = 'none';
    desiredExercise.style.display = 'block';
  } else {
    exerciseType.style.display = 'none';
    desiredExercise.style.display = 'none';
  }
});

// Função para enviar o prompt para a API do ChatGPT
async function sendToChatGPT(prompt, model) {
  try {
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model }),
    });

    const data = await response.json();
    return data.response || 'Não foi possível gerar o plano de exercícios no momento.';
  } catch (error) {
    console.error('Erro ao chamar a API do ChatGPT:', error);
    return 'Erro ao gerar o plano de exercícios.';
  }
}

// Função para extrair e gerar o plano de exercícios a partir da resposta do ChatGPT
function extractJsonFromResponse(response) {
  try {
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    } else {
      return JSON.parse(response);
    }
  } catch (error) {
    console.error('Erro ao parsear o JSON:', error);
    return null;
  }
}

// Adiciona um evento de envio ao formulário
document.getElementById('exerciseForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Seleciona os elementos
  const submitButton = e.target.querySelector('button[type="submit"]');
  const loadingDiv = document.getElementById('loading');

  // Verifique se os elementos são encontrados antes de acessar 'style'
  if (submitButton && loadingDiv) {
    // Esconde o botão de envio e mostra a ampulheta e mensagem de espera
    submitButton.style.display = 'none';
    loadingDiv.style.display = 'flex';
  } else {
    console.error('Um ou mais elementos (submitButton, loadingDiv) não foram encontrados.');
    return;
  }
 
  // Recupera os valores do localStorage
  const imc = localStorage.getItem('imc');
  const age = localStorage.getItem('age');
  const sex = localStorage.getItem('sex');
  const goal = localStorage.getItem('goal');
  const practiceExercise = document.getElementById('practiceExercise').value;
  const currentExercise = document.getElementById('currentExercise').value;
  const wantedExercise = document.getElementById('wantedExercise').value;
  const frequency = document.getElementById('frequency').value;
  const limitations = document.getElementById('limitations').value;

  console.log('imc:', imc, 'age:', age, 'sex:', sex, 'goal:', goal);
  console.log('practiceExercise:', practiceExercise, 'currentExercise:', currentExercise, 'wantedExercise:', wantedExercise, 'frequency:', frequency, 'limitations:', limitations);

  // Construir o prompt para a geração de um plano de exercícios personalizado
  const prompt = `Crie um plano de exercícios em formato JSON de 7 dias para uma pessoa com as seguintes características:
  - Idade: ${age}
  - Sexo: ${sex}
  - IMC: ${imc}
  - Prática de Exercício: ${practiceExercise}
  - Exercício Atual: ${currentExercise}
  - Exercício Desejado: ${wantedExercise}
  - Frequência: ${frequency} vezes por semana
  - Limitações: ${limitations || 'Nenhuma informada'}
  - Objetivo: ${goal}

  Responda apenas com o JSON no formato:
  [
    {
      "day": "Segunda-feira",
      "exercises": [
        { "name": "Nome do Exercício", "description": "Descrição do exercício", "reps": "Repetições", "sets": "Séries" }
      ]
    }
  ]`;

  // Enviar o prompt para a API do ChatGPT e exibir a resposta
  const model = "gpt-4o-mini";
  const chatGPTResponse = await sendToChatGPT(prompt, model);

  // Extrair o plano de exercícios em formato JSON
  const plan = extractJsonFromResponse(chatGPTResponse);

  // Verifica se o plano foi extraído corretamente
  if (plan && Array.isArray(plan)) {
    generateAndDownloadExercisePDF(plan);
  } else {
    console.error('Erro ao processar o plano de exercícios:', plan);
  }

  // Esconde a ampulheta e mostra o botão de envio novamente
  loadingDiv.style.display = 'none';
});

// Função para gerar e baixar o PDF do plano de exercícios
function generateAndDownloadExercisePDF(plan) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const rows = [];
  plan.forEach(day => {
    const dayTitle = day.day;
    rows.push([
      { content: dayTitle, colSpan: 4, styles: { fillColor: [220, 220, 220], fontStyle: 'bold', textColor: [0, 0, 0] } }
    ]);

    day.exercises.forEach(exercise => {
      rows.push(['', exercise.name, exercise.description, `${exercise.sets} x ${exercise.reps}`]);
    });
  });

  doc.setFontSize(10);
  doc.autoTable({
    head: [['', 'Exercício', 'Descrição', 'Séries x Repetições']],
    body: rows,
    startY: 20,
    margin: { top: 20 },
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [220, 220, 220],
    },
  });

  doc.save('plano_exercicios_personalizado.pdf');

  // Exibir a mensagem de agradecimento após o download
  const thankYouMessage = document.getElementById('thankYouMessage');
  if (thankYouMessage) {
    thankYouMessage.style.display = 'block';
  }
}

