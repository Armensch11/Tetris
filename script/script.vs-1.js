function moveDown(currentCell) {
	let currentX = +currentCell.getAttribute('data-x');
	let currentY = +currentCell.closest('[data-y]').getAttribute('data-y');
	let nextUnder = document.querySelectorAll(`[data-y]`)[currentY].querySelector(`[data-x='${currentX}']`);
	if (nextUnder.getAttribute('data-empty') === 'yes') {
		nextUnder.style.backgroundColor = 'red';
		nextUnder.setAttribute('data-empty', 'no');
	}
}
function moveLeft(currentCell) {}
function moveRight(currentCell) {}

function clearCells() {
	let cells = document.querySelectorAll('[data-empty="no"]');

	for (let cell of cells) {
		cell.style.backgroundColor = null;
		cell.setAttribute('data-empty', 'yes');
	}
}
let colConst;
let rowConst;
const startPos = document.getElementById('start-place');
let start = document.createElement('div');
start.setAttribute('id', 'start');
startPos.appendChild(start);
start = document.getElementById('start');
start.addEventListener('click', () => entryPoint());
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
function entryPoint(randomCell = Math.floor(Math.random() * 5)) {
	let firstRow = document.querySelectorAll('[data-y]')[0];
	// console.log(firstRow);
	for (let cell of firstRow.childNodes) {
		cell.style.backgroundColor = null;
	}
	let randomCol = firstRow.childNodes[randomCell];
	randomCol.style.backgroundColor = 'red';
	return;
}
