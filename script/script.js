let colConst;
let rowConst;
const startPos = document.getElementById('start-place');
let start = document.createElement('div');
start.setAttribute('id', 'start');
startPos.appendChild(start);
start = document.getElementById('start');
start.addEventListener('click', () => oneDown());
const stopPos = document.getElementById('stop-place');
let stop = document.createElement('div');
stop.setAttribute('id', 'stop');
stopPos.appendChild(stop);
stop = document.getElementById('stop');
stop.addEventListener('click', clearCells);
const arena = document.getElementById('game-arena');
for (let i = 1; i <= 10; i++) {
	rowConst = document.createElement('div');
	rowConst.classList = 'arena-row';
	rowConst.setAttribute('data-y', i);
	rowConst.setAttribute('data-empty', 'yes');
	arena.appendChild(rowConst);
}
const rows = document.getElementsByClassName('arena-row');

for (let row of rows) {
	for (let i = 1; i <= 5; i++) {
		colConst = document.createElement('div');
		colConst.classList = 'arena-colum';
		colConst.setAttribute('data-x', i);
		colConst.setAttribute('data-empty', 'yes');
		row.appendChild(colConst);
	}
}
function entryPoint(randomCell = Math.floor(Math.random() * 11)) {
	document.querySelectorAll('[data-x]')[randomCell].style.backgroundColor = 'yellow';
	return;
}
// entryPoint(5);

function oneDown(delay = 1000) {
	let stepDown = document.querySelectorAll('[data-x="3"]');
	// stepDown = Array.from(stepDown).forEach((el) => (el.style.backgroundColor = 'yellow'));
	for (let cell of stepDown) {
		// cell.style.backgroundColor = 'yellow';

		setTimeout(() => {
			cell.style.backgroundColor = 'yellow';

			// cell.style.removeProperty('backgroundColor');
		}, delay);
		// console.log(cell.closest('[data-y]'));

		setTimeout(() => {
			if (cell.closest('[data-y]').getAttribute('data-y') === '10' || checkCellUnder(cell)) {
				cell.setAttribute('data-empty', 'no');
				return;
			}
			cell.style.backgroundColor = null;

			// cell.style.removeProperty('backgroundColor');
		}, 300 + delay);
		delay += 400;
	}
}
function checkCellUnder(cell) {
	let currentX = +cell.getAttribute('data-x');
	let currentY = +cell.closest('[data-y]').getAttribute('data-y');
	let nextUnder = document.querySelectorAll(`[data-y]`)[currentY].querySelector(`[data-x='${currentX}']`);
	if (nextUnder.getAttribute('data-empty') === 'no') {
		return true;
	}
}
function clearCells() {
	let cells = document.querySelectorAll('[data-empty="no"]');

	for (let cell of cells) {
		cell.style.backgroundColor = null;
		cell.setAttribute('data-empty', 'yes');
	}
}
//function to check nextCell under the current one;
// function checkCellUnder(cell) {
// 	let parent = cell.closest('[data-y]');
// 	let nextParent = parent.nextElementSibling;
// 	let xPosition = +cell.getAttribute('data-x');
// 	let child = nextParent.childNodes[xPosition - 1];
// 	// console.log(child.getAttribute('[]'))
// 	if (child.getAttribute('data-empty') === 'no') {
// 		return true;
// 	}
// 	return false;
// }
function leftRight() {}
// function oneDownFast() {
// 	let stepDown = document.querySelectorAll('[data-x="5"]');
// 	// stepDown = Array.from(stepDown).forEach((el) => (el.backgroundColor = 'yellow'));
// 	for (let cell of stepDown) {
// 		// cell.style.backgroundColor = 'yellow';

// 		setTimeout(() => {
// 			cell.style.backgroundColor = 'yellow';
// 			// cell.style.removeProperty('backgroundColor');
// 		}, delay * 400);
// 		delay++;
// 		setTimeout(() => {
// 			cell.style.backgroundColor = null;
// 			// cell.style.removeProperty('backgroundColor');
// 		}, delay * 404);
// 	}
// }
// function oneDownRocket() {
// 	let stepDown = document.querySelectorAll('[data-x="5"]');
// 	// stepDown = Array.from(stepDown).forEach((el) => (el.backgroundColor = 'yellow'));
// 	for (let cell of stepDown) {
// 		// cell.style.backgroundColor = 'yellow';

// 		setTimeout(() => {
// 			cell.style.backgroundColor = 'yellow';
// 			// cell.style.removeProperty('backgroundColor');
// 		}, delay * 100);
// 		delay++;
// 		setTimeout(() => {
// 			cell.style.backgroundColor = null;
// 			// cell.style.removeProperty('backgroundColor');
// 		}, delay * 100);
// 	}
// }
