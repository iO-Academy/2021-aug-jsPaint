// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')

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
    ctx.lineTo(event.offsetX, event.offsetY)
    if (!painting) {
        // When not painting, begin a new path
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    } else {
        // When painting, draw a line to...
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke()
    }
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
    canvas.classList.add('brush');
}

let sizePicker = document.querySelector('#sizeForm')


sizePicker.addEventListener('change', sizeChange)
canvas.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
canvas.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)

function sizeChange(e){
    canvas.width = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.width)
    canvas.height = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.height)
}
