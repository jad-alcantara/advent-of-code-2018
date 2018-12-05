// Sorry to anyone who's trying to understand this code orz
// Bad night tonight.

const figureOutGuards = (event) => {
	const file = event.target.files.item(0);
	const reader = new FileReader();

	reader.onload = () => {
		const recordsRaw = reader.result.split('\n');
		recordsRaw.sort();
		//console.log(recordsRaw);
		const [guardMap, guardList] = initRecords(recordsRaw);
		const sleepiestGuard = findSleepiestGuard(recordsRaw, guardMap);
		const IDTimesMinute = parseInt(sleepiestGuard.slice(1, sleepiestGuard.length)) * findMostFrequentMinute(recordsRaw, sleepiestGuard);
		document.getElementById('partOne').innerText = `Guard ID x Time : ${IDTimesMinute}`;

		const IDTimesFrequent = findMostFrequentSleeper(recordsRaw, guardList);
		document.getElementById(('partTwo')).innerText = `Guard ID x Most Frequent Minute : ${IDTimesFrequent}`;

	};

	reader.readAsText(file);
};

const initRecords = raw => {

	const set = new Set();
	raw.forEach(record => {
		if(record.includes('Guard')) {
			const words = record.split(' ');
			set.add(words[3]);
		}
	});


	const sorted = Array.from(set).sort();

	const mapOfGuards = new Map();
	sorted.forEach(guard => {
		mapOfGuards.set(guard, 0);
	});

	return [mapOfGuards, set];
};

const findSleepiestGuard = (raw, mapOfGuards) => {
	const guardMap = new Map(mapOfGuards);

	let currentGuard = "",
			sleepMark = 0,
			wakeMark = 0,
			sleepiestGuard = "",
			mostSlept = 0;

	raw.forEach(record => {
		if(record.includes('Guard')) {
			currentGuard = record.split(' ')[3];
		} else if(record.includes('falls asleep')) {
			sleepMark = record.split(' ')[1].slice(0, -1).split(':')[1];
		} else if(record.includes('wakes up')) {
			wakeMark = record.split(' ')[1].slice(0, -1).split(':')[1];
			const minutesSlept = wakeMark - sleepMark;
			let totalMinutesSlept = guardMap.get(currentGuard);
			totalMinutesSlept += minutesSlept;
			guardMap.set(currentGuard, totalMinutesSlept);

			if(totalMinutesSlept > mostSlept) {
				mostSlept = totalMinutesSlept;
				sleepiestGuard = currentGuard;
			}

			sleepMark = 0;
			wakeMark = 0;
		}

	});

	return sleepiestGuard;

};

const findMostFrequentMinute = (raw, guard) => {
	let minutes = new Array(60),
			read = false,
			sleepMark = 0,
			wakeMark = 0,
			maxMinute = 0;
	raw.forEach(record => {
		if(record.includes(guard)) {
			read = true;
		} else if(record.includes('Guard') && !record.includes(guard)) read = false;

		if(read) {
			if(record.includes('falls asleep')) {
				sleepMark = parseInt(record.split(' ')[1].slice(0, -1).split(':')[1]);
			} else if(record.includes('wakes up')) {
				wakeMark = parseInt(record.split(' ')[1].slice(0, -1).split(':')[1]);

				for(let minute = sleepMark; minute < wakeMark; minute++) {
					if(!minutes[minute]){
						minutes[minute] = 1;
					} else {
						minutes[minute]++;
						if(minutes[minute] > maxMinute) maxMinute = minutes[minute];
					}
				}

				sleepMark = 0;
				wakeMark = 0;
			}
		}
	});

	let lasMaxMinute = 0;
	for(let i = 0; i < minutes.length; i++) {
		console.log(`For minute ${i} : ${minutes[i]}`);
		if(minutes[i] === maxMinute) {
			lasMaxMinute = i;
		}
	}
	return lasMaxMinute;
};

const findMostFrequentSleeper = (raw, guardList) => {
	const minutesMap = new Map();
	const listCopy = Array.from(guardList);

	listCopy.forEach(guard => {
		minutesMap.set(guard, new Array(60));
	});

	let currentGuard = "",
			sleepMark = 0,
			wakeMark = 0,
			winningMinute = 0,
			winningGuard = "";
	raw.forEach(record => {
		if(record.includes('Guard')) {
			currentGuard = record.split(' ')[3];
			console.log(`Current Guard: ${currentGuard}`);
		} else if(record.includes('falls asleep')) {
			sleepMark = parseInt(record.split(' ')[1].slice(0, -1).split(':')[1]);
		} else if(record.includes('wakes up')) {
			wakeMark = parseInt(record.split(' ')[1].slice(0, -1).split(':')[1]);

			for(let minute = sleepMark; minute < wakeMark; minute++) {
				if(!minutesMap.get(currentGuard)[minute]){
					minutesMap.get(currentGuard)[minute] = 1;
				} else {
					minutesMap.get(currentGuard)[minute]++;
				}
			}
		}
	});

	let score = 0;
	for(let i = 0; i < listCopy.length; i++) {
		for(let j = 0; j < 60; j++) {
			const minute = minutesMap.get(listCopy[i])[j];
			if(minute > score) {
				winningGuard = listCopy[i];
				winningMinute = j;
				score = minute;
			}
		}
	}

	return parseInt(winningGuard.slice(1, winningGuard.length)) * winningMinute;
};