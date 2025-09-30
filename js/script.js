// Elementos DOM
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Toggle do menu de navegação em dispositivos móveis
menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
});

// Fechar menu quando clicar fora dele
document.addEventListener('click', function(event) {
    const isClickInsideMenu = navList.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuToggle && navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navList.classList.remove('active');
    });
});

// Implementação do modo escuro/claro
function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone do sol para modo escuro
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone da lua para modo claro
        localStorage.setItem('theme', 'light');
    }
}

// Toggle do tema
themeToggle.addEventListener('click', function() {
    const isDarkMode = body.classList.contains('dark-mode');
    setTheme(!isDarkMode);
});

// Verificar tema salvo no localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme(true);
    } else {
        setTheme(false);
    }
    
    // Animação suave de rolagem para os links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajuste para compensar o cabeçalho fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Criar placeholders para imagens
function createPlaceholderImages() {
    // Você pode substituir este código quando tiver imagens reais
    const images = [
        { selector: '.logo img', width: 200, height: 60, text: 'Logo' },
        { selector: '[src="./img/abertura-de-veiculos.jpg"]', width: 400, height: 300, text: 'Abertura de veiculos' },
        { selector: '[src="./img/carimbos.jpg"]', width: 400, height: 300, text: 'Carimbos' },
        { selector: '[src="./img/chaves-codificadas.jpg"]', width: 400, height: 300, text: 'Chaves Codificadas' },
        { selector: '[src="./img/chaves-gorja.jpg"]', width: 400, height: 300, text: 'Chaves Gorja' },
        { selector: '[src="./img/chaves-simples.jpg"]', width: 400, height: 300, text: 'Chaves Simples' },
        { selector: '[src="./img/chaves-tetra.jpg"]', width: 400, height: 300, text: 'Chaves Tetra' },
        { selector: '[src="./img/favicon.ico"]', width: 400, height: 300, text: 'Fav Icon' },
        { selector: '[src="./img/instalacao-de-fechadura.jpg"]', width: 400, height: 300, text: 'Instalacao de Fechadura' },
        { selector: '[src="./img/location.jpeg"]', width: 400, height: 300, text: 'Location' },
        { selector: '[src="./img/logo.png"]', width: 400, height: 300, text: 'Logo' },
        { selector: '[src="./img/olho-magico.jpg"]', width: 400, height: 300, text: 'Olho Magico' },
        { selector: '[src="./img/troca-de-segredo.jpg"]', width: 400, height: 300, text: 'Troca de Segredo' }
    ];

    images.forEach(img => {
        const elements = document.querySelectorAll(img.selector);
        elements.forEach(element => {
            // Verificar se a imagem existe, senão substituir por placeholder
            element.addEventListener('error', function() {
                const color = Math.floor(Math.random()*16777215).toString(16);
                this.src = `https://via.placeholder.com/${img.width}x${img.height}/${color}/FFFFFF?text=${img.text}`;
            });
        });
    });
}

// Executar criação de placeholders quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    createPlaceholderImages();
});