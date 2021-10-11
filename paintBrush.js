const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 500;
canvas.height = 500;

function drawLine(event){
    ctx.lineTo(event.offsetX, event.offsetY)
    if (!painting) {
        // When not painting, begin a new path
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    } else {
        ctx.lineTo(event.offsetX, event.offsetY)
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

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
    if (painting === true) {
        canvas.classList.add('brush');
    }
}