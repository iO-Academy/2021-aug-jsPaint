// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Sets the connection to paintbrush button
const paintbrush = document.querySelector('.painter')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')

// Sets the default mode to brush and painting to false
let mode = 'brush'
let painting = false;

// Adds an event listener which updates mode to brush on clicking brush button
paintbrush.addEventListener('click', function (event) {
    mode = 'brush'
})

// Adds an event listener which updates mode to eraser on clicking eraser button
eraser.addEventListener('click', function (event) {
    mode = 'eraser'
})

// If there is a canvas
if (canvas) {
    // Add an event listener to draw a line on dragging the mouse
    canvas.addEventListener('mousemove', drawLine);
    // Start painting on click event
    canvas.addEventListener('mousedown', startPainting);
    // Stop painting on stopping clicking/off page
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}

/** Function to disconnect lines when not painting, paint where mouse is when clicking down
 * Dependant on mode set, use black for brush and white for eraser
 *
 * @param event
 */
function drawLine(event) {
    if (!painting) {
        // When not painting, begin a new path
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    } else {
        document.querySelector('#sizeForm').disabled = true
        // When painting, draw a line to...
        ctx.lineTo(event.offsetX, event.offsetY)
        // If the mode is set to brush, draw in black
        if (mode === 'brush') {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 5;
            // if the mode is set to eraser, draw white lines
        } else if (mode === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 15;
        }
        ctx.stroke()
    }
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

let sizePicker = document.querySelector('#sizeForm')

sizePicker.addEventListener('change', sizeChange)
canvas.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
canvas.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)

function sizeChange(e){
    canvas.width = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.width)
    canvas.height = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.height)
}

const sizeOptions = document.querySelectorAll('#sizeForm > option')
const main = document.querySelector('main')
sizeOptions.forEach(function(sizeOption){
    if(main.scrollWidth < sizeOption.dataset.width || main.scrollHeight < sizeOption.dataset.height) {
        sizeOption.disabled = true
    }
})

