// Função para obter o ID da receita da URL
function getRecipeIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Função para capitalizar a primeira letra de cada palavra
function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Função para exibir os detalhes da receita dinamicamente
function displayRecipeDetails() {
  const recipeId = getRecipeIdFromURL();
  const recipe = recipes.find((r) => r.id == recipeId);

  if (recipe) {
    const recipeDetails = document.getElementById("recipeDetails");
    recipeDetails.innerHTML = `
        <h1 class="recipe-title">${capitalizeFirstLetter(recipe.title)}</h1>

      <!-- Imagem da receita -->
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">

      <!-- Tags -->
      <div class="category-tags">
        ${recipe.tags
          .map(
            (tag) => `<span class="tag">${capitalizeFirstLetter(tag)}</span>`
          )
          .join("")}
      </div>

      <!-- Ingredientes -->
      <h2 class="section-title">Ingredientes</h2>
      <ul>
        ${recipe.ingredients
          .map((ingredient) => `<li>${capitalizeFirstLetter(ingredient)}</li>`)
          .join("")}
      </ul>

       <h2 class="section-title">Modo de Preparo</h2>
      <ol>
        ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
      </ol>

      <!-- Calorias -->
      <div class="calories">
        <h3>Calorias: ${recipe.calories} kcal</h3>
      </div>

      <!-- Botão Voltar -->
      <button onclick="history.back()">Voltar</button>
      `;
  } else {
    document.getElementById("recipeDetails").innerHTML =
      "<p>Receita não encontrada</p>";
  }
}

// Executar a função ao carregar a página
document.addEventListener("DOMContentLoaded", displayRecipeDetails);
