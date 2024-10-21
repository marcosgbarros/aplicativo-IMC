const content = [
    {
      id: 1,
      title: "Técnicas de Respiração para Meditação",
      type: "video",
      thumbnail: "https://source.unsplash.com/random/800x600?meditation",
      description: "Aprenda técnicas simples de respiração para melhorar sua prática de meditação.",
      tags: ["bem-estar", "meditação"]
    },
    {
      id: 2,
      title: "Alimentação Pré e Pós-Treino",
      type: "podcast",
      thumbnail: "https://source.unsplash.com/random/800x600?healthy+food",
      description: "Descubra o que comer antes e depois dos exercícios para maximizar seus resultados.",
      tags: ["nutricao", "exercicios"]
    },
    {
      id: 3,
      title: "Treino HIIT para Iniciantes",
      type: "video",
      thumbnail: "https://source.unsplash.com/random/800x600?hiit",
      description: "Um treino de alta intensidade adaptado para quem está começando a se exercitar.",
      tags: ["exercicios", "bem-estar"]
    },
    {
      id: 4,
      title: "Mindfulness no Dia a Dia",
      type: "podcast",
      thumbnail: "https://source.unsplash.com/random/800x600?mindfulness",
      description: "Como incorporar práticas de atenção plena na sua rotina diária.",
      tags: ["bem-estar"]
    },
    {
      id: 5,
      title: "Alongamentos para Aliviar Dores nas Costas",
      type: "video",
      thumbnail: "https://source.unsplash.com/random/800x600?stretching",
      description: "Sequência de alongamentos para quem passa muito tempo sentado.",
      tags: ["exercicios", "bem-estar"]
    },
    {
      id: 6,
      title: "Mitos e Verdades sobre Dietas",
      type: "podcast",
      thumbnail: "https://source.unsplash.com/random/800x600?diet",
      description: "Especialistas discutem os mitos mais comuns sobre alimentação e dietas.",
      tags: ["nutricao"]
    },
    {
      id: 7,
      title: "Yoga para Relaxamento",
      type: "video",
      thumbnail: "https://source.unsplash.com/random/800x600?yoga",
      description: "Uma prática suave de yoga para reduzir o estresse e melhorar o sono.",
      tags: ["exercicios", "bem-estar"]
    },
    {
      id: 8,
      title: "Cuidados com a Saúde Mental",
      type: "podcast",
      thumbnail: "https://source.unsplash.com/random/800x600?mental+health",
      description: "Conversa sobre a importância da saúde mental e dicas para cuidar da sua.",
      tags: ["bem-estar"]
    }
  ];

  function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" class="content-thumbnail">
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
    const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active')).map(btn => btn.dataset.filter);

    const filteredContent = content.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
      const tagMatch = activeFilters.length === 0 || activeFilters.some(filter => item.tags.includes(filter) || item.type === filter);
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


  });