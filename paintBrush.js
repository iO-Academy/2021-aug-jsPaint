// Select the canvas in the dom for the paint canvas
const canvas = document.querySelector('.canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Select the canvas in the dom for the text canvas
const canvasTextC = document.querySelector('.canvasText')
console.log(canvasTextC)
// Sets the canvas to 2D drawing
const ctxText = canvasTextC.getContext('2d')
// Sets the connection to paintbrush button
const paintbrush = document.querySelector('.painter')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')

//Create a texts array to hold text objects
let texts = []
//Holds the index (in the array) of the hit-selected text
let selectedText = -1

// Sets the default mode to brush and painting to false
let mode = 'brush'
let painting = false

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
    canvasTextC.addEventListener('mousemove', drawLine)
    // Start painting on click event
    canvasTextC.addEventListener('mousedown', startPainting)
    // Stop painting on stopping clicking/off page
    canvasTextC.addEventListener('mouseup', stopPainting)
    canvasTextC.addEventListener('mouseleave', stopPainting)
}

//Draw text clears the canvas and redraws it based on the texts array
function drawText() {
    //Find the canvas height and width from the canvasText html
    let canvasWidth = document.querySelector('.canvasText').getAttribute('width')
    let canvasHeight = document.querySelector('.canvasText').getAttribute('height')
    //Clear the canvas - using the above calculated width and height
    ctxText.clearRect(0, 0, canvasWidth, canvasHeight)
    //Loops through each item in the text array and uses the fill text function to add each text object to the canvas
    for (var i = 0; i < texts.length; i++) {
        var text = texts[i]
        ctxText.fillText(text.text, text.x, text.y)
    }
}

//Test if the x,y is inside the bounding box of texts[textIndex]- if it has changed
function textHittest(x, y, textIndex) {
    var text = texts[textIndex]
    //returns a true or false statement
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y)
}

//Iterates through the texts[] array and see's if the user clicked (mouseddown) on one of them
//If yes, sets the selectedText to the index of that text
function startPainting(e) {
    //finds the users starting x and y position. parseint parses a string argument and returns an integer. ClientX -
    //the x coordinate of where the mouse event happened in the viewport. offsetleft returns the left position relative
    //to the left side of the offsetParent element (nearest parent that has a position other than static.
    startX = parseInt(e.clientX - canvasTextC.offsetLeft)
    startY = parseInt(e.clientY - canvasTextC.offsetTop)

    console.log({startx: startX, starty: startY})

    //Itterates through the texts[] array to check if each piece of text has been moved. If true sets the selectedText
    //index to its index in the array
    for (var i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
        }
    }

    //if no text has been moved, sets painting to true
    if (selectedText === -1) {
        painting = true
    }
}

function stopPainting() {
    painting = false
    selectedText = -1
}

/** Function to disconnect lines when not painting, paint where mouse is when clicking down
 * Dependant on mode set, use black for brush and white for eraser
 *
 * @param event
 */
function drawLine(event) {
    //If no text has been selected either paint or erase
    if (selectedText < 0) {
        if (!painting) {
            // When not painting, begin a new path
            ctx.beginPath();
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
    } else {    //If text has been selected- handle the mousemove event
        //Calculate where the mouse now is
        mouseX = parseInt(event.clientX - canvasTextC.offsetLeft)
        mouseY = parseInt(event.clientY - canvasTextC.offsetTop)

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
}

//story 7
document.querySelector('form').addEventListener('submit', e => {

    e.preventDefault()
    //Create a variable to contain the users text input
    let textSubmitted = document.querySelector('input').value

    //Calc the y coordinate for this text on the canvas
    var y = texts.length * 50 + 50

    //Create a text object to contain the users text input and give the text a fixed position on the text canvas
    let textObj = {
        text: textSubmitted,
        x: 10,
        y: y
    }

    //Set the font of the text
    ctxText.font = '50px "Hiragino Maru Gothic Pro"'

    //Calculate the size of the text for hit-testing purposes (checking whether the text has moved)
    textObj.width = ctxText.measureText(text.text).width
    textObj.height = 50

    //Add the text object to the texts array
    texts.push(textObj)

    //Redraw the text canvas
    drawText()
})

//when the text button is clicked, the text input and submit button are revealed and the pointer events on the text
// canvas is changed from none to auto and the paint canvas from auto to none.
document.querySelector('.text').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('#text').setAttribute('type', 'text')
    document.querySelector('#submit').setAttribute('type', 'submit')
    document.querySelector(".canvasText").style.pointerEvents =  "auto"
    document.querySelector(".canvas").style.pointerEvents = "none"
})
