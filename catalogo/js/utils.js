export function getYouTubeId(url) {
    if (!url) return "7RUA0IOfar8";
    if (url.includes('v=')) {
        return url.split('v=')[1].split('&')[0];
    }
    return url.split('/').pop();
}

export function getRandomMatchScore() {
    return Math.floor(Math.random() * 20 + 80);
}

export function getRandomDuration(hasProgress) {
    return hasProgress ? '2h ' + Math.floor(Math.random() * 59) + 'm' : '6 temporadas';
}

export function getRandomAgeBadge() {
    return Math.random() > 0.5 ? { text: 'A16', class: 'red-accent' } : { text: '16', class: '' };
}
