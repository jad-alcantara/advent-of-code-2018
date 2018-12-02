const processFrequencies = (event) => {
	const file = event.target.files.item(0);
	const reader = new FileReader();

	reader.onload = () => {
		const frequencies = reader.result.split('\n');
		console.log(frequencies);

		//Part 1
		const result1 = partOne(frequencies);
		document.getElementById('result').innerText = `Resulting frequency is : ${result1}`;

		//Part 2
		const result2 = partTwo(frequencies);
		document.getElementById('duplicate').innerText = `First duplicate value is : ${result2}`;

	};

	reader.readAsText(file);
};

const partOne = frequencies => frequencies.reduce((item1, item2) => parseInt(item1) + parseInt(item2));

const partTwo = frequencies => {
	const uniques = new Set();
	let step = 1,
		  value = parseInt(frequencies[0]),
		  uniqueFound = false,
		  result = 0;

	uniques.add(0);
	while(!uniqueFound) {
		value += parseInt(frequencies[step]);
		if(uniques.has(value)) {
			uniqueFound = true;
			result = value;
		} else {
			uniques.add(value);
			if(step === frequencies.length-1) { step = 0; }
			else { step++; }
		}
	}

	return result;
};