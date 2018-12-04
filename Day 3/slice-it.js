const processClaims = (event) => {
	const file = event.target.files.item(0);
	const reader = new FileReader();

	reader.onload = () => {
		const claims = reader.result.split('\n');

		//Part One
		const [partOneResult, partTwoResult] = solvePuzzles(claims);
		document.getElementById('partOne').innerText = `Total Squared Feet : ${partOneResult}`;
		document.getElementById('partTwo').innerText = `Untouched Claim ID : ${partTwoResult}`;

	};

	reader.readAsText(file);
};


const generateGrid = () => {
	const xSize = 1000, ySize = 1000,
				grid = new Array(xSize);

	for(let i = 0; i < grid.length; i++) {
		grid[i] = new Array(ySize);
	}

	for(let x = 0; x < grid.length; x++) {
		for(let y = 0; y < grid[x].length; y++) {
			grid[x][y] = '.';
		}
	}

	return grid;
};


const claimData = claim => {
	const [claimID,, start, size] = claim.split(' '),
				[startX, startY] = start.slice(0,start.length-1).split(','),
				[sizeX, sizeY] = size.split('x'),
				endX = parseInt(startX) + parseInt(sizeX),
				endY = parseInt(startY) + parseInt(sizeY);

	return [claimID, startX, startY, endX, endY];
};


const solvePuzzles = claims => {
	const grid = generateGrid();

	//Part One - Create Grid Mapping
	let squaredFeet = 0;
	claims.forEach(claim => {

		const [, startX, startY, endX, endY] = claimData(claim);

		for(let iterX = startX; iterX < endX; iterX++) {
			for(let iterY = startY; iterY < endY; iterY++) {

				if(grid[iterX][iterY]==='.') {
					grid[iterX][iterY] = '#';
				} else if(grid[iterX][iterY]==='#') {
					grid[iterX][iterY] = 'x';
					squaredFeet++;
				}
			}
		}
	});

	//Part Two - Use Grid Mapping
	let untouchedID = "";
	claims.forEach(claim => {

		const [claimID, startX, startY, endX, endY] = claimData(claim);

		let untouched = true;
		for(let iterX = startX; (iterX < endX) && untouched; iterX++) {
			for(let iterY = startY; (iterY < endY) && untouched; iterY++) {

				if(grid[iterX][iterY]==='x') {
					untouched = false;
				}

			}
		}

		if(untouched) untouchedID = claimID;

	});

	console.log(squaredFeet);
	console.log(untouchedID);
	return [squaredFeet, untouchedID];
};