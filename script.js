function profile() {
    window.location.href = 'catalogo/catalogo.html';
}

function selectProfile(name, imageSrc) {
    localStorage.setItem('perfilAtivoNome', name);
    localStorage.setItem('perfilAtivoImagem', '../' + imageSrc);
    window.location.href = 'catalogo/catalogo.html';
}

const themeKey = 'showflixTheme';
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
    document.body.classList.toggle('light-mode', theme === 'light');
    document.body.classList.toggle('dark-mode', theme === 'dark');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
        themeToggle.setAttribute('aria-label', `Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`);
    }
    localStorage.setItem(themeKey, theme);
}

function toggleTheme() {
    const current = localStorage.getItem(themeKey) || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem(themeKey);
    const initial = saved === 'light' || saved === 'dark' ? saved : 'dark';
    setTheme(initial);

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
