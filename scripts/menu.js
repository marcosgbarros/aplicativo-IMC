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
