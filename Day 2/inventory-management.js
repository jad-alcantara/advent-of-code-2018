const processInventory = (event) => {
	const file = event.target.files.item(0);
	const reader = new FileReader();

	reader.onload = () => {
		const boxes = reader.result.split('\n');
		boxes.sort();
		console.log(boxes);

		//Part One
		const checksum = makeChecksum(boxes);
		document.getElementById('checksum').innerText = `Checksum is : ${checksum}`;

		//Part Two
		const commonLetters = checkCommonLetters(boxes);
		document.getElementById('common').innerText = `The common letters are : ${commonLetters}`;

	};

	reader.readAsText(file);
};

const makeChecksum = boxes => {
	let twoCount = 0, threeCount = 0;


	boxes.forEach(box => {

		let letters = {};
		const characters = box.split('');

		characters.forEach(character => {
			if(!letters[character]){
				letters[character] = 1;
			} else {
				letters[character]++;
			}
		});

		let twoFlag = false, threeFlag = false;

		Object.keys(letters).forEach(key => {
			if(letters[key] === 2) twoFlag = true;
			if(letters[key] === 3) threeFlag = true;
		});

		if(twoFlag) twoCount++;
		if(threeFlag) threeCount++;

	});


	console.log(`Twos : ${twoCount} , Threes : ${threeCount}`);
	return twoCount * threeCount;
};

const checkCommonLetters = boxes => {
	const collectionLength = boxes.length;
	const copy = boxes.slice();

	for(let box = 0; box < collectionLength-1; box++) {
		for(let comp = box+1; comp < collectionLength-1; comp++) {


			const charsInABox = copy[box].split('');
			const boxToCompare = copy[comp].split('');
			let diffs = 0, diffIndex = 0, pos = 0;


			while(pos !== boxToCompare.length && diffs < 2) {
				if(!(charsInABox[pos] === boxToCompare[pos])){
					diffIndex = pos;
					diffs++;
				}
				pos++;
			}


			if(diffs === 1) {
				const ID = copy[box].split('');
				ID.splice(diffIndex, 1);
				return ID.join('');
			}


		}
	}
};