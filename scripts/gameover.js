// Retrieve player name and score from query params or localStorage
const urlParams = new URLSearchParams(window.location.search);
const urlPlayer = urlParams.get('player-name');
const urlScore = urlParams.get('score');

const playerName = urlPlayer || localStorage.getItem('currentPlayer') || 'Player';
const score = (urlScore !== null && urlScore !== '')
    ? parseInt(urlScore, 10)
    : (parseInt(localStorage.getItem('lastScore'), 10) || 0);

// UI elements
const playerNameDisplay = document.getElementById('playerNameDisplay');
const finalScoreDisplay = document.getElementById('finalScoreDisplay');
const highScoreBanner = document.getElementById('highScoreBanner');
const highScoreList = document.getElementById('highScoreList');
const playAgainBtn = document.getElementById('playAgainBtn');
const mainMenuBtn = document.getElementById('mainMenuBtn');

// Set mission report stats
if (playerNameDisplay) playerNameDisplay.textContent = playerName;
if (finalScoreDisplay) finalScoreDisplay.textContent = score.toString();

// Initialize default high scores if not present
if (!localStorage.getItem('players')) {
    localStorage.setItem('players', JSON.stringify([
        { name: 'James bond', highscore: 200 },
        { name: 'John Wick', highscore: 184 },
        { name: 'Ghost Rider', highscore: 250 },
    ]));
}

let players = JSON.parse(localStorage.getItem('players')) || [];
let existingPlayer = players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
let isNewHighScore = false;

if (existingPlayer) {
    if (score > existingPlayer.highscore) {
        existingPlayer.highscore = score;
        isNewHighScore = true;
    }
} else {
    players.push({ name: playerName, highscore: score });
    if (score > 0) {
        isNewHighScore = true;
    }
}

localStorage.setItem('players', JSON.stringify(players));

if (isNewHighScore && score > 0 && highScoreBanner) {
    highScoreBanner.style.display = 'block';
}

// Populate Top 5 high scores table
players.sort((a, b) => b.highscore - a.highscore);
const topPlayers = players.slice(0, 5);

let rank = 0;
if (highScoreList) {
    highScoreList.innerHTML = topPlayers.map(p => {
        rank++;
        const isCurrentPlayer = (p.name.toLowerCase() === playerName.toLowerCase());
        return `
            <tr class="${isCurrentPlayer ? 'current-player-row' : ''}">
                <td>${rank}</td>
                <td>${p.name}${isCurrentPlayer ? ' ◀' : ''}</td>
                <td>${p.highscore}</td>
            </tr>
        `;
    }).join('');
}

// Button actions
if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
        window.location.href = `game.html?player-name=${encodeURIComponent(playerName)}`;
    });
}

if (mainMenuBtn) {
    mainMenuBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
