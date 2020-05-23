function entryPoint(randomCell = Math.floor(Math.random() * 5)) {
	let firstRow = document.querySelectorAll('[data-y]')[0];
	// console.log(firstRow);
	for (let cell of firstRow.childNodes) {
		cell.style.backgroundColor = null;
	}
	let randomCol = firstRow.childNodes[randomCell];
	randomCol.style.backgroundColor = '#874da8';
	randomCol.setAttribute('data-empty', 'no');
	currentCell = randomCol;
	console.log(currentCell);
}
function moveDown(currentCell = document.querySelector('[data-empty="no"]')) {
	let nextUnder;
	if (currentCell) {
		// console.log(currentCell);
		currentX = +currentCell.getAttribute('data-x');
		let currentY = +currentCell.closest('[data-y]').getAttribute('data-y');

		nextUnder = document.querySelector(`[data-y="${currentY + 1}"]`).querySelector(`[data-x='${currentX}']`);

		console.log(nextUnder);
		if (nextUnder.getAttribute('data-empty') === 'yes') {
			nextUnder.style.backgroundColor = '#874da8';
			nextUnder.setAttribute('data-empty', 'no');
			currentCell.style.backgroundColor = null;
			currentCell.setAttribute('data-empty', 'yes');
		}
	}
}
function moveLeft(currentCell = document.querySelector('[data-empty="no"]')) {
	if (currentCell) {
		if (!!currentCell.previousElementSibling) {
			let prevSibling = currentCell.previousElementSibling;

			prevSibling.style.backgroundColor = '#874da8';
			prevSibling.setAttribute('data-empty', 'no');
			currentCell.style.backgroundColor = null;
			currentCell.setAttribute('data-empty', 'yes');
		}
	}
}
function moveRight(currentCell = document.querySelector('[data-empty="no"]')) {
	if (currentCell) {
		if (!!currentCell.nextElementSibling) {
			let nextSibling = currentCell.nextElementSibling;

			nextSibling.style.backgroundColor = '#874da8';
			nextSibling.setAttribute('data-empty', 'no');
			currentCell.style.backgroundColor = null;
			currentCell.setAttribute('data-empty', 'yes');
		}
	}
}

