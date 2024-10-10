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

// Adiciona um evento de envio ao formulário
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

  // Criar o prompt para o ChatGPT
  const prompt = `Crie um plano alimentar em forma de tabela de 7 dias para uma pessoa com as seguintes características:
  - Nome: ${name}
  - Idade: ${age}
  - Sexo: ${sex}
  - IMC: ${imc}
  - Perfil Alimentar: ${dietProfile}
  - Objetivo: ${goal}
  - Alergias/Restrições: ${allergies || 'Nenhuma informada'}`;

  // Enviar o prompt para a API do ChatGPT e exibir a resposta
  const model = "gpt-4o-mini"; // Ou outro agente específico
  const chatGPTResponse = await sendToChatGPT(prompt, model);
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
      <h3>Plano Alimentar Personalizado por ChatGPT</h3>
      <p>${chatGPTResponse}</p>
  `;
  resultDiv.style.backgroundColor = '#e6f7ff';
  resultDiv.style.opacity = 1;

  document.getElementById('downloadBtn').style.display = 'block';
  document.getElementById('planoExercicioBtn').style.display = 'block';
});

// Baixar Plano em PDF
document.getElementById('downloadBtn').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const content = document.getElementById('result').innerText;
  const splitContent = doc.splitTextToSize(content, 180);
  
  doc.text("Plano Alimentar Personalizado", 20, 20);
  doc.text(splitContent, 10, 40);
  
  doc.save("plano_alimentar_personalizado.pdf");
});