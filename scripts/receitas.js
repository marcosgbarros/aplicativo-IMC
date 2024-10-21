const recipes = [
    {
      id: 1,
      title: "Salada de Quinoa com Legumes",
      image: "https://source.unsplash.com/random/800x600?quinoa+salad",
      calories: 280,
      tags: ["sem-carne", "vegana", "sem-lactose", "sem-acucar", "sem-gluten"],
      ingredients: ["quinoa", "tomate", "pepino", "cenoura", "azeite"]
    },
    {
      id: 2,
      title: "Smoothie Verde Energético",
      image: "https://source.unsplash.com/random/800x600?green+smoothie",
      calories: 150,
      tags: ["sem-carne", "vegana", "sem-lactose", "sem-acucar", "sem-gluten"],
      ingredients: ["espinafre", "banana", "maçã", "chia", "água de coco"]
    },
    {
      id: 3,
      title: "Omelete de Claras com Espinafre",
      image: "https://source.unsplash.com/random/800x600?egg+white+omelette",
      calories: 200,
      tags: ["sem-carne", "sem-lactose", "sem-acucar", "sem-gluten"],
      ingredients: ["claras de ovo", "espinafre", "tomate", "cebola", "azeite"]
    },
    {
      id: 4,
      title: "Bowl de Açaí com Frutas",
      image: "https://source.unsplash.com/random/800x600?acai+bowl",
      calories: 320,
      tags: ["sem-carne", "vegana", "sem-lactose", "sem-gluten"],
      ingredients: ["açaí", "banana", "morango", "granola sem glúten", "mel"]
    },
    {
      id: 5,
      title: "Salmão Grelhado com Aspargos",
      image: "https://source.unsplash.com/random/800x600?grilled+salmon",
      calories: 380,
      tags: ["sem-lactose", "sem-acucar", "sem-gluten"],
      ingredients: ["salmão", "aspargos", "limão", "azeite", "ervas"]
    },
    {
      id: 6,
      title: "Wrap de Alface com Homus",
      image: "https://source.unsplash.com/random/800x600?lettuce+wrap",
      calories: 220,
      tags: ["sem-carne", "vegana", "sem-lactose", "sem-acucar", "sem-gluten"],
      ingredients: ["folhas de alface", "homus", "tomate", "pepino", "cenoura"]
    },
    {
      id: 7,
      title: "Pudim de Chia com Frutas Vermelhas",
      image: "https://source.unsplash.com/random/800x600?chia+pudding",
      calories: 180,
      tags: ["sem-carne", "vegana", "sem-lactose", "sem-gluten"],
      ingredients: ["sementes de chia", "leite de amêndoas", "framboesas", "amoras", "mel"]
    },
    {
      id: 8,
      title: "Frango Grelhado com Legumes Assados",
      image: "https://source.unsplash.com/random/800x600?grilled+chicken",
      calories: 350,
      tags: ["sem-lactose", "sem-acucar", "sem-gluten"],
      ingredients: ["peito de frango", "abobrinha", "pimentão", "cebola roxa", "alecrim"]
    }
  ];

  function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
      <div class="recipe-info">
        <h2 class="recipe-title">${recipe.title}</h2>
        <p class="recipe-calories">${recipe.calories} calorias</p>
        <div class="recipe-tags">
          ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;

    // evento de clique
    card.addEventListener('click', () => {
      showRecipeDetails(recipe);
    });
    return card;
  }

  function showRecipeDetails(recipe) {
    const grid = document.getElementById('recipeGrid');
    grid.innerHTML = '';

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'recipe-details';
    detailsDiv.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image-large">
     <p><strong>Calorias:</strong> ${recipe.calories} calorias</p>
    <p><strong>Ingredientes:</strong></p>
    <ul>
      ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>
    <button id="backButton">Voltar</button>
    `;

    grid.appendChild(detailsDiv);

    document.getElementById('backButton').addEventListener('click', () => {
      renderRecipes(recipes);
    })
  }

  function renderRecipes(filteredRecipes) {
    const grid = document.getElementById('recipeGrid');
    grid.innerHTML = '';
    filteredRecipes.forEach(recipe => {
      const card = createRecipeCard(recipe);
      grid.appendChild(card);
    });
  }

  function filterRecipes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active')).map(btn => btn.dataset.filter);

    const filteredRecipes = recipes.filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(searchTerm);
      const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm));
      const tagMatch = activeFilters.length === 0 || activeFilters.every(filter => recipe.tags.includes(filter));
      return (titleMatch || ingredientMatch) && tagMatch;
    });

    renderRecipes(filteredRecipes);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderRecipes(recipes);
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterRecipes);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.classList.toggle('active');
        filterRecipes();
      });
    });

    // Adicionar funcionalidade aos botões de curtir e salvar
    document.getElementById('recipeGrid').addEventListener('click', (e) => {
      if (e.target.classList.contains('like-btn')) {
        e.target.classList.toggle('active');
      } else if (e.target.classList.contains('save-btn')) {
        e.target.classList.toggle('active');
      }
    });
  });

  function loadMenu() {
  const menuContainer = document.getElementById('menu-container');

  // Certifique-se de que o contêiner existe
  if (menuContainer) {
      // Carrega o conteúdo do menu
      menuContainer.innerHTML = `
          <div class="menu-icon" onclick="toggleMenu()">
              <div></div>
              <div></div>
              <div></div>
          </div>
          <div id="mySidebar" class="sidebar">
              <a href="javascript:void(0)" class="closebtn" onclick="toggleMenu()">&times;</a>
              <a href="index.html">Início</a>
              <a href="videos-podcasts.html">Vídeos e Podcasts</a>
              <a href="receitas.html">Receitas Saudáveis</a>
          </div>
      `;

      // Define a função toggleMenu após carregar o menu
      window.toggleMenu = function() {
          const sidebar = document.getElementById("mySidebar");
          if (sidebar.style.width === "250px") {
              sidebar.style.width = "0";
          } else {
              sidebar.style.width = "250px";
          }
      };
  }
}

// Carrega o menu quando a página estiver pronta
document.addEventListener('DOMContentLoaded', loadMenu);