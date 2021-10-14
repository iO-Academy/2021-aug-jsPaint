// Select the canvas in the dom for the paint canvas
const canvas = document.querySelector('.canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Select the canvas in the dom for the text canvas
const canvasTextC = document.querySelector('.canvasText')
// Sets the canvas to 2D drawing
const ctxText = canvasTextC.getContext('2d')
// Sets the connection to paintbrush button
const paintbrush = document.querySelector('.painter')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')
//Sets the connection to the text input form
const formText = document.querySelector('#formText')
//Sets the connection to the text button
const textButton = document.querySelector('#textButton')
//Sets the connection to input
const textInput = document.querySelector('#text')
//Sets the connection to the text form submit
const textSubmit = document.querySelector('#submit')

//Create a texts array to hold text objects
let texts = []
//Holds the index (in the array) of the hit-selected text
let selectedText = -1
let startX
let startY
let mouseX
let mouseY

// Sets the default mode to brush and painting to false
let mode = 'brush'
let painting = false

// Adds an event listener which updates mode to brush on clicking brush button
paintbrush.addEventListener('click', function () {
    mode = 'brush'
})

// Adds an event listener which updates mode to eraser on clicking eraser button
eraser.addEventListener('click', function () {
    mode = 'eraser'
})

// If there is a canvas
if (canvas) {
    // Add an event listener to draw a line on dragging the mouse
    canvas.addEventListener('mousemove', drawLine)
    // Start painting on click event
    canvas.addEventListener('mousedown', startPainting)
    // Stop painting on stopping clicking/off page
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
}

// If there is a text canvas
if (canvasTextC) {
    // Add an event listener to draw a line on dragging the mouse
    canvasTextC.addEventListener('mousemove', moveText)
    // Start painting on click event
    canvasTextC.addEventListener('mousedown', startText)
    // Stop painting on stopping clicking/off page
    canvasTextC.addEventListener('mouseup', stopText)
    canvasTextC.addEventListener('mouseleave', stopText)
}

//Draw text clears the canvas and redraws it based on the texts array
function drawText() {
    //Find the canvas height and width from the canvasText html
    let canvasWidth = document.querySelector('.canvasText').getAttribute('width')
    let canvasHeight = document.querySelector('.canvasText').getAttribute('height')
    //Clear the canvas - using the above calculated width and height
    ctxText.clearRect(0, 0, parseInt(canvasWidth), parseInt(canvasHeight))
    //Loops through each item in the text array and uses the fill text function to add each text object to the canvas
    for (let i = 0; i < texts.length; i++) {
        let text = texts[i]
        ctxText.fillText(text.text, text.x, text.y)
    }
}

//Test if the x,y is inside the bounding box of texts[textIndex]- if it has changed
function textHitTest(x, y, textIndex) {
    let text = texts[textIndex]
    //returns a true or false statement
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y)
}

function startText(e) {
    //finds the users starting x and y position. parseInt parses a string argument and returns an integer. PageX -
    //the x coordinate of where the mouse event happened in the DOCUMENT (works with scroll). offsetLeft returns the left position relative
    //to the left side of the offsetParent element (nearest parent that has a position other than static.
    startX = e.pageX - canvasTextC.offsetLeft
    startY = e.pageY - canvasTextC.offsetTop

    //iterates through the texts[] array to check if each piece of text has been moved. If true sets the selectedText
    //index to its index in the array
    for (let i = 0; i < texts.length; i++) {
        if (textHitTest(startX, startY, i)) {
            selectedText = i;
        }
    }
}

function stopText() {
    selectedText = -1
}

function moveText(event) {
        //If text has been selected- handle the mousemove event
        //Calculate where the mouse now is
        mouseX = event.pageX - canvasTextC.offsetLeft
        mouseY = event.pageY - canvasTextC.offsetTop

        //Calculate how far the mouse has moved since the last mouseevent
        let dx = mouseX - startX
        let dy = mouseY - startY
        //Set the mouse start values to the last mouse position
        startX = mouseX
        startY = mouseY

        //Find the text item being moved in the texts[] array
        let text = texts[selectedText]

        //Add the new x and y positions to the array
        text.x += dx
        text.y += dy
        //Redraw the text canvas
        drawText()
}

formText.addEventListener('submit', e => {

    e.preventDefault()
    //Create a variable to contain the users text input
    let textSubmitted = document.querySelector('input').value

    //Calc the y coordinate for this text on the canvas
    let y = texts.length * 50 + 50

    //Create a text object to contain the users text input and give the text a fixed position on the text canvas
    let textObj = {
        text: textSubmitted,
        x: 10,
        y: y
    }

    //Set the font of the text
    ctxText.font = '50px "Hiragino Maru Gothic Pro"'

    //Calculate the size of the text for hit-testing purposes (checking whether the text has moved)
    textObj.width = ctxText.measureText(textSubmitted.text).width
    textObj.height = 50

    //Add the text object to the texts array
    texts.push(textObj)

    //Redraw the text canvas
    drawText()
})

//when the text button is clicked, the text input and submit button are revealed and the pointer events on the text
// canvas is changed from none to auto and the paint canvas from auto to none.
textButton.addEventListener('click', e => {
    e.preventDefault()
    textInput.setAttribute('type', 'text')
    textSubmit.setAttribute('type', 'submit')
    canvasTextC.style.pointerEvents =  'auto'
    canvas.style.pointerEvents = 'none'
})



/** Function to disconnect lines when not painting, paint where mouse is when clicking down
 * Dependant on mode set, use black for brush and white for eraser
 *
 * @param event
 */
function drawLine(event) {
    if (!painting) {
        // When not painting, begin a new path
        ctx.beginPath()
        ctx.moveTo(event.offsetX, event.offsetY)
    } else {
        // When painting, draw a line to...
        ctx.lineTo(event.offsetX, event.offsetY)
        // If the mode is set to brush, draw in black
        if (mode === 'brush') {
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 5
            // if the mode is set to eraser, draw white lines
        } else if (mode === 'eraser') {
            ctx.strokeStyle = '#FFFFFF'
            ctx.lineWidth = 15
        }
        ctx.stroke()
    }
}

function startPainting() {
    painting = true
}

function stopPainting() {
    painting = false
}