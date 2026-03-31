import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';
import { createBanner } from './components/Banner.js'; // Importe o novo componente

const themeKey = 'showflixTheme';

function setTheme(theme) {
    document.body.classList.toggle('light-mode', theme === 'light');
    document.body.classList.toggle('dark-mode', theme === 'dark');
}

function toggleTheme() {
    const current = localStorage.getItem(themeKey) || 'dark';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(themeKey, newTheme);
    const themeToggle = document.getElementById('theme-toggle-catalogo');
    if (themeToggle) {
        themeToggle.textContent = newTheme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem(themeKey);
    const initial = saved === 'light' || saved === 'dark' ? saved : 'dark';
    setTheme(initial);

    const themeToggle = document.getElementById('theme-toggle-catalogo');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        themeToggle.textContent = initial === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro';
    }

    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    const container = document.getElementById('main-content');
    
    
    if (container) {
        // 1. Escolhe um filme aleatório para o Banner
        // Pegamos a primeira categoria e um item aleatório dela
        const allMovies = categories[0].items;
        const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];

        // 2. Cria e adiciona o Banner no topo
        const banner = createBanner(randomMovie);
        container.appendChild(banner);

        // 3. Renderiza as categorias normais abaixo
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }    
});