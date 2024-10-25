const content = [
  {
    id: 1,
    title: "Técnicas de Respiração para Meditação",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/pLWOTCnHbdU",
    description: "Aprenda técnicas simples de respiração para melhorar sua prática de meditação.",
    tags: ["bem-estar", "meditação"]
  },
      {
        id: 2,
        title: "Alimentação Pré e Pós-Treino",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/s9ZXxYgD7GU",
        description: "Descubra o que comer antes e depois dos exercícios para maximizar seus resultados.",
        tags: ["nutrição"]
      },
    
  {
    id: 3,
    title: "Treino HIIT para Iniciantes",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/mURRWpOldmo",
    description: "Um treino de alta intensidade adaptado para quem está começando a se exercitar.",
    tags: ["exercícios"]
  },
  {
    id: 3,
    title: "Hábitos, exercicios e emagrecimento",
    type: "Podcast",
    videoUrl: "https://www.youtube.com/embed/HmLN1OKQ3p0",
    description: "Desenvolva hábitos necessários para que mudanças duradouras aconteçam em sua vida. Neste podcast, recebemos Paulo Muzy e Roberta Carbonari Muzy",
    tags: ["exercícios", "bem-estar", "nutrição"]
  },
  {
    id: 3,
    title: "Neurocientista: O exercício altera os circuitos cerebrais",
    type: "Podcast",
    videoUrl: "https://www.youtube.com/embed/P42f-ukvJmw",
    description: "Eslen é psicólogo clínico, neurocientista, amante do esporte. Nesse podcast ele explica como nosso cérebro reage ao exercício fisico.",
    tags: ["exercicios", "bem-estar"]
  },
  {
    id: 3,
    title: "Exercícios para Emagrecer Rápido (EM CASA)",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/eO3-QPbXwD8",
    description: "Um treino de alta intensidade pra quem quer emagrecer rápido.",
    tags: ["exercicios"]
  }
];

function createContentCard(item) {
  const card = document.createElement('div');
  card.className = 'content-card';

  // Renderiza um iframe para vídeos ou uma imagem para outros tipos de conteúdo
  const media = item.type === 'video'
    ? `<iframe width="100%" height="315" 
         src="${item.videoUrl}" title="${item.title}" 
         frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowfullscreen></iframe>`
    : `<iframe width="100%" height="315" 
         src="${item.videoUrl}" title="${item.title}" 
         frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowfullscreen></iframe>`;

  card.innerHTML = `
    ${media}
    <div class="content-info">
      <h2 class="content-title">${item.title}</h2>
      <p class="content-description">${item.description}</p>
      <div class="content-tags">
        ${item.tags.map(tag => `<span class="content-tag">${tag}</span>`).join('')}
      </div>
    </div>
    <span class="content-type">${item.type === 'video' ? '🎥 Vídeo' : '🎙️ Podcast'}</span>
  `;
  
  return card;
}

function renderContent(filteredContent) {
  const grid = document.getElementById('contentGrid');
  grid.innerHTML = '';
  filteredContent.forEach(item => {
    const card = createContentCard(item);
    grid.appendChild(card);
  });
}

function filterContent() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
    .map(btn => btn.dataset.filter);

  const filteredContent = content.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
    const tagMatch = activeFilters.length === 0 || 
                     activeFilters.some(filter => item.tags.includes(filter) || item.type === filter);
    return (titleMatch || descriptionMatch) && tagMatch;
  });

  renderContent(filteredContent);
}

document.addEventListener('DOMContentLoaded', () => {
  renderContent(content);

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', filterContent);

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      filterContent();
    });
  });

  function loadMenu() {
    const menuContainer = document.getElementById('menu-container');

    if (menuContainer) {
      menuContainer.innerHTML = `
        <div class="menu-icon" onclick="toggleMenu()">
          <div></div><div></div><div></div>
        </div>
        <div id="mySidebar" class="sidebar">
          <a href="javascript:void(0)" class="closebtn" onclick="toggleMenu()">&times;</a>
          <a href="../pages/index.html">Início</a>
          <a href="../pages/videos-podcasts.html">Vídeos e Podcasts</a>
          <a href="../pages/receitas.html">Receitas Saudáveis</a>
        </div>
      `;

      window.toggleMenu = function() {
        const sidebar = document.getElementById("mySidebar");
        sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
      };
    }
  }

  loadMenu();
});
