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

  document.getElementById('exerciseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const practiceExercise = document.getElementById('practiceExercise').value;
    const currentExercise = document.getElementById('currentExercise').value;
    const wantedExercise = document.getElementById('wantedExercise').value;
    const frequency = document.getElementById('frequency').value;
    const limitations = document.getElementById('limitations').value;

    // Simulação de geração de plano de exercícios personalizado
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <h3>Seu Plano de Exercícios Personalizado</h3>
      <p>Com base nas informações fornecidas, aqui está um plano de exercícios inicial para você:</p>
      <ul>
        <li>Status atual: ${practiceExercise === 'sim' ? `Pratica ${currentExercise}` : `Não pratica exercícios, mas gostaria de praticar ${wantedExercise}`}</li>
        <li>Frequência desejada: ${frequency} vezes por semana</li>
        <li>Considerações especiais: ${limitations || 'Nenhuma informada'}</li>
      </ul>
      <h4>Plano Semanal Sugerido:</h4>
      <ul>
        ${practiceExercise === 'sim' ? `
          <li>Continue com ${currentExercise} ${frequency === '1-2' ? '1-2' : frequency === '3-4' ? '2-3' : '3-4'} vezes por semana</li>
          <li>Adicione ${frequency === '1-2' ? '1' : '2'} sessão(ões) de treinamento de força</li>
          <li>Inclua 1 sessão de yoga ou alongamento para melhorar a flexibilidade</li>
        ` : `
          <li>Comece com ${wantedExercise} ${frequency === '1-2' ? '1' : frequency === '3-4' ? '2' : '3'} vezes por semana</li>
          <li>Adicione ${frequency === '1-2' ? '1' : '2'} sessão(ões) de caminhada ou natação para melhorar o condicionamento cardiovascular</li>
          <li>Inclua 1 sessão de exercícios de força corporal básicos</li>
        `}
      </ul>
      <p>Lembre-se de sempre consultar um profissional de saúde antes de iniciar qualquer novo programa de exercícios.</p>
    `;
    resultDiv.style.backgroundColor = '#e6f7ff';
    resultDiv.style.opacity = 1;

    document.getElementById('downloadBtn').style.display = 'block';
  });

  document.getElementById('downloadBtn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const content = document.getElementById('result').innerText;
    const splitContent = doc.splitTextToSize(content, 180);
    
    doc.text("Plano de Exercícios Personalizado", 20, 20);
    doc.text(splitContent, 10, 40);
    
    doc.save("plano_exercicios_personalizado.pdf");
  });