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

//story 7
document.querySelector('form').addEventListener('submit', e => {

    e.preventDefault()
    // created a variable to contain the users text input
    let text = document.querySelector('input').value
    ctx.font = '50px "Hiragino Maru Gothic Pro"'
    //create a fill text function that places the users text input at a set
    //place on the canvas
    ctx.fillText(text, 10, 50)
})

//when the text button is clicked, it should reveal the text input
document.querySelector('.text').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('#text').setAttribute('type', 'text')
    document.querySelector('#submit').setAttribute('type', 'submit')
})
// story 9
document.querySelector('.print').addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()

    // Store DIV contents in the variable.
    let canvasToPrint = document.querySelector('.canvas')
    // Create a window object.
    let win = window.open('', '', 'height=700,width=700')
    // Open the window. Its a popup window.
    // win.document.write("Hello World");
    win.document.write("<br><img src = '"+canvasToPrint.toDataURL()+"'/>")
    // Write contents in the new window.
    win.setTimeout(() => win.print(), 0)
    win.document.close()
})


