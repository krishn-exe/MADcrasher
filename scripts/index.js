const playerNameInput = document.getElementById('playerName');
const startButton = document.getElementById('startGameBtn');
const highScoreTable = document.getElementById('highScoreList');

class Player {
	constructor(name) {
		this.name = name;
		this.highscore = 0;
	}
}

if (!localStorage.getItem('players')) {
	localStorage.setItem('players', JSON.stringify([
		{ name: 'James bond', highscore: 200 },
		{ name: 'John Wick', highscore: 184 },
		{ name: 'Ghost Rider', highscore: 250 },
	]));
}

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