function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const resultDiv = document.getElementById('result');
  const bmiTable = document.getElementById('bmiTable');
  const infoDiv = document.getElementById('info');

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      resultDiv.textContent = "Por favor, insira valores válidos.";
      resultDiv.style.backgroundColor = "#ff9999";
      resultDiv.style.opacity = 1;
      bmiTable.style.display = 'none';
      return;
  }

  const bmi = weight / (height * height);
  localStorage.setItem('bmiValue', bmi.toFixed(2));

  let category, color;

  if (bmi < 18.5) {
      category = "Abaixo do peso";
      color = "#3498db";
  } else if (bmi < 25) {
      category = "Peso normal";
      color = "#2ecc71";
  } else if (bmi < 30) {
      category = "Sobrepeso";
      color = "#f1c40f";
  } else if (bmi < 35) {
      category = "Obesidade grau 1";
      color = "#e67e22";
  } else if (bmi < 40) {
      category = "Obesidade grau 2";
      color = "#e74c3c";
  } else {
      category = "Obesidade grau 3";
      color = "#c0392b";
  }

  resultDiv.innerHTML = `Seu IMC é <strong>${bmi.toFixed(2)}</strong><br>Classificação: ${category}`;
  resultDiv.style.backgroundColor = color;
  resultDiv.style.opacity = 1;
  resultDiv.style.color = "white";
  bmiTable.style.display = 'table';
  infoDiv.style.display = 'block';

  const rows = bmiTable.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
      rows[i].style.backgroundColor = '';
      if (rows[i].cells[1].textContent === category) {
          rows[i].style.backgroundColor = color;
          rows[i].style.color = 'white';
      } else {
          rows[i].style.color = 'black';
      }
  }
}


// Selecionando os elementos
const openPopupButton = document.getElementById('openPopupButton');
const emailPopup = document.getElementById('emailPopup');
const closePopupButton = document.getElementById('closePopup');
const emailForm = document.getElementById('emailForm');

// Função para abrir o popup
openPopupButton.addEventListener('click', function () {
  emailPopup.style.display = 'block';
  popupOverlay.style.display = 'block'; // Exibe o fundo escuro
});

// Função para fechar o popup
closePopupButton.addEventListener('click', function () {
  emailPopup.style.display = 'none';
  popupOverlay.style.display = 'none'; // Esconde o fundo escuro
});

// Fechar o popup clicando fora dele
popupOverlay.addEventListener('click', function () {
  emailPopup.style.display = 'none';
  popupOverlay.style.display = 'none';
});

// Submeter o formulário e redirecionar
emailForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o recarregamento da página

  const email = document.getElementById('emailInput').value;
  localStorage.setItem('userEmail', email); // Salva o e-mail no localStorage

  // Redireciona para a página de plano-alimentacao.html
  window.location.href = 'plano-alimentacao.html';
});