function clearCells() {
	let cells = document.querySelectorAll('[data-empty="no"]');

	for (let cell of cells) {
		cell.style.backgroundColor = null;
		cell.setAttribute('data-empty', 'yes');
	}
}
function sqrShape() {
	let startRow = document.querySelector('[data-y="1"]');
	let yCord = +startRow.getAttribute('data-y');

	let startPoint = startRow.querySelector('[data-x="3"]');

	let xCord = +startPoint.getAttribute('data-x');
	// console.log(yCord);
	startPoint.style.backgroundColor = '#874da8';
	let point2 = startPoint.nextSibling;
	point2.style.backgroundColor = '#874da8';
	let point3 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`);
	point3.style.backgroundColor = '#874da8';
	let point4 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`)
		.nextElementSibling;
	point4.style.backgroundColor = '#874da8';
	startPoint.setAttribute('data-empty', 'no');
	point2.setAttribute('data-empty', 'no');
	point3.setAttribute('data-empty', 'no');
	point4.setAttribute('data-empty', 'no');

	// console.log(document.querySelector(`[data-y="${yCord + 1}"]`));
}
function lineShape() {
	let startRow = document.querySelector('[data-y="1"]');
	let yCord = +startRow.getAttribute('data-y');

	let startPoint = startRow.querySelector('[data-x="3"]');

	let xCord = +startPoint.getAttribute('data-x');
	startPoint.style.backgroundColor = '#874da8';
	let point2 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`);
	point2.style.backgroundColor = '#874da8';
	let point3 = document.querySelector(`[data-y="${yCord + 2}"]`).querySelector(`[data-x="${xCord}"]`);
	point3.style.backgroundColor = '#874da8';
	let point4 = document.querySelector(`[data-y="${yCord + 3}"]`).querySelector(`[data-x="${xCord}"]`);
	point4.style.backgroundColor = '#874da8';
	startPoint.setAttribute('data-empty', 'no');
	point2.setAttribute('data-empty', 'no');
	point3.setAttribute('data-empty', 'no');
	point4.setAttribute('data-empty', 'no');
}

function l_Shape() {
	let startRow = document.querySelector('[data-y="1"]');
	let yCord = +startRow.getAttribute('data-y');

	let startPoint = startRow.querySelector('[data-x="3"]');

	let xCord = +startPoint.getAttribute('data-x');
	startPoint.style.backgroundColor = '#874da8';
	let point2 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`);
	point2.style.backgroundColor = '#874da8';
	let point3 = document.querySelector(`[data-y="${yCord + 2}"]`).querySelector(`[data-x="${xCord}"]`);
	point3.style.backgroundColor = '#874da8';
	let point4 = document.querySelector(`[data-y="${yCord + 2}"]`).querySelector(`[data-x="${xCord}"]`)
		.nextElementSibling;
	point4.style.backgroundColor = '#874da8';
	startPoint.setAttribute('data-empty', 'no');
	point2.setAttribute('data-empty', 'no');
	point3.setAttribute('data-empty', 'no');
	point4.setAttribute('data-empty', 'no');
}
function l_ShapeMirror() {
	let startRow = document.querySelector('[data-y="1"]');
	let yCord = +startRow.getAttribute('data-y');

	let startPoint = startRow.querySelector('[data-x="3"]');

	let xCord = +startPoint.getAttribute('data-x');
	startPoint.style.backgroundColor = '#874da8';
	let point2 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`);
	point2.style.backgroundColor = '#874da8';
	let point3 = document.querySelector(`[data-y="${yCord + 2}"]`).querySelector(`[data-x="${xCord}"]`);
	point3.style.backgroundColor = '#874da8';
	let point4 = document.querySelector(`[data-y="${yCord + 2}"]`).querySelector(`[data-x="${xCord}"]`)
		.previousElementSibling;
	point4.style.backgroundColor = '#874da8';
	startPoint.setAttribute('data-empty', 'no');
	point2.setAttribute('data-empty', 'no');
	point3.setAttribute('data-empty', 'no');
	point4.setAttribute('data-empty', 'no');
}
function z_Shape() {
	let startRow = document.querySelector('[data-y="1"]');
	let yCord = +startRow.getAttribute('data-y');

	let startPoint = startRow.querySelector('[data-x="3"]');

	let xCord = +startPoint.getAttribute('data-x');
	startPoint.style.backgroundColor = '#874da8';
	let point2 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`);
	point2.style.backgroundColor = '#874da8';
	let point3 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`)
		.nextElementSibling;
	point3.style.backgroundColor = '#874da8';
	let point4 = document.querySelector(`[data-y="${yCord + 2}"]`).querySelector(`[data-x="${xCord + 1}"]`);
	point4.style.backgroundColor = '#874da8';
	startPoint.setAttribute('data-empty', 'no');
	point2.setAttribute('data-empty', 'no');
	point3.setAttribute('data-empty', 'no');
	point4.setAttribute('data-empty', 'no');
}
function z_ShapeMirror() {
	let startRow = document.querySelector('[data-y="1"]');
	let yCord = +startRow.getAttribute('data-y');

	let startPoint = startRow.querySelector('[data-x="3"]');

	let xCord = +startPoint.getAttribute('data-x');
	startPoint.style.backgroundColor = '#874da8';
	let point2 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`);
	point2.style.backgroundColor = '#874da8';
	let point3 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`)
		.previousElementSibling;
	point3.style.backgroundColor = '#874da8';
	let point4 = document.querySelector(`[data-y="${yCord + 2}"]`).querySelector(`[data-x="${xCord - 1}"]`);
	point4.style.backgroundColor = '#874da8';
	startPoint.setAttribute('data-empty', 'no');
	point2.setAttribute('data-empty', 'no');
	point3.setAttribute('data-empty', 'no');
	point4.setAttribute('data-empty', 'no');
}
function triangleShape() {
	let startRow = document.querySelector('[data-y="1"]');
	let yCord = +startRow.getAttribute('data-y');

	let startPoint = startRow.querySelector('[data-x="3"]');

	let xCord = +startPoint.getAttribute('data-x');
	startPoint.style.backgroundColor = '#874da8';
	let point2 = startPoint.previousSibling;
	point2.style.backgroundColor = '#874da8';
	let point3 = startPoint.nextSibling;
	point3.style.backgroundColor = '#874da8';
	let point4 = document.querySelector(`[data-y="${yCord + 1}"]`).querySelector(`[data-x="${xCord}"]`);
	point4.style.backgroundColor = '#874da8';
	startPoint.setAttribute('data-empty', 'no');
	point2.setAttribute('data-empty', 'no');
	point3.setAttribute('data-empty', 'no');
	point4.setAttribute('data-empty', 'no');
}

//drawing cells and buttons with listeners in IIFE
(function() {
	let colConst;
	let rowConst;
	const arena = document.getElementById('game-arena');
	for (let i = 1; i <= 11; i++) {
		rowConst = document.createElement('div');
		rowConst.classList = 'arena-row';
		rowConst.setAttribute('data-y', i);

		arena.appendChild(rowConst);
	}
	const rows = document.getElementsByClassName('arena-row');

	for (let row of rows) {
		for (let i = 1; i <= 5; i++) {
			colConst = document.createElement('div');
			colConst.classList = 'arena-colum';
			colConst.setAttribute('data-x', i);
			colConst.setAttribute('data-empty', 'yes');
			colConst.setAttribute('data-final-place', 'no');
			row.appendChild(colConst);
		}
	}

	const startPos = document.getElementById('start-place');
	let start = document.createElement('div');
	start.setAttribute('id', 'start');
	startPos.appendChild(start);
	start = document.getElementById('start');
	// start.innerHTML = 'start';
	start.addEventListener('click', () => entryPoint());
	const stopPos = document.getElementById('stop-place');
	let stop = document.createElement('div');
	stop.setAttribute('id', 'stop');
	stopPos.appendChild(stop);
	stop = document.getElementById('stop');
	// stop.innerHTML = 'clear';
	stop.addEventListener('click', clearCells);
	const left = document.createElement('div');
	document.getElementById('move-buttons').appendChild(left);
	left.classList.add('move');
	left.setAttribute('id', 'left');
	// left.innerHTML = 'left';
	left.addEventListener('click', () => moveLeft());
	const down = document.createElement('div');
	document.getElementById('move-buttons').appendChild(down);
	down.classList.add('move');
	down.setAttribute('id', 'down');
	// down.innerHTML = 'down';
	down.addEventListener('click', () => moveDown());
	const right = document.createElement('div');
	document.getElementById('move-buttons').appendChild(right);
	right.classList.add('move');
	right.setAttribute('id', 'right');
	// right.innerHTML = 'right';
	right.addEventListener('click', () => moveRight());
})();
// // var currentRow;
var currentCell = entryPoint();
// // currentRow = document.querySelectorAll('[data-empty="no"]');
// // console.log(currentRow);

// // for (let cell of currentRow) {
// // 	if (cell.querySelector('[data-final-place="no"]')) {
// // 		currentCell = cell.querySelector('[data-final-place="no"]');
// // 	}
// // }
// //draw shape buttons with lesteners
(function() {
	const square = document.createElement('div');
	document.getElementById('shapes').appendChild(square);
	square.setAttribute('id', 'square');
	square.innerHTML = 'square';
	square.addEventListener('click', () => sqrShape());
	const line = document.createElement('div');
	document.getElementById('shapes').appendChild(line);
	line.setAttribute('id', 'line');
	line.innerHTML = 'line';
	line.addEventListener('click', () => lineShape());
	const l = document.createElement('div');
	document.getElementById('shapes').appendChild(l);
	l.setAttribute('id', 'l_Shape');
	l.innerHTML = 'L';
	l.addEventListener('click', () => l_Shape());
	const l_Rev = document.createElement('div');
	document.getElementById('shapes').appendChild(l_Rev);
	l_Rev.setAttribute('id', 'l_ShapeMirror');
	l_Rev.innerHTML = 'L-rev';
	l_Rev.addEventListener('click', () => l_ShapeMirror());
	const z = document.createElement('div');
	document.getElementById('shapes').appendChild(z);
	z.setAttribute('id', 'z_Shape');
	z.innerHTML = 'Z';
	z.addEventListener('click', () => z_Shape());
	const z_Rev = document.createElement('div');
	document.getElementById('shapes').appendChild(z_Rev);
	z_Rev.setAttribute('id', 'z_ShapeMirror');
	z_Rev.innerHTML = 'Z-rev';
	z_Rev.addEventListener('click', () => z_ShapeMirror());
	const triangle = document.createElement('div');
	document.getElementById('shapes').appendChild(triangle);
	triangle.setAttribute('id', 'triangle');
	triangle.innerHTML = 'triangle';
	triangle.addEventListener('click', () => triangleShape());
})();
function moveFullShapeDown() {
	let notEpmptyCells = document.querySelectorAll("[data-empty='no']");
	for (let cell of notEpmptyCells) {
		moveDown(cell);
	}
}
