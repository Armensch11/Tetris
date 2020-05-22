function moveDown(currentCell = document.querySelector('[data-empty="no"]')) {
	let currentX = +currentCell.getAttribute('data-x');
	let currentY = +currentCell.closest('[data-y]').getAttribute('data-y');

	let nextUnder = document.querySelectorAll(`[data-y]`)[currentY].querySelector(`[data-x='${currentX}']`);
	if (nextUnder.getAttribute('data-empty') === 'yes') {
		nextUnder.style.backgroundColor = '#874da8';
		nextUnder.setAttribute('data-empty', 'no');
		currentCell.style.backgroundColor = null;
		currentCell.setAttribute('data-empty', 'yes');
	}
}
function moveLeft(currentCell = document.querySelector('[data-empty="no"]')) {
	if (!!currentCell.previousElementSibling) {
		let prevSibling = currentCell.previousElementSibling;

		prevSibling.style.backgroundColor = '#874da8';
		prevSibling.setAttribute('data-empty', 'no');
		currentCell.style.backgroundColor = null;
		currentCell.setAttribute('data-empty', 'yes');
	}
}
function moveRight(currentCell = document.querySelector('[data-empty="no"]')) {
	if (!!currentCell.nextElementSibling) {
		let nextSibling = currentCell.nextElementSibling;

		nextSibling.style.backgroundColor = '#874da8';
		nextSibling.setAttribute('data-empty', 'no');
		currentCell.style.backgroundColor = null;
		currentCell.setAttribute('data-empty', 'yes');
	}
}

function clearCells() {
	let cells = document.querySelectorAll('[data-empty="no"]');

	for (let cell of cells) {
		cell.style.backgroundColor = null;
		cell.setAttribute('data-empty', 'yes');
	}
}
var currentCell = document.querySelector('[data-empty="no"]');
let colConst;
let rowConst;
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
const startPos = document.getElementById('start-place');
let start = document.createElement('div');
start.setAttribute('id', 'start');
startPos.appendChild(start);
start = document.getElementById('start');
start.innerHTML = 'start';
start.addEventListener('click', () => entryPoint());
const stopPos = document.getElementById('stop-place');
let stop = document.createElement('div');
stop.setAttribute('id', 'stop');
stopPos.appendChild(stop);
stop = document.getElementById('stop');
stop.addEventListener('click', clearCells);
const left = document.createElement('div');
document.getElementById('move-buttons').appendChild(left);
left.classList.add('move');
left.setAttribute('id', 'left');
left.innerHTML = 'left';
left.addEventListener('click', () => moveLeft());
const down = document.createElement('div');
document.getElementById('move-buttons').appendChild(down);
down.classList.add('move');
down.setAttribute('id', 'down');
down.innerHTML = 'down';
down.addEventListener('click', () => moveDown());
const right = document.createElement('div');
document.getElementById('move-buttons').appendChild(right);
right.classList.add('move');
right.setAttribute('id', 'right');
right.innerHTML = 'right';
right.addEventListener('click', () => moveRight());

function entryPoint(randomCell = Math.floor(Math.random() * 5)) {
	let firstRow = document.querySelectorAll('[data-y]')[0];
	// console.log(firstRow);
	for (let cell of firstRow.childNodes) {
		cell.style.backgroundColor = null;
	}
	let randomCol = firstRow.childNodes[randomCell];
	randomCol.style.backgroundColor = '#874da8';
	randomCol.setAttribute('data-empty', 'no');
	return;
}
