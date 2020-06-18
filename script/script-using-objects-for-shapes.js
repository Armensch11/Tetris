let score = 0;
let currentShape;
// const randomArr = new Array(2);

// function shapeGen() {
// 	currentShape = randShape()();
// }
(function() {
	let colConst;
	let rowConst;

	const arena = document.getElementById('game-arena');
	for (let i = 1; i <= 20; i++) {
		rowConst = document.createElement('div');
		rowConst.classList = 'arena-row';
		rowConst.setAttribute('data-y', i);

		arena.appendChild(rowConst);
	}
	const rows = document.getElementsByClassName('arena-row');
	let childArr = [];
	let domArr = [];
	for (let row of rows) {
		for (let i = 1; i <= 11; i++) {
			colConst = document.createElement('div');
			colConst.classList = 'arena-colum';
			colConst.setAttribute('data-x', i);
			colConst.setAttribute('data-y', `${row.getAttribute('data-y')}`);
			colConst.setAttribute('data-empty', 'yes');

			row.appendChild(colConst);
		}
		childArr = [ ...Array.from(row.getElementsByTagName('div')) ];
		domArr.push(childArr);
	}

	const startPos = document.getElementById('start-place');
	let start = document.createElement('div');
	start.setAttribute('id', 'start');
	startPos.appendChild(start);
	start = document.getElementById('start');
	// start.innerHTML = 'start';
	let stopID;
	let arrY = [];
	let finLine = Array.from(document.querySelector(`[data-y='2']`).childNodes);
	let scoreTab = document.getElementById('score-place');
	let clickCounter = 0;
	scoreTab.innerHTML = `${score}`;
	// console.log(scoreTab);
	// start.addEventListener('click', () => {
	// 	clickCounter++;
	// 	if (clickCounter % 2) {
	// 		shapeGen();

	// 		stopID = setTimeout(function newShape() {
	// 			currentShape.moveDown();
	// 			arrY.push(+currentShape.point1.getAttribute('data-y'));
	// 			scoreTab.innerHTML = `${score}`;
	// 			// console.log(currentShape.point1.getAttribute('data-y'));
	// 			if (arrY[arrY.length - 1] === arrY[arrY.length - 2]) {
	// 				arrY = [];

	// 				checkFull();
	// 				shapeGen();
	// 			}
	// 			if (finLine.filter((el) => el.getAttribute('data-empty') === 'no').length <= 4) {
	// 				stopID = setTimeout(newShape, 350);
	// 			} else {
	// 				stopInterval();
	// 			}
	// 		}, 350);
	// 		start.style.backgroundImage = 'url(./icons/powerCircle.png)';
	// 	} else {
	// 		score = 0;
	// 		scoreTab.innerHTML = `${score}`;
	// 		stopInterval();
	// 		clearCells();
	// 		start.style.backgroundImage = 'url(./icons/powerCirclePurple.png)';
	// 		let cells = document.getElementsByClassName('matrix-cell');
	// 		for (let cell of cells) {
	// 			cell.style.backgroundColor = null;
	// 		}
	// 	}
	// });

	// function stopInterval() {
	// 	clearTimeout(stopID);
	// }

	//changed randomiser and start listener handler
	let shapeArr = [ createLine, createL, createL_Rev, createZ, createZ_Rev, createTriangle, createCube ];
	function randShape() {
		let randIndex = Math.floor(Math.random() * shapeArr.length);
		randIndex === 7 ? (randIndex = 6) : randIndex;
		// iconSwitch(randIndex);
		// console.log(randIndex);
		// return shapeArr[randIndex];
		return randIndex;
	}
	const nextElArr = new Array(2);
	nextElArr[0] = randShape();
	nextElArr[1] = randShape();
	// iconSwitch(nextElArr[1]);
	// function shapeGen() {
	// 	currentShape = randShape()();
	// }
	function speedRate(score) {
		let rate = [ 350, 270, 200 ];
		if (score < 40) {
			return rate[0];
		} else if (score >= 40 && score < 80) {
			return rate[1];
		} else {
			return rate[2];
		}
	}

	let speed = start.addEventListener('click', () => {
		clickCounter++;
		if (clickCounter % 2) {
			currentShape = shapeArr[nextElArr[0]]();

			stopID = setTimeout(function newShape() {
				currentShape.moveDown();
				arrY.push(+currentShape.point1.getAttribute('data-y'));
				scoreTab.innerHTML = `${score}`;
				// console.log(currentShape.point1.getAttribute('data-y'));
				if (arrY[arrY.length - 1] === arrY[arrY.length - 2]) {
					arrY = [];

					checkFull();
					speed = speedRate(score);
					nextElArr[0] = nextElArr[1];
					currentShape = shapeArr[nextElArr[0]]();
					nextElArr[1] = randShape();
					iconSwitch(nextElArr[1]);
					// console.log(nextElArr[0]);
					// shapeGen();
				}
				if (finLine.filter((el) => el.getAttribute('data-empty') === 'no').length <= 4) {
					stopID = setTimeout(newShape, speed);
				} else {
					stopInterval();
				}
			}, speed);
			start.style.backgroundImage = 'url(./icons/powerCircle.png)';
		} else {
			score = 0;
			scoreTab.innerHTML = `${score}`;
			stopInterval();
			clearCells();
			start.style.backgroundImage = 'url(./icons/powerCirclePurple.png)';
			let cells = document.getElementsByClassName('matrix-cell');
			for (let cell of cells) {
				cell.style.backgroundColor = null;
			}
		}
	});

	function stopInterval() {
		clearTimeout(stopID);
	}
	// const stopPos = document.getElementById('stop-place');
	// let stop = document.createElement('div');
	// stop.setAttribute('id', 'stop');
	// stopPos.appendChild(stop);
	// stop = document.getElementById('stop');
	// // stop.innerHTML = 'clear';
	// stop.addEventListener('click', () => {
	// 	score = 0;
	// 	scoreTab.innerHTML = `${score}`;
	// 	stopInterval();
	// 	clearCells();
	// });
	// const left = document.createElement('div');
	// document.getElementById('move-buttons').appendChild(left);
	// left.classList.add('move');
	// left.setAttribute('id', 'left');
	// // left.innerHTML = 'left';
	// left.addEventListener('click', () => moveLeft());
	// const down = document.createElement('div');
	// document.getElementById('move-buttons').appendChild(down);
	// down.classList.add('move');
	// down.setAttribute('id', 'down');
	// // down.innerHTML = 'down';
	// down.addEventListener('click', () => moveDown());
	// const right = document.createElement('div');
	// document.getElementById('move-buttons').appendChild(right);
	// right.classList.add('move');
	// right.setAttribute('id', 'right');
	// // right.innerHTML = 'right';
	// right.addEventListener('click', () => moveRight());
})();

