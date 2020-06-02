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
switch (randomArr[1]) {
}
let cells = Array.from(document.getElementsByClassName('matrix-cell'));
let tempArr = shape_Line.flat(1);
cells.forEach((el, index) => (tempArr[index] ? (el.style.backgroundColor = '#874da8') : el));
