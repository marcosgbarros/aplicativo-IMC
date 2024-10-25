const recipes = [
  {
    id: 1,
    title: "Cuscuz Marroquino com Grão de Bico",
    image: "images/cuzcuz-marroquino.webp",
    calories: 320,
    tags: ["sem-carne", "vegana", "sem-lactose", "sem-açúcar"],
    ingredients: [
      "cuscuz marroquino",
      "grão de bico",
      "tomate",
      "cebola roxa",
      "hortelã",
    ],
    instructions: [
      "Cozinhe o cuscuz marroquino conforme as instruções da embalagem.",
      "Cozinhe o grão de bico até que esteja macio. Escorra e reserve.",
      "Pique o tomate e a cebola roxa em cubos pequenos.",
      "Misture o cuscuz cozido com o grão de bico, o tomate, a cebola roxa e as folhas de hortelã.",
      "Tempere com azeite, sal e pimenta a gosto. Sirva frio ou em temperatura ambiente.",
    ],
  },
  {
    id: 2,
    title: "Batata Doce Assada com Ervas",
    image: "images/batatadoce-assada.webp",
    calories: 250,
    tags: ["sem-carne", "vegana", "sem-lactose", "sem-glúten"],
    ingredients: ["batata doce", "alecrim", "azeite", "alho", "sal marinho"],
    instructions: [
      "Pré-aqueça o forno a 200°C.",
      "Lave bem as batatas doces e corte-as em fatias grossas ou em cubos.",
      "Misture as batatas com alecrim, azeite, alho picado e sal marinho em uma assadeira.",
      "Asse por 30 a 40 minutos ou até que estejam douradas e macias.",
      "Sirva quente.",
    ],
  },
  {
    id: 3,
    title: "Sopa de Lentilha com Espinafre",
    image: "images/sopa-lentilha.webp",
    calories: 180,
    tags: ["sem-carne", "vegana", "sem-lactose", "sem-glúten"],
    ingredients: [
      "lentilha",
      "espinafre",
      "cenoura",
      "cebola",
      "caldo de legumes",
    ],
    instructions: [
      "Refogue a cebola e a cenoura picadas com azeite em uma panela grande até ficarem macias.",
      "Adicione a lentilha lavada e o caldo de legumes.",
      "Cozinhe em fogo médio até que as lentilhas estejam macias, cerca de 25 a 30 minutos.",
      "Adicione o espinafre nos últimos 5 minutos de cozimento.",
      "Tempere com sal e pimenta a gosto e sirva quente.",
    ],
  },
  {
    id: 4,
    title: "Panqueca de Banana e Aveia",
    image: "images/panqueca-banana.webp",
    calories: 200,
    tags: ["sem-carne", "sem-lactose", "sem-açúcar"],
    ingredients: ["banana", "aveia", "ovo", "canela", "óleo de coco"],
    instructions: [
      "Bata a banana, os ovos, a aveia e a canela no liquidificador até obter uma mistura homogênea.",
      "Aqueça uma frigideira com um pouco de óleo de coco.",
      "Despeje pequenas porções da massa na frigideira e cozinhe até dourar dos dois lados.",
      "Sirva com frutas frescas ou mel.",
    ],
  },
  {
    id: 5,
    title: "Salada de Grão de Bico com Abacate",
    image: "images/salada-abacate.webp",
    calories: 270,
    tags: ["sem-carne", "vegana", "sem-lactose", "sem-glúten"],
    ingredients: ["grão de bico", "abacate", "pepino", "cebola roxa", "limão"],
    instructions: [
      "Cozinhe o grão de bico até que esteja macio e deixe esfriar.",
      "Pique o abacate, pepino e cebola roxa em cubos pequenos.",
      "Misture o grão de bico com o abacate, pepino e cebola roxa em uma tigela.",
      "Tempere com suco de limão, azeite, sal e pimenta a gosto.",
      "Sirva imediatamente.",
    ],
  },
  {
    id: 6,
    title: "Hambúrguer de Grão de Bico",
    image: "images/hamburguer-grao.webp",
    calories: 350,
    tags: ["sem-carne", "vegana", "sem-lactose", "sem-glúten"],
    ingredients: [
      "grão de bico",
      "alho",
      "salsa",
      "farinha de arroz",
      "pimenta do reino",
    ],
    instructions: [
      "Processe o grão de bico cozido, alho, salsa, farinha de arroz e pimenta do reino até formar uma massa.",
      "Molde a massa em formato de hambúrgueres.",
      "Aqueça uma frigideira com azeite e cozinhe os hambúrgueres por 4 a 5 minutos de cada lado.",
      "Sirva com pão integral ou como preferir.",
    ],
  },
  {
    id: 7,
    title: "Risoto de Cogumelos",
    image: "images/risoto-cogumelo.webp",
    calories: 300,
    tags: ["sem-carne", "sem-lactose", "sem-glúten"],
    ingredients: [
      "arroz arbóreo",
      "cogumelos",
      "cebola",
      "caldo de legumes",
      "azeite",
    ],
    instructions: [
      "Refogue a cebola picada com azeite até ficar transparente.",
      "Adicione o arroz arbóreo e cozinhe por 1 minuto.",
      "Acrescente os cogumelos fatiados e refogue por mais 2 minutos.",
      "Adicione caldo de legumes quente aos poucos, mexendo constantemente até o arroz estar cozido (cerca de 18 a 20 minutos).",
      "Tempere com sal e pimenta e finalize com um fio de azeite.",
    ],
  },
  {
    id: 8,
    title: "Torta de Maçã com Canela",
    image: "images/torta-maca.webp",
    calories: 400,
    tags: ["sem-lactose", "sem-glúten"],
    ingredients: [
      "maçãs",
      "farinha de arroz",
      "açúcar mascavo",
      "canela",
      "óleo de coco",
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C.",
      "Descasque e fatie as maçãs.",
      "Misture a farinha de arroz, açúcar mascavo e canela.",
      "Coloque as maçãs fatiadas em uma forma e despeje a mistura de farinha por cima.",
      "Regue com óleo de coco e asse por 30 a 40 minutos, até as maçãs estarem macias e douradas.",
      "Sirva quente ou em temperatura ambiente.",
    ],
  },
];

