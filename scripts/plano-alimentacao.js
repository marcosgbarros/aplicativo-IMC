// Carrega o menu quando a página estiver pronta
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
      const response = await fetch('http://localhost:3000/api/chatgpt', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt, model }),
      });

      const data = await response.json();
      return data.response || 'Não foi possível gerar o plano alimentar no momento.';
  } catch (error) {
      console.error('Erro ao chamar a API do ChatGPT:', error);
      return 'Erro ao gerar o plano alimentar.';
  }
}

// Função para extrair e gerar a tabela a partir da resposta do ChatGPT
function extractJsonFromResponse(response) {
  try {
      // Usar uma expressão regular para encontrar a parte que é JSON entre backticks (```)
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);

      if (jsonMatch && jsonMatch[1]) {
          return JSON.parse(jsonMatch[1]);
      } else {
          // Tentar parsear diretamente se não houver delimitadores de JSON
          return JSON.parse(response);
      }
  } catch (error) {
      console.error('Erro ao parsear o JSON:', error);
      return null;
  }
}

function generatePlanFromResponse(response) {
  const days = extractJsonFromResponse(response);

  if (!Array.isArray(days)) {
      console.error('O JSON extraído não é um array:', days);
      return '<p>Erro ao processar a resposta. O JSON não está no formato esperado.</p>';
  }

  let content = `
      <div class="plan-container">
          <h3>Plano Alimentar Personalizado</h3>
  `;

  // Itera sobre cada dia e suas refeições
  days.forEach(day => {
      content += `
          <div class="day-card">
              <h4 class="day-title">${day.day}</h4>
              <ul class="meals-list">
      `;

      day.meals.forEach(meal => {
          content += `
              <li class="meal-item">
                  <strong>${meal.name}:</strong> ${meal.description}
              </li>
          `;
      });

      content += `
              </ul>
          </div>
      `;
  });

  content += `
      </div>
  `;
  return content;
}


// Adiciona um evento de envio ao formulário
document.getElementById('nutritionForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Obter os valores dos campos do formulário
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const sex = document.getElementById('sex').value;
  const imc = document.getElementById('imc').value;
  const dietProfile = document.getElementById('dietProfile').value;
  const goal = document.getElementById('goal').value;
  const allergies = document.getElementById('allergies').value;

  // Salvar os dados no localStorage
  localStorage.setItem('name', name);
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
  const model = "gpt-4o-mini";
  const chatGPTResponse = await sendToChatGPT(prompt, model);
  const resultDiv = document.getElementById('result');
  
  // Gerar a tabela e exibir
  // Gerar o conteúdo de forma mais organizada e exibir
  const planHtml = generatePlanFromResponse(chatGPTResponse);
  resultDiv.innerHTML = planHtml;
  resultDiv.style.backgroundColor = '#e6f7ff';
  resultDiv.style.opacity = 1;

  document.getElementById('downloadBtn').style.display = 'block';
  document.getElementById('planoExercicioBtn').style.display = 'block';
});

// Baixar Plano em PDF
document.getElementById('downloadBtn').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
      orientation: 'portrait', // Orientação retrato
      unit: 'mm', // Unidades em milímetros
      format: 'a4' // Formato A4
  });

  // Obter o conteúdo da tabela em formato estruturado
  const content = document.querySelectorAll('#result .day-card');
  const rows = [];

  // Iterar sobre cada dia e suas refeições para montar as linhas da tabela
  content.forEach(dayCard => {
      const dayTitle = dayCard.querySelector('.day-title').innerText;
      const meals = dayCard.querySelectorAll('.meal-item');

      // Adicionar uma linha de destaque para o nome do dia
      rows.push([
          { content: dayTitle, colSpan: 3, styles: { fillColor: [220, 220, 220], fontStyle: 'bold', textColor: [0, 0, 0] } }
      ]);

      // Adicionar as refeições do dia
      meals.forEach(meal => {
          const mealName = meal.querySelector('strong').innerText.replace(':', '');
          const mealDescription = meal.innerText.replace(`${mealName}: `, '');
          rows.push([ '', mealName, mealDescription ]);
      });
  });

  // Configurar a tabela no PDF com `autoTable`
  doc.setFontSize(10); // Define um tamanho de fonte menor para caber melhor na folha A4
  doc.autoTable({
      head: [['', 'Refeição', 'Descrição']],
      body: rows,
      startY: 20, // Onde a tabela começa na página
      margin: { top: 20 },
      styles: {
          fontSize: 8, // Ajuste do tamanho da fonte para a tabela
          cellPadding: 2,
      },
      headStyles: {
          fillColor: [220, 220, 220] // Cor do fundo do cabeçalho (cinza claro)
      }
  });

  // Salvar o PDF
  doc.save('plano_alimentar_personalizado.pdf');
});


