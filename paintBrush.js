// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
const paintbrush = document.querySelector('.painter')
const eraser = document.querySelector('.eraser')
let mode = 'brush'

paintbrush.addEventListener('click', function (event) {
    mode = 'brush'
})

eraser.addEventListener('click', function (event) {
    mode = 'eraser'
})

let painting = false;
if (canvas) {
    canvas.addEventListener('mousemove', drawLine);
    // Start painting on click event
    canvas.addEventListener('mousedown', startPainting);
    // Stop painting on stopping clicking/off page
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}

function drawLine(event) {
    if (!painting) {
        // When not painting, begin a new path
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    } else {
        // When painting, draw a line to...
        ctx.lineTo(event.offsetX, event.offsetY)
        // if the mode is set to eraser, draw white lines
        if (mode === 'brush') {
            ctx.strokeStyle = '#000000';
        } else if (mode === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
        }
        ctx.stroke()
    }
}

if (canvas) {
    canvas.addEventListener('mousemove', drawLine);
    // Start painting on click event
    canvas.addEventListener('mousedown', startPainting);
    // Stop painting on stopping clicking/off page
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);

}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

