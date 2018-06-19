// Call for random words

// const getPuzzle = async (wordCount) => {
// 	const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
// 	if (response.status === 200) {
// 		const data = await response.json();
// 		return data.puzzle
// 	} else {
// 		throw new Error('Unable to fetch puzzle');
// 	}
// }

// Call for countries/capitals
const getPuzzle = async (difficulty, gameOption) => {
	let level = difficulty;
	if (difficulty === 1) {
		level = 'region/europe'
	} else if (difficulty === 2) {
		level = 'all'
	}
	const newArr = [];
	const response = await fetch(`https://restcountries.eu/rest/v2/${level}`);
	if (response.status === 200) {
		const data = await response.json();
		data.forEach((country) => {
			if (country.name.length > 0 && country.name.length <= 12 && country.capital.length > 0 && country.capital.length <= 12) {
				newArr.push({
					name: country.name,
					capital: country.capital,
					flag: country.flag
				})
			}
		});
		const random =  await Math.floor(Math.random() * newArr.length);
		const selectedCountry = newArr[random];
		const selectedCountryName = selectedCountry.name
		const selectedCountryFlag = selectedCountry.flag;
		const selectedCapital = newArr[random];
		const selectedCapitalName = selectedCapital.capital;
		const selectedCapitalFlag = selectedCapital.flag;
		if (gameOption === 'countries') {
			return {
				name: selectedCountryName,
				flag: selectedCountryFlag
			}
		} else {
			return {
				name: selectedCapitalName,
				flag: selectedCapitalFlag
			}
		}
	} else {
		throw new Error('Unable to fetch puzzle');
	}
}

export { getPuzzle as default };
