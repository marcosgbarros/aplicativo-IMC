const recipes = [
  {
    id: 1,
    title: "Salada de Quinoa com Legumes",
    image: "https://images.unsplash.com/photo-1605478580693-671feda52c8d",
    calories: 280,
    tags: ["vegana", "vegetariana", "sem-lactose", "sem-gluten"],
    ingredients: ["quinoa", "tomate", "pepino", "cenoura", "azeite"]
  },
  {
    id: 2,
    title: "Smoothie Verde Energético",
    image: "https://images.unsplash.com/photo-1572441710472-68619936ebcd",
    calories: 150,
    tags: ["vegana", "sem-lactose", "sem-gluten", "sem-açúcar"],
    ingredients: ["espinafre", "banana", "maçã", "chia", "água de coco"]
  },
  {
    id: 3,
    title: "Omelete de Claras com Espinafre",
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022",
    calories: 200,
    tags: ["sem-gluten", "rico em proteínas"],
    ingredients: ["claras de ovo", "espinafre", "tomate", "cebola", "azeite"]
  },
  {
    id: 4,
    title: "Bowl de Açaí com Frutas",
    image: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb",
    calories: 320,
    tags: ["vegana", "vegetariana", "sem-gluten", "sem-lactose"],
    ingredients: ["açaí", "banana", "morango", "granola sem glúten", "mel"]
  },
  {
    id: 5,
    title: "Salmão Grelhado com Aspargos",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    calories: 380,
    tags: ["sem-gluten", "sem-lactose", "rico em proteínas"],
    ingredients: ["salmão", "aspargos", "limão", "azeite", "ervas"]
  },
  {
    id: 6,
    title: "Creme de Abacate com Limão",
    image: "https://images.unsplash.com/photo-1567303312323-7ddb6b62d4d6",
    calories: 220,
    tags: ["vegana", "vegetariana", "sem-lactose", "sem-gluten"],
    ingredients: ["abacate", "limão", "mel", "chia"]
  },
  {
    id: 7,
    title: "Panqueca de Aveia e Banana",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
    calories: 300,
    tags: ["vegetariana", "sem-gluten"],
    ingredients: ["banana", "aveia", "ovo", "canela"]
  },
  {
    id: 8,
    title: "Sopa de Abóbora com Gengibre",
    image: "https://images.unsplash.com/photo-1576685064005-4e23ece2e4d3",
    calories: 180,
    tags: ["vegana", "sem-lactose", "sem-gluten"],
    ingredients: ["abóbora", "gengibre", "alho", "azeite"]
  },
  {
    id: 9,
    title: "Wrap Integral de Frango e Vegetais",
    image: "https://images.unsplash.com/photo-1598878721197-00d5f95f06b2",
    calories: 320,
    tags: ["rico em proteínas", "sem-lactose"],
    ingredients: ["wrap integral", "frango", "alface", "tomate", "molho pesto"]
  },
  {
    id: 10,
    title: "Iogurte Natural com Frutas Vermelhas",
    image: "https://images.unsplash.com/photo-1598515219353-d3e61b092b2e",
    calories: 180,
    tags: ["vegetariana", "sem-gluten"],
    ingredients: ["iogurte natural", "morango", "amora", "mel"]
  },
  {
    id: 11,
    title: "Chips de Batata Doce Assados",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
    calories: 150,
    tags: ["vegana", "vegetariana", "sem-gluten", "sem-lactose"],
    ingredients: ["batata doce", "azeite", "sal", "páprica"]
  },
  {
    id: 12,
    title: "Ceviche de Tilápia com Manga",
    image: "https://images.unsplash.com/photo-1607451699541-7d6ec26415f2",
    calories: 250,
    tags: ["sem-lactose", "sem-gluten"],
    ingredients: ["tilápia", "manga", "limão", "cebola roxa", "coentro"]
  },
  {
    id: 13,
    title: "Granola Caseira com Oleaginosas",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    calories: 350,
    tags: ["vegana", "sem-gluten"],
    ingredients: ["aveia", "castanha", "amêndoas", "mel"]
  },
  {
    id: 14,
    title: "Shake de Proteína com Cacau",
    image: "https://images.unsplash.com/photo-1559561853-6e705f2aef7e",
    calories: 200,
    tags: ["sem-gluten", "rico em proteínas"],
    ingredients: ["proteína em pó", "leite vegetal", "cacau", "gelo"]
  },
  {
    id: 15,
    title: "Salada Caprese com Pesto",
    image: "https://images.unsplash.com/photo-1514516878459-9f579a8a3c08",
    calories: 250,
    tags: ["vegetariana", "sem-gluten"],
    ingredients: ["tomate", "muçarela de búfala", "manjericão", "azeite", "pesto"]
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
    document.querySelector('.search-filter-container').style.display = 'none';
    document.getElementById('mainTitle').style.display = 'none';
    
    const grid = document.getElementById('recipeGrid');
    grid.innerHTML = '';

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'recipe-details';
    detailsDiv.innerHTML = `
    <span class="content-container">
      <h1 class="recipe-title">${recipe.title}</h1>
        <div class="recipe-content">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image-large">
          <div class="recipe-info-container">
            <p><strong>Calorias:</strong> ${recipe.calories} calorias</p>
            <p><strong>Ingredientes:</strong></p>
            <ul>
              ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
          </div>
        </div>
    </span>
    <button id="backButton">Voltar</button>
    `;

    grid.appendChild(detailsDiv);

    document.getElementById('backButton').addEventListener('click', () => {
      document.querySelector('.search-filter-container').style.display = 'block';
    renderRecipes(recipes);
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
