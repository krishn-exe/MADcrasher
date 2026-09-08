// Load references to the HTML elements

const playerNameInput = document.getElementById('player-name');
const startButton = document.getElementById('start-game-btn');
const highScoreTable = document.getElementById('high-score-list');

class Player {
	constructor(name) {
		this.name = name;
		this.highscore = 0;
	}
}

//Temporary placeholder data

localStorage.setItem('players', JSON.stringify([
	{ name: 'James bond', highscore: 200 },
	{ name: 'John Wick', highscore: 300 },
	{ name: 'Ghost Rider', highscore: 250 },
]));

// High score table

let players = JSON.parse(localStorage.getItem('players')) || [];
players.sort((a, b) => b.highscore - a.highscore);
const topPlayers = players.slice(0, 5);

let i = 0;

highScoreTable.innerHTML = topPlayers.map((player) => `
	<tr>
		<td>${++i}</td>
		<td>${player.name}</td>
		<td>${player.highscore}</td>
	</tr>
`).join('');


//Store player name and score in local storage

startButton.addEventListener('click', () => {
	const name = playerNameInput.value.trim();

	let players = JSON.parse(localStorage.getItem('players')) || [];

	let player = players.find(player => player.name === name);

	if (!player) {
		player = new Player(name);
		players.push(player);
		localStorage.setItem('players', JSON.stringify(players));
	}
});