(function() {
	// const shapeGen = document.createElement('div');
	// document.getElementById('shapes').appendChild(shapeGen);
	// shapeGen.setAttribute('id', 'shape-gen');
	// shapeGen.innerHTML = 'SHAPE-GEN';
	// shapeGen.addEventListener('click', () => (currentShape = randShape()));
	// const cube = document.createElement('div');
	// document.getElementById('shapes').appendChild(cube);
	// cube.setAttribute('id', 'cube');
	// cube.innerHTML = 'cube';
	// cube.addEventListener('click', () => (currentShape = randShape()));
	// const line = document.createElement('div');
	// document.getElementById('shapes').appendChild(line);
	// line.setAttribute('id', 'line');
	// line.innerHTML = 'line';
	// line.addEventListener('click', () => currentShape);
	// const l = document.createElement('div');
	// document.getElementById('shapes').appendChild(l);
	// l.setAttribute('id', 'l_Shape');
	// l.innerHTML = 'L';
	// l.addEventListener('click', () => currentShape);
	// const l_Rev = document.createElement('div');
	// document.getElementById('shapes').appendChild(l_Rev);
	// l_Rev.setAttribute('id', 'l_ShapeMirror');
	// l_Rev.innerHTML = 'L-rev';
	// l_Rev.addEventListener('click', () => currentShape);
	// const z = document.createElement('div');
	// document.getElementById('shapes').appendChild(z);
	// z.setAttribute('id', 'z_Shape');
	// z.innerHTML = 'Z';
	// z.addEventListener('click', () => currentShape);
	// const z_Rev = document.createElement('div');
	// document.getElementById('shapes').appendChild(z_Rev);
	// z_Rev.setAttribute('id', 'z_ShapeMirror');
	// z_Rev.innerHTML = 'Z-rev';
	// z_Rev.addEventListener('click', () => currentShape);
	// const triangle = document.createElement('div');
	// document.getElementById('shapes').appendChild(triangle);
	// triangle.setAttribute('id', 'triangle');
	// triangle.innerHTML = 'triangle';
	// triangle.addEventListener('click', () => currentShape);
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

// function randShape() {
// 	let shapeArr = [ createLine, createL, createL_Rev, createZ, createZ_Rev, createTriangle, createCube ];
// 	let randIndex = Math.floor(Math.random() * shapeArr.length);
// 	randIndex === 7 ? (randIndex = 6) : randIndex;
// 	iconSwitch(randIndex);
// 	// console.log(randIndex);
// 	return shapeArr[randIndex];
// }

function clearCells() {
	let cells = document.querySelectorAll('[data-empty="no"]');

	for (let cell of cells) {
		cell.style.backgroundColor = null;
		cell.setAttribute('data-empty', 'yes');
	}
}

// let obj_Triangle = createTriangle();
function createTriangle(x = 6, y = 1, shapeTriangle = {}) {
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

		if (diff_x_p4 === 0) {
			if (diff_y_p4 > 0) {
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');

				this.point2 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p2}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');

				this.point4.style.backgroundColor = null;
				this.point4.setAttribute('data-empty', 'yes');
				this.point4 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p4}"]`);
				this.point4.style.backgroundColor = '#874da8';
				this.point4.setAttribute('data-empty', 'no');
				this.point3.style.backgroundColor = null;
				this.point3.setAttribute('data-empty', 'yes');
				this.point3 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p3}"]`)
					.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
				this.point3.style.backgroundColor = '#874da8';
				this.point3.setAttribute('data-empty', 'no');
				this.position++;
				this.position === 5 ? (this.position = 1) : this.position;
			} else {
				if (document.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p2}"]`)) {
					if (
						document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p2}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p2}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p3}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			}
		}
		if (diff_y_p4 === 0) {
			if (diff_x_p4 > 0) {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p2}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p2}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p2}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			} else {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p3}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			}
		}
	};
	shapeTriangle.moveDown = function() {
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
		let paint = () => {
			this.point2.setAttribute('data-empty', 'yes');
			this.point2.style.backgroundColor = null;
			this.point2 = p2_under;
			this.point2.setAttribute('data-empty', 'no');
			this.point2.style.backgroundColor = '#874da8';

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
		};
		if (this.position === 1) {
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
					paint();
				}
			}
		}
		if (this.position === 2) {
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
			if (p1_under && p2_under && p3_under) {
				if (
					p1_under.getAttribute('data-empty') === 'yes' &&
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			if (p2_under && p4_under) {
				if (p4_under.getAttribute('data-empty') === 'yes' && p2_under.getAttribute('data-empty') === 'yes') {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
	};
	shapeTriangle.moveLeft = function() {
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
		let paint = () => {
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
		};
		if (this.position === 1) {
			if (p4_toLeft && p2_toLeft) {
				if (p4_toLeft.getAttribute('data-empty') === 'yes' && p2_toLeft.getAttribute('data-empty') === 'yes') {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
		if (this.position === 2) {
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
					paint();
				}
			}
		}
		if (this.position === 3) {
			if (p3_toLeft && p4_toLeft) {
				if (p3_toLeft.getAttribute('data-empty') === 'yes' && p4_toLeft.getAttribute('data-empty') === 'yes') {
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
		if (this.position === 4) {
			if (p1_toLeft && p2_toLeft && p3_toLeft) {
				if (
					p1_toLeft.getAttribute('data-empty') === 'yes' &&
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes'
				) {
					paint();
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
		let paint = () => {
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
		};
		if (this.position === 1) {
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
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p1_toRight && p2_toRight && p3_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
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

					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
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
					paint();
				}
			}
		}
	};
	return shapeTriangle;
}
// let obj_L = createL();
function createL(x = 6, y = 3, shapeL = {}) {
	shapeL.position = 1;

	shapeL.startRow = document.querySelector(`[data-y="${y}"]`);
	shapeL.yCord = +shapeL.startRow.getAttribute('data-y');

	shapeL.point1 = shapeL.startRow.querySelector(`[data-x="${x}"]`);

	shapeL.xCord = +shapeL.point1.getAttribute('data-x');

	shapeL.point1.style.backgroundColor = '#874da8';
	shapeL.point2 = document
		.querySelector(`[data-y="${shapeL.yCord - 1}"]`)
		.querySelector(`[data-x="${shapeL.xCord}"]`);
	shapeL.point2.style.backgroundColor = '#874da8';
	shapeL.point3 = document
		.querySelector(`[data-y="${shapeL.yCord - 2}"]`)
		.querySelector(`[data-x="${shapeL.xCord}"]`);
	shapeL.point3.style.backgroundColor = '#874da8';
	shapeL.point4 = document
		.querySelector(`[data-y="${shapeL.yCord}"]`)
		.querySelector(`[data-x="${shapeL.xCord + 1}"]`);

	shapeL.point4.style.backgroundColor = '#874da8';
	shapeL.point1.setAttribute('data-empty', 'no');
	shapeL.point2.setAttribute('data-empty', 'no');
	shapeL.point3.setAttribute('data-empty', 'no');
	shapeL.point4.setAttribute('data-empty', 'no');

	shapeL.turnShape = function() {
		// debugger;
		let diff_x_p2 = +this.point2.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p2 = +this.point2.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p3 = +this.point3.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p3 = +this.point3.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p4 = +this.point4.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p4 = +this.point4.getAttribute('data-y') - +this.point1.getAttribute('data-y');

		if (diff_x_p4 === 0) {
			if (diff_y_p4 > 0) {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p4}"]`) &&
					document.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p4}"]`)
							.getAttribute('data-empty') === 'yes' &&
						document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p4}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');

						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			} else {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p2)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');

						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y') - Math.abs(diff_x_p3)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			}
		}
		if (diff_y_p4 === 0) {
			if (diff_x_p4 > 0) {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`) &&
					document.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`)
							.getAttribute('data-empty') === 'yes' &&
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');

						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			} else {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p4)}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p2)}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');

						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			}
		}
	};
	shapeL.moveDown = function() {
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
		let paint = () => {
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
			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_under;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
		};
		if (this.position === 1) {
			if (p4_under && p1_under) {
				if (p4_under.getAttribute('data-empty') === 'yes' && p1_under.getAttribute('data-empty') === 'yes') {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
		if (this.position === 2) {
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
					paint();
				}
			}
		}
		if (this.position === 3) {
			if (p3_under && p4_under) {
				if (p3_under.getAttribute('data-empty') === 'yes' && p4_under.getAttribute('data-empty') === 'yes') {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_under;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';

					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_under;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			if (p1_under && p2_under && p3_under) {
				if (
					p1_under.getAttribute('data-empty') === 'yes' &&
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
	};
	shapeL.moveLeft = function() {
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
		let paint = () => {
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

			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_toLeft;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
		};
		if (this.position === 1) {
			if (p1_toLeft && p2_toLeft && p3_toLeft) {
				if (
					p1_toLeft.getAttribute('data-empty') === 'yes' &&
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 2) {
			if (p1_toLeft && p4_toLeft) {
				if (p1_toLeft.getAttribute('data-empty') === 'yes' && p4_toLeft.getAttribute('data-empty') === 'yes') {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			if (p2_toLeft && p3_toLeft && p4_toLeft) {
				if (
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes' &&
					p4_toLeft.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
		if (this.position === 4) {
			if (p3_toLeft && p4_toLeft) {
				if (p3_toLeft.getAttribute('data-empty') === 'yes' && p4_toLeft.getAttribute('data-empty') === 'yes') {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toLeft;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
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

					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
	};
	shapeL.moveRight = function() {
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
		let paint = () => {
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
		};
		if (this.position === 1) {
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
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p3_toRight && p4_toRight) {
				if (
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toRight;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toRight;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toRight;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			if (p1_toRight && p2_toRight && p3_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();

					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			if (p1_toRight && p4_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
	};
	return shapeL;
}

// let obj_L_Rev = createL_Rev();
function createL_Rev(x = 6, y = 3, shapeL_Rev = {}) {
	shapeL_Rev.position = 1;

	shapeL_Rev.startRow = document.querySelector(`[data-y="${y}"]`);
	shapeL_Rev.yCord = +shapeL_Rev.startRow.getAttribute('data-y');

	shapeL_Rev.point1 = shapeL_Rev.startRow.querySelector(`[data-x="${x}"]`);

	shapeL_Rev.xCord = +shapeL_Rev.point1.getAttribute('data-x');

	shapeL_Rev.point1.style.backgroundColor = '#874da8';
	shapeL_Rev.point2 = document
		.querySelector(`[data-y="${shapeL_Rev.yCord - 1}"]`)
		.querySelector(`[data-x="${shapeL_Rev.xCord}"]`);
	shapeL_Rev.point2.style.backgroundColor = '#874da8';
	shapeL_Rev.point3 = document
		.querySelector(`[data-y="${shapeL_Rev.yCord - 2}"]`)
		.querySelector(`[data-x="${shapeL_Rev.xCord}"]`);
	shapeL_Rev.point3.style.backgroundColor = '#874da8';
	shapeL_Rev.point4 = document
		.querySelector(`[data-y="${shapeL_Rev.yCord}"]`)
		.querySelector(`[data-x="${shapeL_Rev.xCord - 1}"]`);

	shapeL_Rev.point4.style.backgroundColor = '#874da8';
	shapeL_Rev.point1.setAttribute('data-empty', 'no');
	shapeL_Rev.point2.setAttribute('data-empty', 'no');
	shapeL_Rev.point3.setAttribute('data-empty', 'no');
	shapeL_Rev.point4.setAttribute('data-empty', 'no');

	shapeL_Rev.turnShape = function() {
		// debugger;
		let diff_x_p2 = +this.point2.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p2 = +this.point2.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p3 = +this.point3.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p3 = +this.point3.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p4 = +this.point4.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p4 = +this.point4.getAttribute('data-y') - +this.point1.getAttribute('data-y');

		if (diff_x_p4 === 0) {
			if (diff_y_p4 > 0) {
				if (
					true
					// document
					// 	.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					// 	.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p3}"]`)
				) {
					this.point2.style.backgroundColor = null;
					this.point2.setAttribute('data-empty', 'yes');
					this.point2 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p2)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
					this.point2.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'no');

					this.point3.style.backgroundColor = null;
					this.point3.setAttribute('data-empty', 'yes');
					this.point3 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p3)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
					this.point3.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = null;
					this.point4.setAttribute('data-empty', 'yes');
					this.point4 = document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - diff_y_p4}"]`);
					this.point4.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'no');
					this.position++;
					this.position === 5 ? (this.position = 1) : this.position;
				}
			} else {
				if (
					document.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`) &&
					document.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`)
							.getAttribute('data-empty') === 'yes' &&
						document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');

						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			}
		}
		if (diff_y_p4 === 0) {
			if (diff_x_p4 > 0) {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p2)}"]`) &&
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p2)}"]`)
							.getAttribute('data-empty') === 'yes' &&
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p2)}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');

						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + diff_x_p4}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			} else {
				if (
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`)
				) {
					if (
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`)
							.getAttribute('data-empty') === 'yes' &&
						document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`)
							.getAttribute('data-empty') === 'yes'
					) {
						this.point2.style.backgroundColor = null;
						this.point2.setAttribute('data-empty', 'yes');
						this.point2 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`);
						this.point2.style.backgroundColor = '#874da8';
						this.point2.setAttribute('data-empty', 'no');

						this.point3.style.backgroundColor = null;
						this.point3.setAttribute('data-empty', 'yes');
						this.point3 = document
							.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
							.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`);
						this.point3.style.backgroundColor = '#874da8';
						this.point3.setAttribute('data-empty', 'no');
						this.point4.style.backgroundColor = null;
						this.point4.setAttribute('data-empty', 'yes');
						this.point4 = document
							.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p4)}"]`)
							.querySelector(`[data-x="${this.point1.getAttribute('data-x')}"]`);
						this.point4.style.backgroundColor = '#874da8';
						this.point4.setAttribute('data-empty', 'no');
						this.position++;
						this.position === 5 ? (this.position = 1) : this.position;
					}
				}
			}
		}
	};
	shapeL_Rev.moveDown = function() {
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
		let paint = () => {
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
			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_under;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
		};
		if (this.position === 1) {
			if (p4_under && p1_under) {
				if (p4_under.getAttribute('data-empty') === 'yes' && p1_under.getAttribute('data-empty') === 'yes') {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p1_under && p2_under && p3_under) {
				if (
					p1_under.getAttribute('data-empty') === 'yes' &&
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			if (p3_under && p4_under) {
				if (p3_under.getAttribute('data-empty') === 'yes' && p4_under.getAttribute('data-empty') === 'yes') {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_under;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';

					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_under;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			if (p2_under && p3_under && p4_under) {
				if (
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes' &&
					p4_under.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_under;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
	};
	shapeL_Rev.moveLeft = function() {
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
		let paint = () => {
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

			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_toLeft;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
		};
		if (this.position === 1) {
			if (p4_toLeft && p2_toLeft && p3_toLeft) {
				if (
					p4_toLeft.getAttribute('data-empty') === 'yes' &&
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p1_toLeft && p4_toLeft) {
				if (p1_toLeft.getAttribute('data-empty') === 'yes' && p4_toLeft.getAttribute('data-empty') === 'yes') {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			if (p1_toLeft && p2_toLeft && p3_toLeft) {
				if (
					p1_toLeft.getAttribute('data-empty') === 'yes' &&
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 4) {
			if (p3_toLeft && p4_toLeft) {
				if (p3_toLeft.getAttribute('data-empty') === 'yes' && p4_toLeft.getAttribute('data-empty') === 'yes') {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toLeft;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
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

					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toLeft;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
	};
	shapeL_Rev.moveRight = function() {
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
		let paint = () => {
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
		};
		if (this.position === 1) {
			if (p1_toRight && p2_toRight && p3_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 2) {
			if (p3_toRight && p4_toRight) {
				if (
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point3.setAttribute('data-empty', 'yes');
					this.point3.style.backgroundColor = null;
					this.point3 = p3_toRight;
					this.point3.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'yes');
					this.point2.style.backgroundColor = null;
					this.point2 = p2_toRight;
					this.point2.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = '#874da8';
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_toRight;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 3) {
			if (p4_toRight && p2_toRight && p3_toRight) {
				if (
					p4_toRight.getAttribute('data-empty') === 'yes' &&
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
		if (this.position === 4) {
			if (p1_toRight && p4_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					this.point4.setAttribute('data-empty', 'yes');
					this.point4.style.backgroundColor = null;
					this.point4 = p4_toRight;
					this.point4.setAttribute('data-empty', 'no');
					this.point4.style.backgroundColor = '#874da8';

					paint();
				}
			}
		}
	};
	return shapeL_Rev;
}

// let obj_Z = createZ();
function createZ(x = 6, y = 1, shapeZ = {}) {
	shapeZ.position = 1;

	shapeZ.startRow = document.querySelector(`[data-y="${y}"]`);
	shapeZ.yCord = +shapeZ.startRow.getAttribute('data-y');

	shapeZ.point1 = shapeZ.startRow.querySelector(`[data-x="${x}"]`);

	shapeZ.xCord = +shapeZ.point1.getAttribute('data-x');

	shapeZ.point1.style.backgroundColor = '#874da8';
	shapeZ.point2 = document
		.querySelector(`[data-y="${shapeZ.yCord + 1}"]`)
		.querySelector(`[data-x="${shapeZ.xCord}"]`);
	shapeZ.point2.style.backgroundColor = '#874da8';
	shapeZ.point3 = document
		.querySelector(`[data-y="${shapeZ.yCord + 1}"]`)
		.querySelector(`[data-x="${shapeZ.xCord + 1}"]`);
	shapeZ.point3.style.backgroundColor = '#874da8';
	shapeZ.point4 = document
		.querySelector(`[data-y="${shapeZ.yCord}"]`)
		.querySelector(`[data-x="${shapeZ.xCord - 1}"]`);

	shapeZ.point4.style.backgroundColor = '#874da8';
	shapeZ.point1.setAttribute('data-empty', 'no');
	shapeZ.point2.setAttribute('data-empty', 'no');
	shapeZ.point3.setAttribute('data-empty', 'no');
	shapeZ.point4.setAttribute('data-empty', 'no');

	shapeZ.turnShape = function() {
		// debugger;
		let diff_x_p2 = +this.point2.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p2 = +this.point2.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p3 = +this.point3.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p3 = +this.point3.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p4 = +this.point4.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p4 = +this.point4.getAttribute('data-y') - +this.point1.getAttribute('data-y');

		if (diff_y_p2 === 0 && diff_x_p2 < 0) {
			if (
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_x_p3)}"]`)
				// document
				// 	.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
				// 	.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p4)}"]`)
			) {
				if (
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`)
						.getAttribute('data-empty') === 'yes' &&
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_x_p3)}"]`)
						.getAttribute('data-empty') === 'yes'
				) {
					this.point3.style.backgroundColor = null;
					this.point3.setAttribute('data-empty', 'yes');
					this.point3 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_x_p3)}"]`);
					this.point3.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = null;
					this.point2.setAttribute('data-empty', 'yes');
					this.point2 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
					this.point2.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'no');

					this.point4.style.backgroundColor = null;
					this.point4.setAttribute('data-empty', 'yes');
					this.point4 = document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p4)}"]`);
					this.point4.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'no');
					this.position++;
					this.position === 3 ? (this.position = 1) : this.position;
				}
			}
		}
		if (diff_y_p4 === 0 && diff_x_p4 < 0) {
			if (
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p4)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`)
					.getAttribute('data-empty') === 'yes' &&
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_y_p3)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`)
					.getAttribute('data-empty') === 'yes'
			) {
				this.point4.style.backgroundColor = null;
				this.point4.setAttribute('data-empty', 'yes');
				this.point4 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p4)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
				this.point4.style.backgroundColor = '#874da8';
				this.point4.setAttribute('data-empty', 'no');
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p2)}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');

				this.point3.style.backgroundColor = null;
				this.point3.setAttribute('data-empty', 'yes');
				this.point3 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_y_p3)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`);
				this.point3.style.backgroundColor = '#874da8';
				this.point3.setAttribute('data-empty', 'no');

				this.position++;
				this.position === 3 ? (this.position = 1) : this.position;
			}
		}
	};
	shapeZ.moveDown = function() {
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
		let paint = () => {
			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_under;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
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
		};
		if (this.position === 1) {
			if (p2_under && p3_under && p4_under) {
				if (
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes' &&
					p4_under.getAttribute('data-empty') === 'yes'
				) {
					paint();
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
				}
			}
		}
		if (this.position === 2) {
			if (p1_under && p3_under) {
				if (p1_under.getAttribute('data-empty') === 'yes' && p3_under.getAttribute('data-empty') === 'yes') {
					this.point1.setAttribute('data-empty', 'yes');
					this.point1.style.backgroundColor = null;
					this.point1 = p1_under;
					this.point1.setAttribute('data-empty', 'no');
					this.point1.style.backgroundColor = '#874da8';
					paint();
				}
			}
		}
	};
	shapeZ.moveLeft = function() {
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
		let paint = () => {
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
		};
		if (this.position === 1) {
			if (p2_toLeft && p4_toLeft) {
				if (p2_toLeft.getAttribute('data-empty') === 'yes' && p4_toLeft.getAttribute('data-empty') === 'yes') {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p2_toLeft && p3_toLeft && p4_toLeft) {
				if (
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes' &&
					p4_toLeft.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
	};
	shapeZ.moveRight = function() {
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
		let paint = () => {
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
		};
		if (this.position === 1) {
			if (p1_toRight && p3_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p1_toRight && p3_toRight && p4_toRight) {
				if (
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
	};
	return shapeZ;
}

// let obj_Z_Rev = createZ_Rev();
function createZ_Rev(x = 6, y = 1, shapeZ_Rev = {}) {
	shapeZ_Rev.position = 1;

	shapeZ_Rev.startRow = document.querySelector(`[data-y="${y}"]`);
	shapeZ_Rev.yCord = +shapeZ_Rev.startRow.getAttribute('data-y');

	shapeZ_Rev.point1 = shapeZ_Rev.startRow.querySelector(`[data-x="${x}"]`);

	shapeZ_Rev.xCord = +shapeZ_Rev.point1.getAttribute('data-x');

	shapeZ_Rev.point1.style.backgroundColor = '#874da8';
	shapeZ_Rev.point2 = document
		.querySelector(`[data-y="${shapeZ_Rev.yCord + 1}"]`)
		.querySelector(`[data-x="${shapeZ_Rev.xCord}"]`);
	shapeZ_Rev.point2.style.backgroundColor = '#874da8';
	shapeZ_Rev.point3 = document
		.querySelector(`[data-y="${shapeZ_Rev.yCord + 1}"]`)
		.querySelector(`[data-x="${shapeZ_Rev.xCord - 1}"]`);
	shapeZ_Rev.point3.style.backgroundColor = '#874da8';
	shapeZ_Rev.point4 = document
		.querySelector(`[data-y="${shapeZ_Rev.yCord}"]`)
		.querySelector(`[data-x="${shapeZ_Rev.xCord + 1}"]`);

	shapeZ_Rev.point4.style.backgroundColor = '#874da8';
	shapeZ_Rev.point1.setAttribute('data-empty', 'no');
	shapeZ_Rev.point2.setAttribute('data-empty', 'no');
	shapeZ_Rev.point3.setAttribute('data-empty', 'no');
	shapeZ_Rev.point4.setAttribute('data-empty', 'no');

	shapeZ_Rev.turnShape = function() {
		// debugger;
		let diff_x_p2 = +this.point2.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p2 = +this.point2.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p3 = +this.point3.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p3 = +this.point3.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p4 = +this.point4.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p4 = +this.point4.getAttribute('data-y') - +this.point1.getAttribute('data-y');

		if (diff_y_p4 === 0 && diff_x_p4 > 0) {
			if (
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p2)}"]`)
					.getAttribute('data-empty') === 'yes' &&
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p3)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_x_p3)}"]`)
					.getAttribute('data-empty') === 'yes'
			) {
				this.point3.style.backgroundColor = null;
				this.point3.setAttribute('data-empty', 'yes');
				this.point3 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p3)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_x_p3)}"]`);
				this.point3.style.backgroundColor = '#874da8';
				this.point3.setAttribute('data-empty', 'no');
				this.point2.style.backgroundColor = null;
				this.point2.setAttribute('data-empty', 'yes');
				this.point2 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p2)}"]`);
				this.point2.style.backgroundColor = '#874da8';
				this.point2.setAttribute('data-empty', 'no');

				this.point4.style.backgroundColor = null;
				this.point4.setAttribute('data-empty', 'yes');
				this.point4 = document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p4)}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
				this.point4.style.backgroundColor = '#874da8';
				this.point4.setAttribute('data-empty', 'no');
				this.position++;
				this.position === 3 ? (this.position = 1) : this.position;
			}
		}
		if (diff_y_p2 === 0 && diff_x_p2 < 0) {
			if (
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`)
			) {
				if (
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`)
						.getAttribute('data-empty') === 'yes' &&
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`)
						.getAttribute('data-empty') === 'yes'
				) {
					this.point4.style.backgroundColor = null;
					this.point4.setAttribute('data-empty', 'yes');
					this.point4 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p4)}"]`);
					this.point4.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = null;
					this.point2.setAttribute('data-empty', 'yes');
					this.point2 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
					this.point2.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'no');

					this.point3.style.backgroundColor = null;
					this.point3.setAttribute('data-empty', 'yes');
					this.point3 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p3)}"]`);
					this.point3.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'no');

					this.position++;
					this.position === 3 ? (this.position = 1) : this.position;
				}
			}
		}
	};
	shapeZ_Rev.moveDown = function() {
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
		let paint = () => {
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
		};
		if (this.position === 1) {
			if (p2_under && p3_under && p4_under) {
				if (
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes' &&
					p4_under.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p2_under && p4_under) {
				if (p2_under.getAttribute('data-empty') === 'yes' && p4_under.getAttribute('data-empty') === 'yes') {
					paint();
				}
			}
		}
	};
	shapeZ_Rev.moveLeft = function() {
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
		let paint = () => {
			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_toLeft;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
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
			this.point4.setAttribute('data-empty', 'yes');
			this.point4.style.backgroundColor = null;
			this.point4 = p4_toLeft;
			this.point4.setAttribute('data-empty', 'no');
			this.point4.style.backgroundColor = '#874da8';
		};
		if (this.position === 1) {
			if (p1_toLeft && p3_toLeft) {
				if (p1_toLeft.getAttribute('data-empty') === 'yes' && p3_toLeft.getAttribute('data-empty') === 'yes') {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p2_toLeft && p3_toLeft && p4_toLeft) {
				if (
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes' &&
					p4_toLeft.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
	};
	shapeZ_Rev.moveRight = function() {
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
		let paint = () => {
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
		};
		if (this.position === 1) {
			if (p2_toRight && p4_toRight) {
				if (
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p1_toRight && p3_toRight && p4_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
	};
	return shapeZ_Rev;
}
// let obj_Cube = createCube();
function createCube(x = 5, y = 1, shapeCube = {}) {
	shapeCube.position = 1;

	shapeCube.startRow = document.querySelector(`[data-y="${y}"]`);
	shapeCube.yCord = +shapeCube.startRow.getAttribute('data-y');

	shapeCube.point1 = shapeCube.startRow.querySelector(`[data-x="${x}"]`);

	shapeCube.xCord = +shapeCube.point1.getAttribute('data-x');

	shapeCube.point1.style.backgroundColor = '#874da8';
	shapeCube.point2 = document
		.querySelector(`[data-y="${shapeCube.yCord}"]`)
		.querySelector(`[data-x="${shapeCube.xCord + 1}"]`);
	shapeCube.point2.style.backgroundColor = '#874da8';
	shapeCube.point3 = document
		.querySelector(`[data-y="${shapeCube.yCord + 1}"]`)
		.querySelector(`[data-x="${shapeCube.xCord}"]`);
	shapeCube.point3.style.backgroundColor = '#874da8';
	shapeCube.point4 = document
		.querySelector(`[data-y="${shapeCube.yCord + 1}"]`)
		.querySelector(`[data-x="${shapeCube.xCord + 1}"]`);

	shapeCube.point4.style.backgroundColor = '#874da8';
	shapeCube.point1.setAttribute('data-empty', 'no');
	shapeCube.point2.setAttribute('data-empty', 'no');
	shapeCube.point3.setAttribute('data-empty', 'no');
	shapeCube.point4.setAttribute('data-empty', 'no');

	shapeCube.turnShape = function() {};
	shapeCube.moveDown = function() {
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
		let paint = () => {
			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_under;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
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
			this.point1.setAttribute('data-empty', 'yes');
			this.point1.style.backgroundColor = null;
			this.point1 = p1_under;
			this.point1.setAttribute('data-empty', 'no');
			this.point1.style.backgroundColor = '#874da8';
		};
		if (p3_under && p4_under) {
			if (p3_under.getAttribute('data-empty') === 'yes' && p4_under.getAttribute('data-empty') === 'yes') {
				paint();
			}
		}
	};

	shapeCube.moveLeft = function() {
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
		let paint = () => {
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
		};

		if (p1_toLeft && p3_toLeft) {
			if (p1_toLeft.getAttribute('data-empty') === 'yes' && p3_toLeft.getAttribute('data-empty') === 'yes') {
				paint();
			}
		}
	};
	shapeCube.moveRight = function() {
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
		let paint = () => {
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
		};

		if (p2_toRight && p4_toRight) {
			if (p2_toRight.getAttribute('data-empty') === 'yes' && p4_toRight.getAttribute('data-empty') === 'yes') {
				paint();
			}
		}
	};
	return shapeCube;
}
// let obj_Line = createLine();
function createLine(x = 5, y = 1, shapeLine = {}) {
	shapeLine.position = 1;

	shapeLine.startRow = document.querySelector(`[data-y="${y}"]`);
	shapeLine.yCord = +shapeLine.startRow.getAttribute('data-y');

	shapeLine.point1 = shapeLine.startRow.querySelector(`[data-x="${x}"]`);

	shapeLine.xCord = +shapeLine.point1.getAttribute('data-x');

	shapeLine.point1.style.backgroundColor = '#874da8';
	shapeLine.point2 = document
		.querySelector(`[data-y="${shapeLine.yCord}"]`)
		.querySelector(`[data-x="${shapeLine.xCord + 1}"]`);
	shapeLine.point2.style.backgroundColor = '#874da8';
	shapeLine.point3 = document
		.querySelector(`[data-y="${shapeLine.yCord}"]`)
		.querySelector(`[data-x="${shapeLine.xCord + 2}"]`);
	shapeLine.point3.style.backgroundColor = '#874da8';
	shapeLine.point4 = document
		.querySelector(`[data-y="${shapeLine.yCord}"]`)
		.querySelector(`[data-x="${shapeLine.xCord - 1}"]`);

	shapeLine.point4.style.backgroundColor = '#874da8';
	shapeLine.point1.setAttribute('data-empty', 'no');
	shapeLine.point2.setAttribute('data-empty', 'no');
	shapeLine.point3.setAttribute('data-empty', 'no');
	shapeLine.point4.setAttribute('data-empty', 'no');

	shapeLine.turnShape = function() {
		let diff_x_p2 = +this.point2.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p2 = +this.point2.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p3 = +this.point3.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p3 = +this.point3.getAttribute('data-y') - +this.point1.getAttribute('data-y');
		let diff_x_p4 = +this.point4.getAttribute('data-x') - +this.point1.getAttribute('data-x');
		let diff_y_p4 = +this.point4.getAttribute('data-y') - +this.point1.getAttribute('data-y');

		if (diff_y_p2 === 0 && diff_x_p2 > 0) {
			if (
				document.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p4)}"]`) &&
				document.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
			) {
				if (
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`)
						.getAttribute('data-empty') === 'yes' &&
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`)
						.getAttribute('data-empty') === 'yes'
				) {
					this.point2.style.backgroundColor = null;
					this.point2.setAttribute('data-empty', 'yes');
					this.point2 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p2)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
					this.point2.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'no');
					this.point3.style.backgroundColor = null;
					this.point3.setAttribute('data-empty', 'yes');
					this.point3 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') + Math.abs(diff_x_p3)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
					this.point3.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'no');

					this.point4.style.backgroundColor = null;
					this.point4.setAttribute('data-empty', 'yes');
					this.point4 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y') - Math.abs(diff_x_p4)}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x')}"]`);
					this.point4.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'no');
					this.position++;
					this.position === 3 ? (this.position = 1) : this.position;
				}
			}
		}
		if (diff_x_p2 === 0 && diff_y_p2 > 0) {
			if (
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p4)}"]`) &&
				document
					.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`) &&
				document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`)
			) {
				if (
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p4)}"]`)
						.getAttribute('data-empty') === 'yes' &&
					document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`)
						.getAttribute('data-empty') === 'yes' &&
					document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`)
						.getAttribute('data-empty') === 'yes'
				) {
					this.point4.style.backgroundColor = null;
					this.point4.setAttribute('data-empty', 'yes');
					this.point4 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') - Math.abs(diff_y_p4)}"]`);
					this.point4.style.backgroundColor = '#874da8';
					this.point4.setAttribute('data-empty', 'no');
					this.point2.style.backgroundColor = null;
					this.point2.setAttribute('data-empty', 'yes');
					this.point2 = document
						.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`);
					this.point2.style.backgroundColor = '#874da8';
					this.point2.setAttribute('data-empty', 'no');

					this.point3.style.backgroundColor = null;
					this.point3.setAttribute('data-empty', 'yes');
					this.point3 = document
						.querySelector(`[data-y="${+this.point1.getAttribute('data-y')}"]`)
						.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p3)}"]`);
					this.point3.style.backgroundColor = '#874da8';
					this.point3.setAttribute('data-empty', 'no');

					this.position++;
					this.position === 3 ? (this.position = 1) : this.position;
				}
			}
		}
	};

	shapeLine.moveDown = function() {
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
		let paint = () => {
			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_under;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';

			this.point2.setAttribute('data-empty', 'yes');
			this.point2.style.backgroundColor = null;
			this.point2 = p2_under;
			this.point2.setAttribute('data-empty', 'no');
			this.point2.style.backgroundColor = '#874da8';
			this.point1.setAttribute('data-empty', 'yes');
			this.point1.style.backgroundColor = null;
			this.point1 = p1_under;
			this.point1.setAttribute('data-empty', 'no');
			this.point1.style.backgroundColor = '#874da8';
			this.point4.setAttribute('data-empty', 'yes');
			this.point4.style.backgroundColor = null;
			this.point4 = p4_under;
			this.point4.setAttribute('data-empty', 'no');
			this.point4.style.backgroundColor = '#874da8';
		};
		if (this.position === 1) {
			if (p1_under && p2_under && p3_under && p4_under) {
				if (
					p1_under.getAttribute('data-empty') === 'yes' &&
					p2_under.getAttribute('data-empty') === 'yes' &&
					p3_under.getAttribute('data-empty') === 'yes' &&
					p4_under.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p3_under) {
				if (p3_under.getAttribute('data-empty') === 'yes') {
					paint();
				}
			}
		}
	};

	shapeLine.moveLeft = function() {
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
		let paint = () => {
			this.point4.setAttribute('data-empty', 'yes');
			this.point4.style.backgroundColor = null;
			this.point4 = p4_toLeft;
			this.point4.setAttribute('data-empty', 'no');
			this.point4.style.backgroundColor = '#874da8';
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
		};
		if (this.position === 1) {
			if (p4_toLeft) {
				if (p4_toLeft.getAttribute('data-empty') === 'yes') {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p1_toLeft && p2_toLeft && p3_toLeft && p4_toLeft) {
				if (
					p1_toLeft.getAttribute('data-empty') === 'yes' &&
					p2_toLeft.getAttribute('data-empty') === 'yes' &&
					p3_toLeft.getAttribute('data-empty') === 'yes' &&
					p4_toLeft.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
	};
	shapeLine.moveRight = function() {
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
		let paint = () => {
			this.point3.setAttribute('data-empty', 'yes');
			this.point3.style.backgroundColor = null;
			this.point3 = p3_toRight;
			this.point3.setAttribute('data-empty', 'no');
			this.point3.style.backgroundColor = '#874da8';
			this.point2.setAttribute('data-empty', 'yes');
			this.point2.style.backgroundColor = null;
			this.point2 = p2_toRight;
			this.point2.setAttribute('data-empty', 'no');
			this.point2.style.backgroundColor = '#874da8';

			this.point1.setAttribute('data-empty', 'yes');
			this.point1.style.backgroundColor = null;
			this.point1 = p1_toRight;
			this.point1.setAttribute('data-empty', 'no');
			this.point1.style.backgroundColor = '#874da8';
			this.point4.setAttribute('data-empty', 'yes');
			this.point4.style.backgroundColor = null;
			this.point4 = p4_toRight;
			this.point4.setAttribute('data-empty', 'no');
			this.point4.style.backgroundColor = '#874da8';
		};
		if (this.position === 1) {
			if (p3_toRight) {
				if (p3_toRight.getAttribute('data-empty') === 'yes') {
					paint();
				}
			}
		}
		if (this.position === 2) {
			if (p1_toRight && p2_toRight && p3_toRight && p4_toRight) {
				if (
					p1_toRight.getAttribute('data-empty') === 'yes' &&
					p2_toRight.getAttribute('data-empty') === 'yes' &&
					p3_toRight.getAttribute('data-empty') === 'yes' &&
					p4_toRight.getAttribute('data-empty') === 'yes'
				) {
					paint();
				}
			}
		}
	};
	return shapeLine;
}
// pttogh funkcia let stop=setInterval(()=>twocell.turnShape(),1000);
// setTimeout(clearInterval,15000,stop);

//drawing cells and buttons with listeners in IIFE

addEventListener('keydown', function() {
	switch (event.which) {
		case 37:
			currentShape.moveLeft();
			break;
		case 39:
			currentShape.moveRight();
			break;
		case 38:
			currentShape.turnShape();
			break;
		case 40:
			currentShape.moveDown();
			break;
	}
});

function checkFull(y = 4) {
	if (y > 20) {
		return;
	}
	let current = Array.from(document.querySelector(`[data-y='${y}']`).childNodes);
	let upper = Array.from(document.querySelector(`[data-y='${y - 1}']`).childNodes);
	if (current.filter((el) => el.getAttribute('data-empty') === 'yes').length === 0) {
		score++;
		console.log(score);
		current.forEach((el, index) => {
			el.style.backgroundColor = upper[index].style.backgroundColor;
			el.setAttribute('data-empty', `${upper[index].getAttribute('data-empty')}`);
		});

		let newY = y;
		while (newY >= 3) {
			let nextUpper = Array.from(document.querySelector(`[data-y='${newY - 2}']`).childNodes);
			let nextLower = Array.from(document.querySelector(`[data-y='${newY - 1}']`).childNodes);
			nextLower.forEach((el, index) => {
				el.style.backgroundColor = nextUpper[index].style.backgroundColor;
				el.setAttribute('data-empty', `${nextUpper[index].getAttribute('data-empty')}`);
			});
			nextUpper.forEach((el) => {
				el.style.backgroundColor = null;
				el.setAttribute('data-empty', 'yes');
			});
			newY--;
		}
	}
	y++;
	return checkFull(y);
}
