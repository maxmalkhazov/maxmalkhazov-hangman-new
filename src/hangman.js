class Hangman {
	constructor(word, remainingGuesses) {
		this.word = word.toLowerCase().split('');
		this.remainingGuesses = remainingGuesses;
		this.guessedLetters = [];
		this.status = 'playing';
	}
	getPuzzle() {
		let puzzle = '';
	
		this.word.forEach((letter) => {
			if (this.guessedLetters.includes(letter) || letter === ' ') {
				puzzle += letter;
			} else {
				puzzle += '*';
			}
		});	
		
		return puzzle;
	}
	makeGuess(guess) {
		guess = guess.toLowerCase();
		const isUnique = !this.guessedLetters.includes(guess);
		const isBadGuess = !this.word.includes(guess);
			
		if (this.status === 'playing') {
			if (isUnique) {
				this.guessedLetters.push(guess);
				// this.guessedLetters = [...this.guessedLetters, guess] = Using the spread syntax instead
			}	
			
			if (isUnique && isBadGuess) {
				this.remainingGuesses--;
			}	
			this.updateStatus(this.getPuzzle());
		}
	}
	updateStatus(puzzle) {
		if (this.remainingGuesses > 0 && puzzle.includes('*')) {
			this.status = 'playing';
		} else if (this.remainingGuesses > 0 && !puzzle.includes('*')) {
			this.status = 'finished';
		} else if (this.remainingGuesses === 0) {
			this.status = 'failed'
		}
	}
	statusMessage(score) {
		if (this.status === 'playing') {
			return `Guesses left: ${this.remainingGuesses}`;
		} else if (this.status === 'failed') {
			return `Nice try... The word was "${this.word.join('').toUpperCase()}"`;
		} else if (this.status === 'finished') {
			return `Great work! You guessed the word!`;
		}
	}
}

export { Hangman as default };