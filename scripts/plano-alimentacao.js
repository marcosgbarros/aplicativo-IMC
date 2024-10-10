document.getElementById('nutritionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const sex = document.getElementById('sex').value;
  const imc = document.getElementById('imc').value;
  const dietProfile = document.getElementById('dietProfile').value;
  const goal = document.getElementById('goal').value;
  const allergies = document.getElementById('allergies').value;

  // Simulação de geração de plano alimentar personalizado
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h3>Seu Plano Alimentar Personalizado</h3>
    <p>Olá ${name}, com base nas informações fornecidas, aqui está um plano alimentar inicial para você:</p>
    <ul>
      <li>Idade: ${age} anos</li>
      <li>Sexo: ${sex}</li>
      <li>IMC: ${imc}</li>
      <li>Perfil Alimentar: ${dietProfile}</li>
      <li>Objetivo: ${goal}</li>
      <li>Alergias/Restrições: ${allergies || 'Nenhuma informada'}</li>
    </ul>
    <h4>Sugestão de Plano Diário:</h4>
    <ul>
      <li>Café da manhã: Smoothie de frutas com proteína vegetal e sementes</li>
      <li>Lanche da manhã: Mix de nuts e uma fruta</li>
      <li>Almoço: Salada verde com grãos integrais e proteína magra</li>
      <li>Lanche da tarde: Iogurte (ou alternativa vegetal) com granola sem açúcar</li>
      <li>Jantar: Sopa de legumes com fonte de proteína</li>
    </ul>
    <p>Este é apenas um plano inicial. Recomendamos consultar um nutricionista para um plano mais detalhado e personalizado.</p>
  `;
  resultDiv.style.backgroundColor = '#e6f7ff';
  resultDiv.style.opacity = 1;

  document.getElementById('downloadBtn').style.display = 'block';
  document.getElementById('planoExercicioBtn').style.display = 'block';
});

document.getElementById('downloadBtn').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const content = document.getElementById('result').innerText;
  const splitContent = doc.splitTextToSize(content, 180);
  
  doc.text("Plano Alimentar Personalizado", 20, 20);
  doc.text(splitContent, 10, 40);
  
  doc.save("plano_alimentar_personalizado.pdf");
});