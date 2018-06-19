import Hangman from './hangman';
import getPuzzle from './requests';

const puzzleElement = document.querySelector("#puzzle");
const guessesElement = document.querySelector("#guesses");
const levelEasy = document.querySelector("#easy");
const levelHard = document.querySelector("#hard");
const countries = document.querySelector('#countries');
const capitals = document.querySelector('#capitals');
const flagImage = document.querySelector('#flag');
const hangmanImage = document.querySelector('#hangman-image');
let instance1;

// Choose countries game
countries.addEventListener('click', () => {
	countries.classList.add('selected');
	capitals.classList.remove('selected');
	startGame();
});

// Choose capitals game
capitals.addEventListener('click', () => {
	countries.classList.remove('selected');
	capitals.classList.add('selected');
	startGame();
});

// Easy level
levelEasy.addEventListener('click', () => {
	levelEasy.classList.add('selected');
	levelHard.classList.remove('selected');
	startGame();
});

// Hard level
levelHard.addEventListener('click', () => {
	levelEasy.classList.remove('selected');
	levelHard.classList.add('selected');
	startGame();
});

// On keypress
window.addEventListener('keypress', (e) => {
	const guess = String.fromCharCode(e.charCode);
	instance1.makeGuess(guess);
	render();
	imageHandler();
});

// Render the elements
const render = () => {
	puzzleElement.innerHTML = '';
	guessesElement.textContent = instance1.statusMessage();
	
	const word = instance1.getPuzzle().split('');
	word.forEach((letter) => {
		const span = document.createElement('span');
		span.textContent = letter;
		span.setAttribute('class', 'letter');
		puzzleElement.appendChild(span);
	});
	
	// if (guessesElement.textContent.includes('Great')) {
	// 	puzzleElement.childNodes.forEach((child) => {
	// 		child.setAttribute('class', 'letter win');
	// 		flagImage.style.display = 'block';
	// 	});
	// } else if (guessesElement.textContent.includes('Nice')) {
	// 	puzzleElement.childNodes.forEach((child) => {
	// 		child.classList.remove('selected');
	// 		child.setAttribute('class', 'letter lose');
	// 	});
	// }
	
	puzzleElement.childNodes.forEach((child) => {
		if (child.textContent !== '*' && guessesElement.textContent.includes('Great') === false && guessesElement.textContent.includes('Nice') === false) {
			child.setAttribute('class', 'letter selected');
		} else if (guessesElement.textContent.includes('Great')) {
			child.setAttribute('class', 'letter win');
			flagImage.style.display = 'block';
		} else if (guessesElement.textContent.includes('Nice')) {
			child.setAttribute('class', 'letter lose');
		}
	});
}

// Handle hangman image on wrong guesses
const imageHandler = () => {
	if (guessesElement.textContent.includes('4')) {
		hangmanImage.setAttribute('src', './images/hang1.gif');
		hangmanImage.classList.add('hangman-image');
		hangmanImage.style.display = 'block';
	} else if (guessesElement.textContent.includes('3')) {
		hangmanImage.setAttribute('src', './images/hang2.gif');
		hangmanImage.classList.add('hangman-image');
		hangmanImage.style.display = 'block';
	} else if (guessesElement.textContent.includes('2')) {
		hangmanImage.setAttribute('src', './images/hang3.gif');
		hangmanImage.classList.add('hangman-image');
		hangmanImage.style.display = 'block';
	} else if (guessesElement.textContent.includes('1')) {
		hangmanImage.setAttribute('src', './images/hang4.gif');
		hangmanImage.classList.add('hangman-image');
		hangmanImage.style.display = 'block';
	} else if (guessesElement.textContent.includes('Nice try')) {
		hangmanImage.setAttribute('src', './images/hang5.gif');
		hangmanImage.classList.add('hangman-image');
		hangmanImage.style.display = 'block';
	} else if (guessesElement.textContent.includes('Great')) {
		hangmanImage.style.display = 'none';
	}
}


// Start game
const startGame = async () => {
	let game;
	let level;
	let guesses;
	
	// Select which level to pass
	if (levelEasy.classList.contains('selected')) {
		level = 1;
		// guesses = 5;
	} else {
		level = 2;
		// guesses = 3;
	}
	
	// Select which game to pass
	if (countries.classList.contains('selected')) {
		game = 'countries';
	} else {
		game = 'capitals';
	}
	
	const puzzle = await getPuzzle(level, game);
	flagImage.setAttribute('src', puzzle.flag);
	hangmanImage.style.display = 'none'
	flagImage.style.display = 'none';
	instance1 = new Hangman(puzzle.name, 5);
	console.log(puzzle.name);
	render();
}

// Reset button -> start game
document.querySelector('#reset').addEventListener('click', () => {
	startGame();
});

startGame();
