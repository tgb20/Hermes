/*
  Label AruCo markers with text to be displayed when a marker is recognized.
  Marker generation based on code from https://github.com/okalachev/arucogen
*/

// Use the original AruCo markers
const dictName = 'aruco';
const width = 5;
const height = 5;
let size = 50; // mm
let dict; // dictionary of AruCo markers loaded from js/aruco_markers.json
const markerLabels = JSON.parse(localStorage.getItem('markers'));

const remote = require('electron').remote;
const app = remote.app;
const path = app.getAppPath() + '/main';
const main = remote.require(path)

const loadDict = fetch('js/aruco_dict.json').then( (resp) => {
	return resp.json();
});

function generateMarkerSvg(width, height, bits) {
    var svg = document.createElement('svg');
    svg.setAttribute('viewBox', '0 0 ' + (width + 2) + ' ' + (height + 2));
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('shape-rendering', 'crispEdges'); // disable anti-aliasing to avoid little gaps between rects

	// Background rect
    const rect = document.createElement('rect');
    rect.setAttribute('fill', 'black');
    rect.setAttribute('x', 0);
    rect.setAttribute('y', 0);
    rect.setAttribute('width', width + 2);
    rect.setAttribute('height', height + 2);
    svg.appendChild(rect);

	// "Pixels"
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const color = bits[i * height + j] ? 'white' : 'black';
            const pixel = document.createElement('rect')
            pixel.setAttribute('fill', color);
            pixel.setAttribute('x', j + 1);
            pixel.setAttribute('y', i + 1);
            pixel.setAttribute('width', 1);
            pixel.setAttribute('height', 1);
            svg.appendChild(pixel);
		}
	}

	return svg;
}

function generateArucoMarker(width, height, dictName, id) {
	// console.log('Generate ArUco marker ' + dictName + ' ' + id);

	var bytes = dict[dictName][id];
	var bits = [];
	var bitsCount = width *  height;

	// Parse marker's bytes
	for (var byte of bytes) {
		var start = bitsCount - bits.length;
		for (var i = Math.min(7, start - 1); i >= 0; i--) {
			bits.push((byte >> i) & 1);
		}
	}

	return generateMarkerSvg(width, height, bits);
}

function generateMarkerTableRow(markerId) {
    const row = document.createElement('tr');
    const svg = generateArucoMarker(width, height, dictName, markerId, size);
    
    const id = document.createElement('td');
    id.innerHTML = markerId;
    row.appendChild(id);
    
    const marker = document.createElement('td');

    marker.classList.add('class="mdl-data-table__cell--non-numeric');
    marker.innerHTML = svg.outerHTML;
    row.appendChild(marker);
    
    const description = document.createElement('td');
    description.classList.add('class="mdl-data-table__cell--non-numeric');
    
    const form = document.createElement('form');
    form.action = "#";
    
    const textfield = document.createElement('div');
    textfield.classList.add('mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('mdl-textfield__input');
    input.setAttribute('id', markerId);
    if (markerLabels && markerLabels.hasOwnProperty(markerId)) {
        input.setAttribute('value', markerLabels[markerId]); 
    }
    textfield.appendChild(input);

    const label = document.createElement('label');
    label.setAttribute('for', markerId);
    label.classList.add('mdl-textfield__label');
    textfield.appendChild(label);

    form.appendChild(textfield);
    description.innerHTML = form.outerHTML;
    row.appendChild(description);

    return row;
}

// Update local storage with new labels
function inputHandler(e) {
    let markers = {};
    const inputs = document.querySelectorAll('input');
    inputs.forEach( input => {
        markers[input.id] = input.value;
    });
    localStorage.setItem('markers', JSON.stringify(markers));
    main.updateMarkers();
}

function start() {
    // Wait until dict data is loaded
    loadDict.then( 
        (data) => {
            dict = data;
            const tbody = document.querySelector('tbody');
            for (const i of Array(10).keys()) {
                const row = generateMarkerTableRow(i)
                tbody.appendChild(row);
            }
            // Add event listeners to the input fields
            const inputs = document.querySelectorAll('input');
            inputs.forEach( input => {
                input.addEventListener('input', inputHandler);
            });
        }
    )
}
