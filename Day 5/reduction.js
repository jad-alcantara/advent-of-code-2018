const reduceUnits = (event) => {
	const file = event.target.files.item(0);
	const reader = new FileReader();

	reader.onload = () => {
		const splitInput = reader.result.split('');
		const reducedString = doTheReducing(splitInput).reverse();
		document.getElementById('partOne').innerText = `Reduced String : ${reducedString.join('')} (${reducedString.join('').length})`;

		const [superReduced, removedCharacter] = filterFirst(splitInput);
		document.getElementById('partTwo').innerText = `Super Reduced String : ${superReduced} (${superReduced.length}) | Removed ${removedCharacter.toUpperCase()}`;

	};

	reader.readAsText(file);
};

const doTheReducing = raw => {
	const reducedString = [],
				copy = raw.slice();

	reducedString.push(copy.pop());
	while(copy[0]!==undefined) {
		const unit = copy.pop();
		let prev = 0;

		if(reducedString.length===0) {
			reducedString.push(unit);
		}else {

			prev = reducedString.pop();

			if(!match(unit, prev)){
				reducedString.push(prev);
				reducedString.push(unit);
			}

		}
	}
	return reducedString;
};

const filterFirst = raw => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''),
				copy = raw.slice();

	let winningString = '',
			winningLength = 10000,
			removedCharacter = '';
	alphabet.forEach(character => {
		const test = copy.filter(unit => !(unit.toLowerCase()===character));
		const newReduced = doTheReducing(test);

		if(newReduced.length < winningLength) {
			winningLength = newReduced.length;
			winningString = newReduced.reverse().join('');
			removedCharacter = character;
		}
	});

	return [winningString, removedCharacter];
};


const match = (unit, prev) => {
	switch(unit) {
		case 'a': return prev==='A';
		case 'A': return prev==='a';
		case 'b': return prev==='B';
		case 'B': return prev==='b';
		case 'c': return prev==='C';
		case 'C': return prev==='c';
		case 'd': return prev==='D';
		case 'D': return prev==='d';
		case 'e': return prev==='E';
		case 'E': return prev==='e';
		case 'f': return prev==='F';
		case 'F': return prev==='f';
		case 'g': return prev==='G';
		case 'G': return prev==='g';
		case 'h': return prev==='H';
		case 'H': return prev==='h';
		case 'i': return prev==='I';
		case 'I': return prev==='i';
		case 'j': return prev==='J';
		case 'J': return prev==='j';
		case 'k': return prev==='K';
		case 'K': return prev==='k';
		case 'l': return prev==='L';
		case 'L': return prev==='l';
		case 'm': return prev==='M';
		case 'M': return prev==='m';
		case 'n': return prev==='N';
		case 'N': return prev==='n';
		case 'o': return prev==='O';
		case 'O': return prev==='o';
		case 'p': return prev==='P';
		case 'P': return prev==='p';
		case 'q': return prev==='Q';
		case 'Q': return prev==='q';
		case 'r': return prev==='R';
		case 'R': return prev==='r';
		case 's': return prev==='S';
		case 'S': return prev==='s';
		case 't': return prev==='T';
		case 'T': return prev==='t';
		case 'u': return prev==='U';
		case 'U': return prev==='u';
		case 'v': return prev==='V';
		case 'V': return prev==='v';
		case 'w': return prev==='W';
		case 'W': return prev==='w';
		case 'x': return prev==='X';
		case 'X': return prev==='x';
		case 'y': return prev==='Y';
		case 'Y': return prev==='y';
		case 'z': return prev==='Z';
		case 'Z': return prev==='z';
	}
};