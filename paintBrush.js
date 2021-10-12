
// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')

// Set canvas height in JS to match css height.
canvas.width = 500;
canvas.height = 500;

let mode = 'brush';

function drawLine(event){
    ctx.lineTo(event.offsetX, event.offsetY)
    if (!painting) {
        // When not painting, begin a new path
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    } else {
        // When painting, draw a line to...
        ctx.lineTo(event.offsetX, event.offsetY)
        if (mode!=='brush') {
            ctx.strokeStyle = '#FFFFFF';
        }
        ctx.stroke()
    }

}

let painting = false;
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
    if (painting === true) {
        canvas.classList.add('brush');
    }
}