let shape_L = [ [ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 1, 1, 0 ] ];
let shape_L_rev = [ [ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ], [ 1, 1, 0, 0 ] ];
let shape_Z = [ [ 0, 1, 1, 0 ], [ 0, 0, 1, 1 ], [ 0, 0, 0, 0 ] ];
let shape_Z_rev = [ [ 0, 1, 1, 0 ], [ 1, 1, 0, 0 ], [ 0, 0, 0, 0 ] ];
let shape_Triangle = [ [ 0, 1, 1, 1 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 0 ] ];
let shape_Cube = [ [ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ] ];
let shape_Line = [ [ 0, 0, 0, 0 ], [ 1, 1, 1, 1 ], [ 0, 0, 0, 0 ] ];
let shapeIconArr;
function iconCreator(...fig) {
	return fig;
}
shapeIconArr = iconCreator(shape_L, shape_L_rev, shape_Z, shape_Z_rev, shape_Triangle, shape_Cube, shape_Line);

let matrixPlace = document.getElementById('matrix');
for (let i = 0; i < 4; i++) {
	let matrixRow = document.createElement('div');
	matrixRow.classList.add('matrix-row');

	for (let j = 0; j < 4; j++) {
		let matrixCol = document.createElement('div');
		matrixCol.classList.add('matrix-cell');

		matrixCol.setAttribute('y', `${i + 1}`);
		matrixCol.setAttribute('x', `${j + 1}`);
		matrixRow.appendChild(matrixCol);
	}
	matrixPlace.appendChild(matrixRow);
}
function iconSwitch(next) {
	let temp;
	let tempArr;
	let cells = document.getElementsByClassName('matrix-cell');
	for (let cell of cells) {
		cell.style.backgroundColor = null;
	}
	switch (next) {
		case 1:
			temp = Array.from(document.getElementsByClassName('matrix-cell'));
			tempArr = shape_L.flat(1);
			temp.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
			break;
		case 2:
			temp = Array.from(document.getElementsByClassName('matrix-cell'));
			tempArr = shape_L_rev.flat(1);
			temp.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
			break;
		case 3:
			temp = Array.from(document.getElementsByClassName('matrix-cell'));
			tempArr = shape_Z.flat(1);
			temp.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
			break;
		case 4:
			temp = Array.from(document.getElementsByClassName('matrix-cell'));
			tempArr = shape_Z_rev.flat(1);
			temp.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
			break;
		case 5:
			temp = Array.from(document.getElementsByClassName('matrix-cell'));
			tempArr = shape_Triangle.flat(1);
			temp.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
			break;
		case 6:
			temp = Array.from(document.getElementsByClassName('matrix-cell'));
			tempArr = shape_Cube.flat(1);
			temp.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
			break;
		default:
			temp = Array.from(document.getElementsByClassName('matrix-cell'));
			tempArr = shape_Line.flat(1);
			temp.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
	}
}
// let cells = Array.from(document.getElementsByClassName('matrix-cell'));
// let tempArr = shape_Line.flat(1);
// cells.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
// let shapeArr = [ createLine, createL, createL_Rev, createZ, createZ_Rev, createTriangle, createCube ];
// function randShape() {
// 	let randIndex = Math.floor(Math.random() * shapeArr.length);
// 	randIndex === 7 ? (randIndex = 6) : randIndex;
// 	// iconSwitch(randIndex);
// 	// console.log(randIndex);
// 	// return shapeArr[randIndex];
// 	return randIndex;
// }
// const nextElArr = new Array(2);
// nextElArr[0] = shapeArr[randShape()];
// nextElArr[1] = shapeArr[randShape()];
// // function shapeGen() {
// // 	currentShape = randShape()();
// // }
// start.addEventListener('click', () => {
// 	clickCounter++;
// 	if (clickCounter % 2) {
// 		currentShape = nextElArr[0]();

// 		stopID = setTimeout(function newShape() {
// 			currentShape.moveDown();
// 			arrY.push(+currentShape.point1.getAttribute('data-y'));
// 			scoreTab.innerHTML = `${score}`;
// 			// console.log(currentShape.point1.getAttribute('data-y'));
// 			if (arrY[arrY.length - 1] === arrY[arrY.length - 2]) {
// 				arrY = [];

//                 checkFull();
//                 nextElArr[0]=nextElArr[1];
//                 currentShape=nextElArr[0]();
//                 nextElArr[1]=shapeArr[randShape()];
// 				// shapeGen();
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
