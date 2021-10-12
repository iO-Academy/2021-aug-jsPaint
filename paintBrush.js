// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')

let painting = false;

let mode = 'painter'

let buttons = document.querySelectorAll('.mode')
buttons.forEach(function(button){
    button.addEventListener('click', colourPicker)
    button.addEventListener('click', clickShow)
})

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
        switch (mode){
            case 'painter':
                ctx.strokeStyle = '#000000'
                ctx.lineWidth = 5
                break
            case 'eraser':
                ctx.strokeStyle = '#ffffff'
                ctx.lineWidth = 15
                break
            case 'red':
                ctx.strokeStyle = '#ff0000'
                ctx.lineWidth = 5
                break
            case 'blue':
                ctx.strokeStyle = '#0000ff'
                ctx.lineWidth = 5
                break
            case 'green':
                ctx.strokeStyle = '#008000'
                ctx.lineWidth = 5
                break
            case 'yellow':
                ctx.strokeStyle = '#ffff00'
                ctx.lineWidth = 5
                break
            case 'orange':
                ctx.strokeStyle = '#ffa500'
                ctx.lineWidth = 5
                break
            default:
                ctx.strokeStyle = '#000000'
                ctx.lineWidth = 5
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

function colourPicker(e){
    mode = e.currentTarget.name
}

function clickShow(){
    buttons.forEach(function(button){
        if (button.name === mode) {
            button.classList.add('clicked')
        } else if (button.name !== mode) {
            button.classList.remove('clicked')
        }
    })
}

