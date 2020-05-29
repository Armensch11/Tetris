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

//event trigger after some time

// function caller(fn, del) {
// 	caller.oldTime = Date.now();

// 	return function() {
// 		return Date.now() - caller.oldTime;
// 	};
// }
// function callInSetInterval() {
// 	console.log('I am called in  every 200ms');
// }
// function makeObj(name, surname) {
// 	return {
// 		name,
// 		surname
// 	};
//
// let x_tri = 2;
// let y_tri = 1;
// let templateArr = [ [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ] ];
// for (let i = 0; i < templateArr.length; i++) {
// 	for (let j = 0; j < templateArr[i].length; j++) {
// 		if (i === y_tri && (j === x_tri - 1 || j === x_tri || j === x_tri + 1)) {
// 			templateArr[i][j] = 1;
// 		}
// 		if (i === y_tri + 1 && j === x_tri) {
// 			templateArr[i][j] = 1;
// 		}
// 	}
// }?
// function getRandomColor() {
// 	var letters = '0123456789ABCDEF';
// 	var color = '#';
// 	for (var i = 0; i < 6; i++) {
// 		color += letters[Math.floor(Math.random() * 16)];
// 	}
// 	return color;
// }
// let triMatrix = [
// 	[ 0, 0, 0 ],
// 	[ shapeTriangle.point2, shapeTriangle.point1, shapeTriangle.point3 ],
// 	[ 0, shapeTriangle.point4, 0 ]
// ];
// let stop = setInterval(
// 	() =>
// 		triMatrix.forEach((el) =>
// 			el.forEach((el) => (el ? (el.style.backgroundColor = `${getRandomColor()}`) : null))
// 		),
// 	500
// );
// setTimeout(clearInterval, 20000, stop);
// triMatrix.forEach((el) => el.forEach((el) => (el ? (el.style.backgroundColor = `${getRandomColor()}`) : null)));

// console.log(triMatrix);
let obj_Line = createLine();
function createLine(x = 3, y = 7, shapeLine = {}) {
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

	shapeLine.turnShape = function() {};
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
	return shapeLine;
}

function isLineFull(y = 20) {
	if (y === 1) {
		return;
	}

	let upper = Array.from(document.querySelector(`[data-y='${y - 1}']`).childNodes);
	let current = Array.from(document.querySelector(`[data-y='${y}']`).childNodes);
	if (current.filter((el) => el.getAttribute('data-empty') === 'yes').length === 0) {
		current.forEach((el, index) => {
			el.style.backgroundColor = upper[index].style.backgroundColor;
			el.setAttribute('data-empty', `${upper[index].getAttribute('data-empty')}`);
		});
		upper.forEach((el) => {
			el.style.backgroundColor = null;
			el.setAttribute('data-empty', 'yes');
		});
	}
	// debugger;
	if (current.filter((el) => el.getAttribute('data-empty') === 'no').length === 0) {
		while (upper.filter((el) => el.getAttribute('data-empty') === 'no').length > 0) {
			if (upper.filter((el) => el.getAttribute('data-empty') === 'yes').length !== 0) {
				current.forEach((el, index) => {
					el.style.backgroundColor = upper[index].style.backgroundColor;
					el.setAttribute('data-empty', `${upper[index].getAttribute('data-empty')}`);
				});
				upper.forEach((el) => {
					el.style.backgroundColor = null;
					el.setAttribute('data-empty', 'yes');
				});
			} else {
				upper.forEach((el) => {
					el.style.backgroundColor = null;
					el.setAttribute('data-empty', 'yes');
				});
			}
		}
	}
	y--;
	return isLineFull(y);
}

shapeTriangle.canTurn = function() {
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
		} else {
			if (
				document
					.querySelector(`[data-y="${this.point1.getAttribute('data-y')}"]`)
					.querySelector(`[data-x="${+this.point1.getAttribute('data-x') + Math.abs(diff_y_p2)}"]`)
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
};
