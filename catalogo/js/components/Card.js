import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

export function createCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    if (item.progress) {
        card.classList.add('has-progress');
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Movie cover`;

    const iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; encrypted-media";

    const videoId = getYouTubeId(item.youtube);

    card.appendChild(iframe);
    card.appendChild(img);

    const ageBadge = getRandomAgeBadge();

    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    card.appendChild(details);


    // 1. Lógica para Abrir o YouTube ao clicar no card
    card.addEventListener('click', (e) => {
        // Evita abrir o vídeo se o usuário clicar nos botões de controle
        if (e.target.closest('.btn-icon')) return; 
        window.open(item.youtube, '_blank');
    });

    // 2. Lógica para "Minha Lista"
    const btnMinhaLista = card.querySelector('.fa-plus')?.parentElement || card.querySelector('.fa-check')?.parentElement;

    if (btnMinhaLista) {
        btnMinhaLista.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique no botão abra o YouTube
            
            let minhaLista = JSON.parse(localStorage.getItem('minhaLista')) || [];
            const index = minhaLista.findIndex(i => i.img === item.img);

            if (index > -1) {
                // Se já existe, remove (Toggle)
                minhaLista.splice(index, 1);
                btnMinhaLista.innerHTML = '<i class="fas fa-plus"></i>';
            } else {
                // Se não existe, adiciona
                minhaLista.push(item);
                btnMinhaLista.innerHTML = '<i class="fas fa-check"></i>';
            }

            localStorage.setItem('minhaLista', JSON.stringify(minhaLista));
            
            // Opcional: Recarregar a página para atualizar a fileira "Minha Lista"
            // window.location.reload(); 
        });
    }


    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    let playTimeout;
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        playTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = "";
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    return card;
}