function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.className = "recipe-card";
  card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
      <div class="recipe-info">
        <h2 class="recipe-title">${recipe.title}</h2>
        <p class="recipe-calories">${recipe.calories} calorias</p>
        <div class="recipe-tags">
          ${recipe.tags
            .map((tag) => `<span class="recipe-tag">${tag}</span>`)
            .join("")}
        </div>
      </div>
    `;

  // evento de clique
  card.addEventListener("click", () => {
    window.location.href = `descricao-receita.html?id=${recipe.id}`;
  });
  return card;
}

// function showRecipeDetails(recipe) {
//   document.querySelector(".search-filter-container").style.display = "none";
//   title = document.getElementById("mainTitle");

//   const grid = document.getElementById("recipeGrid");
//   grid.innerHTML = "";

//   const detailsDiv = document.createElement("div");
//   detailsDiv.className = "recipe-details";
//   detailsDiv.innerHTML = `
//     <span class="content-container">
//       <h1 class="recipe-title">${recipe.title}</h1>
//         <div class="recipe-content">
//           <img src="${recipe.image}" alt="${
//     recipe.title
//   }" class="recipe-image-large">
//           <div class="recipe-info-container">
//             <p><strong>Calorias:</strong> ${recipe.calories} calorias</p>
//             <p><strong>Ingredientes:</strong></p>
//             <ul>
//               ${recipe.ingredients
//                 .map((ingredient) => `<li>${ingredient}</li>`)
//                 .join("")}
//             </ul>
//           </div>
//         </div>
//     </span>
//     <button id="backButton">Voltar</button>
//     `;

//   grid.appendChild(detailsDiv);

//   document.getElementById("backButton").addEventListener("click", () => {
//     document.querySelector(".search-filter-container").style.display = "block";
//     renderRecipes(recipes);
//     renderRecipes(recipes);
//   });
// }

function renderRecipes(filteredRecipes) {
  const grid = document.getElementById("recipeGrid");
  grid.innerHTML = "";
  filteredRecipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    grid.appendChild(card);
  });
}

function filterRecipes() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const activeFilters = Array.from(
    document.querySelectorAll(".filter-btn.active")
  ).map((btn) => btn.dataset.filter);

  const filteredRecipes = recipes.filter((recipe) => {
    const titleMatch = recipe.title.toLowerCase().includes(searchTerm);
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm)
    );
    const tagMatch =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => recipe.tags.includes(filter));
    return (titleMatch || ingredientMatch) && tagMatch;
  });

  renderRecipes(filteredRecipes);
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecipes(recipes);

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", filterRecipes);

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      filterRecipes();
    });
  });

  // Adicionar funcionalidade aos botões de curtir e salvar
  document.getElementById("recipeGrid").addEventListener("click", (e) => {
    if (e.target.classList.contains("like-btn")) {
      e.target.classList.toggle("active");
    } else if (e.target.classList.contains("save-btn")) {
      e.target.classList.toggle("active");
    }
  });
});

function loadMenu() {
  const menuContainer = document.getElementById("menu-container");

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
    window.toggleMenu = function () {
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
document.addEventListener("DOMContentLoaded", loadMenu);
