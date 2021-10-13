// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Sets the connection to paintbrush button
const paintbrush = document.querySelector('.painter')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')

// Sets the default mode to brush and painting to false
let painting = false
let eraseMode = false
let colourMode = 'black'


let buttons = document.querySelectorAll('.mode')
buttons.forEach(function(button){
    if(button.name === 'eraser'){
        button.addEventListener('click', eraseTrue)
    }else{
        button.addEventListener('click', eraseFalse)
    }
    if(button.hasAttribute('data-colour')){
        button.addEventListener('click', colourPicker)
    }
    button.addEventListener('click', clickShow)
})

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
        // When painting, draw a line to...
        ctx.lineTo(event.offsetX, event.offsetY)
        if(eraseMode === true){
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 20
        } else if(colourMode) {
            ctx.strokeStyle = colourMode
            ctx.lineWidth = 5
        }
        ctx.stroke()
    }
}

function stopPainting() {
    painting = false;
}

function eraseTrue() {
    eraseMode = true;
}

function eraseFalse() {
    eraseMode = false;
}

function startPainting() {
    painting = true;
}


function colourPicker(e){
    colourMode = e.currentTarget.dataset.colour
}

/*
Sets a class to a button so that when it is clicked the button gets a thick black outline
 */
function clickShow(e){
    buttons.forEach(function(button){
        button.classList.remove('clicked')
    })
    e.currentTarget.classList.add('clicked')
}


