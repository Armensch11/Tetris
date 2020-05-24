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
			colConst.setAttribute('data-y', `${row.getAttribute('data-y')}`);
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
	start.addEventListener('click', () => {
		triangleObj = createTriangle();
		let stop = setInterval(() => triangleObj.moveDown(), 800);
		setTimeout(clearInterval, 10000, stop);
	});
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
	triangle.addEventListener('click', () => triangleShapeUsingObject());
})();

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

function clearCells() {
	let cells = document.querySelectorAll('[data-empty="no"]');

	for (let cell of cells) {
		cell.style.backgroundColor = null;
		cell.setAttribute('data-empty', 'yes');
	}
}
let triangleObj = createTriangle();
function createTriangle(x = 3, y = 2, shapeTriangle = {}) {
	shapeTriangle.position = 1;
	shapeTriangle.startRow = document.querySelector(`[data-y="${y}"]`);
	shapeTriangle.yCord = +shapeTriangle.startRow.getAttribute('data-y');

	shapeTriangle.point1 = shapeTriangle.startRow.querySelector(`[data-x="${x}"]`);

	shapeTriangle.xCord = +shapeTriangle.point1.getAttribute('data-x');

	shapeTriangle.point1.style.backgroundColor = '#874da8';
	shapeTriangle.point2 = document
		.querySelector(`[data-y="${shapeTriangle.yCord}"]`)
		.querySelector(`[data-x="${shapeTriangle.xCord - 1}"]`);
	shapeTriangle.point2.style.backgroundColor = '#874da8';
	shapeTriangle.point3 = document
		.querySelector(`[data-y="${shapeTriangle.yCord}"]`)
		.querySelector(`[data-x="${shapeTriangle.xCord + 1}"]`);
	shapeTriangle.point3.style.backgroundColor = '#874da8';
	shapeTriangle.point4 = document
		.querySelector(`[data-y="${shapeTriangle.yCord + 1}"]`)
		.querySelector(`[data-x="${shapeTriangle.xCord}"]`);
	shapeTriangle.point4.style.backgroundColor = '#874da8';
	shapeTriangle.point1.setAttribute('data-empty', 'no');
	shapeTriangle.point2.setAttribute('data-empty', 'no');
	shapeTriangle.point3.setAttribute('data-empty', 'no');
	shapeTriangle.point4.setAttribute('data-empty', 'no');

	shapeTriangle.turnShape = function() {
		// debugger;
		let diff_x_p2 = +this.point2.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p2 = +this.point2.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p3 = +this.point3.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p3 = +this.point3.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p4 = +this.point4.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p4 = +this.point4.getAttribute('data-y') - +this.point1.getAttribute('data-y');

		if (diff_x_p2 === 0) {
			if (diff_y_p2 > 0) {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p2}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			} else {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			}
		}
		if (diff_y_p2 === 0) {
			if (diff_x_p2 > 0) {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p2}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			} else {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');

				this.point2 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p2}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			}
		}
		if (diff_x_p4 === 0) {
			if (diff_y_p4 > 0) {
				this.point4.style.backgroundColor = null;
				this.point4.setAttribute('data-empty', 'yes');
				this.point4 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p4}"]`);
				this.point4.style.backgroundColor = '#874da8';
				this.point4.setAttribute('data-empty', 'no');
			} else {
				this.point4.style.backgroundColor = null;
				this.point4.setAttribute('data-empty', 'yes');
				this.point4 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`);
				this.point4.style.backgroundColor = '#874da8';
				this.point4.setAttribute('data-empty', 'no');
			}
		}
		if (diff_y_p4 === 0) {
			if (diff_x_p4 > 0) {
				this.point4.style.backgroundColor = null;
				this.point4.setAttribute('data-empty', 'yes');
				this.point4 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point4.style.backgroundColor = '#874da8';
				this.point4.setAttribute('data-empty', 'no');
			} else {
				this.point4.style.backgroundColor = null;
				this.point4.setAttribute('data-empty', 'yes');
				this.point4 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point4.style.backgroundColor = '#874da8';
				this.point4.setAttribute('data-empty', 'no');
			}
		}
		if (diff_x_p3 === 0) {
			if (diff_y_p3 > 0) {
				this.point3.style.backgroundColor = null;
				this.point3.setAttribute('data-empty', 'yes');
				this.point3 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p3}"]`);
				this.point3.style.backgroundColor = '#874da8';
				this.point3.setAttribute('data-empty', 'no');
			} else {
				this.point3.style.backgroundColor = null;
				this.point3.setAttribute('data-empty', 'yes');
				this.point3 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`);
				this.point3.style.backgroundColor = '#874da8';
				this.point3.setAttribute('data-empty', 'no');
			}
		}
		if (diff_y_p3 === 0) {
			if (diff_x_p3 > 0) {
				this.point3.style.backgroundColor = null;
				this.point3.setAttribute('data-empty', 'yes');
				this.point3 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p3}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point3.style.backgroundColor = '#874da8';
				this.point3.setAttribute('data-empty', 'no');
			} else {
				this.point3.style.backgroundColor = null;
				this.point3.setAttribute('data-empty', 'yes');
				this.point3 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p3}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point3.style.backgroundColor = '#874da8';
				this.point3.setAttribute('data-empty', 'no');
			}
		}
		this.position++;
		this.position === 5 ? (this.position = 1) : null;
	};
	shapeTriangle.moveDown = function() {
		if (this.position === 1) {
			let x_p4 = this.point4.getAttribute('data-x');
			let y_p4 = this.point4.getAttribute('data-y');
			let p4_under = document.querySelectorAll(`[data-x='${x_p4}']`)[y_p4];
			let x_p2 = this.point2.getAttribute('data-x');
			let y_p2 = this.point2.getAttribute('data-y');
			let p2_under = document.querySelectorAll(`[data-x='${x_p2}']`)[y_p2];
			let x_p3 = this.point3.getAttribute('data-x');
			let y_p3 = this.point3.getAttribute('data-y');
			let p3_under = document.querySelectorAll(`[data-x='${x_p3}']`)[y_p3];
			let x_p1 = this.point1.getAttribute('data-x');
			let y_p1 = this.point1.getAttribute('data-y');
			let p1_under = document.querySelectorAll(`[data-x='${x_p1}']`)[y_p1];
			if (p4_under && p2_under && p3_under) {
				if (
					p4_under.getAttribute('data-empty') === 'yes' &&
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_under;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_under;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 2) {
			let x_p4 = this.point4.getAttribute('data-x');
			let y_p4 = this.point4.getAttribute('data-y');
			let p4_under = document.querySelectorAll(`[data-x='${x_p4}']`)[y_p4];
			let x_p2 = this.point2.getAttribute('data-x');
			let y_p2 = this.point2.getAttribute('data-y');
			let p2_under = document.querySelectorAll(`[data-x='${x_p2}']`)[y_p2];
			let x_p3 = this.point3.getAttribute('data-x');
			let y_p3 = this.point3.getAttribute('data-y');
			let p3_under = document.querySelectorAll(`[data-x='${x_p3}']`)[y_p3];
			let x_p1 = this.point1.getAttribute('data-x');
			let y_p1 = this.point1.getAttribute('data-y');
			let p1_under = document.querySelectorAll(`[data-x='${x_p1}']`)[y_p1];
			if (p4_under && p3_under) {
				if (p4_under.getAttribute('data-empty') === 'yes' && p3_under.getAttribute('data-empty') === 'yes') {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_under;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_under;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			let x_p4 = this.point4.getAttribute('data-x');
			let y_p4 = this.point4.getAttribute('data-y');
			let p4_under = document.querySelectorAll(`[data-x='${x_p4}']`)[y_p4];
			let x_p2 = this.point2.getAttribute('data-x');
			let y_p2 = this.point2.getAttribute('data-y');
			let p2_under = document.querySelectorAll(`[data-x='${x_p2}']`)[y_p2];
			let x_p3 = this.point3.getAttribute('data-x');
			let y_p3 = this.point3.getAttribute('data-y');
			let p3_under = document.querySelectorAll(`[data-x='${x_p3}']`)[y_p3];
			let x_p1 = this.point1.getAttribute('data-x');
			let y_p1 = this.point1.getAttribute('data-y');
			let p1_under = document.querySelectorAll(`[data-x='${x_p1}']`)[y_p1];
			if (p1_under && p2_under && p3_under) {
				if (
					p1_under.getAttribute('data-empty') === 'yes' &&
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes'
				) {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_under;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_under;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			let x_p4 = this.point4.getAttribute('data-x');
			let y_p4 = this.point4.getAttribute('data-y');
			let p4_under = document.querySelectorAll(`[data-x='${x_p4}']`)[y_p4];
			let x_p2 = this.point2.getAttribute('data-x');
			let y_p2 = this.point2.getAttribute('data-y');
			let p2_under = document.querySelectorAll(`[data-x='${x_p2}']`)[y_p2];
			let x_p3 = this.point3.getAttribute('data-x');
			let y_p3 = this.point3.getAttribute('data-y');
			let p3_under = document.querySelectorAll(`[data-x='${x_p3}']`)[y_p3];
			let x_p1 = this.point1.getAttribute('data-x');
			let y_p1 = this.point1.getAttribute('data-y');
			let p1_under = document.querySelectorAll(`[data-x='${x_p1}']`)[y_p1];
			if (p2_under && p4_under) {
				if (p4_under.getAttribute('data-empty') === 'yes' && p2_under.getAttribute('data-empty') === 'yes') {
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_under;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_under;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
				}
			}
		}
	};
	shapeTriangle.moveLeft = function() {
		if (this.position === 1) {
			// debugger;
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toLeft = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 - 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toLeft = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 - 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toLeft = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 - 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toLeft = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 - 1];
			if (p4_toLeft && p2_toLeft) {
				if (p4_toLeft.getAttribute('data-empty') === 'yes' && p2_toLeft.getAttribute('data-empty') === 'yes') {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toLeft;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toLeft;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toLeft;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 2) {
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toLeft = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 - 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toLeft = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 - 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toLeft = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 - 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toLeft = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 - 1];
			if (p4_toLeft && p3_toLeft && p2_toLeft) {
				if (
					p4_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes' &&
					p2_toLeft.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toLeft;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toLeft;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toLeft;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toLeft = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 - 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toLeft = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 - 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toLeft = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 - 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toLeft = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 - 1];
			if (p3_toLeft && p4_toLeft) {
				if (p3_toLeft.getAttribute('data-empty') === 'yes' && p4_toLeft.getAttribute('data-empty') === 'yes') {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toLeft;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toLeft;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toLeft;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toLeft = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 - 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toLeft = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 - 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toLeft = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 - 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toLeft = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 - 1];
			if (p1_toLeft && p2_toLeft && p3_toLeft) {
				if (
					p1_toLeft.getAttribute('data-empty') === 'yes' &&
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes'
				) {
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toLeft;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';

					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toLeft;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toLeft;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
	};
	shapeTriangle.moveRight = function() {
		if (this.position === 1) {
			// debugger;
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toRight = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 + 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toRight = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 + 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toRight = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 + 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toRight = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 + 1];
			if (p3_toRight && p4_toRight) {
				if (
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toRight;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toRight;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';

					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toRight;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 2) {
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toRight = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 + 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toRight = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 + 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toRight = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 + 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toRight = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 + 1];
			if (p1_toRight && p2_toRight && p3_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toRight;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toRight;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';

					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toRight;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toRight = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 + 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toRight = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 + 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toRight = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 + 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toRight = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 + 1];
			if (p2_toRight && p4_toRight) {
				if (
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toRight;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toRight;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toRight;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			let x_p4 = +this.point4.getAttribute('data-x');
			let y_p4 = +this.point4.getAttribute('data-y');
			let p4_toRight = document.querySelectorAll(`[data-y='${y_p4}']`)[x_p4 + 1];
			let x_p2 = +this.point2.getAttribute('data-x');
			let y_p2 = +this.point2.getAttribute('data-y');
			let p2_toRight = document.querySelectorAll(`[data-y='${y_p2}']`)[x_p2 + 1];
			let x_p3 = +this.point3.getAttribute('data-x');
			let y_p3 = +this.point3.getAttribute('data-y');
			let p3_toRight = document.querySelectorAll(`[data-y='${y_p3}']`)[x_p3 + 1];
			let x_p1 = +this.point1.getAttribute('data-x');
			let y_p1 = +this.point1.getAttribute('data-y');
			let p1_toRight = document.querySelectorAll(`[data-y='${y_p1}']`)[x_p1 + 1];
			if (p2_toRight && p3_toRight && p4_toRight) {
				if (
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toRight;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';

					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toRight;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';

					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toRight;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
				}
			}
		}
	};
	return shapeTriangle;
}

function twoCellShape(x = 3, y = 3) {
	let twoCell = {};
	twoCell.startRow = document.querySelector(`[data-y="${y}"]`);
	twoCell.yCord = +twoCell.startRow.getAttribute('data-y');

	twoCell.point1 = twoCell.startRow.querySelector(`[data-x="${x}"]`);

	twoCell.xCord = +twoCell.point1.getAttribute('data-x');

	twoCell.point2 = document
		.querySelector(`[data-y="${twoCell.yCord}"]`)
		.querySelector(`[data-x="${twoCell.xCord + 2}"]`);
	if (twoCell.point2 && twoCell.point1) {
		twoCell.point1.style.backgroundColor = '#874da8';
		twoCell.point2.style.backgroundColor = '#874da8';
		twoCell.point1.setAttribute('data-empty', 'no');
		twoCell.point2.setAttribute('data-empty', 'no');
	}

	twoCell.turnShape = function() {
		let diffX = +this.point2.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diffY = +this.point2.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		console.log(diffX);
		console.log(diffY);
		if (diffX === 0) {
			if (diffY > 0) {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${this.yCord}"]`)
					.querySelector(`[data-x="${this.xCord - diffY}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			} else {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${this.yCord}"]`)
					.querySelector(`[data-x="${this.xCord + Math.abs(diffY)}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			}
		}
		if (diffY === 0) {
			if (diffX > 0) {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${this.yCord + diffX}"]`)
					.querySelector(`[data-x="${this.xCord}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			} else {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${this.yCord + diffX}"]`)
					.querySelector(`[data-x="${this.xCord}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');
			}
		}
	};

	return twoCell;
}
// pttogh funkcia let stop=setInterval(()=>twocell.turnShape(),1000);
// setTimeout(clearInterval,15000,stop);

//drawing cells and buttons with listeners in IIFE

addEventListener('keydown', function() {
	switch (event.which) {
		case 37:
			triangleObj.moveLeft();
			break;
		case 39:
			triangleObj.moveRight();
			break;
		case 38:
			triangleObj.turnShape();
			break;
		case 40:
			triangleObj.moveDown();
			break;
	}
});
