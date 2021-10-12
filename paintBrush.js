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
    // ctx.lineTo(event.offsetX, event.offsetY)
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


//story 7
document.querySelector('form').addEventListener('submit', e => {

    e.preventDefault()
    // created a variable to contain the users text input
    let text = document.querySelector('input').value
    console.log(text)
    ctx.font = '50px "Hiragino Maru Gothic Pro"'
    //create a fill text function that places the users text input at a set
    //place on the canvas
    ctx.fillText(text, 10, 50)
})

