import { getYouTubeId } from '../utils.js';

export function createBanner(featuredItem) {
    const banner = document.createElement('section');
    banner.className = 'hero-banner';
    
    // Pegamos o ID do vídeo para o botão "Assistir"
    const videoId = getYouTubeId(featuredItem.youtube);

    banner.innerHTML = `
        <div class="hero-overlay">
            <div class="hero-content">
                <img class="hero-logo" src="/assets/showflix-logo.png" alt="Logo da ShowFlix">
                <h1 class="hero-title">Destaque de Hoje</h1>
                <p class="hero-description">
                    Assista agora a este conteúdo exclusivo no ShowFlix. 
                    Prepare a pipoca e aproveite a melhor experiência cinematográfica.
                </p>
                <div class="hero-buttons">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="btn-hero play">
                        <i class="fas fa-play"></i> Assistir
                    </a>
                    <button class="btn-hero info">
                        <i class="fas fa-info-circle"></i> Mais Informações
                    </button>
                </div>
            </div>
        </div>
    `;

    // Estilo de fundo dinâmico usando a imagem do filme
    banner.style.backgroundImage = `url('${featuredItem.img}')`;
    
    return banner;
}