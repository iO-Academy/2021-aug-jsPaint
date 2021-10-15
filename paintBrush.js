// Select the canvas in the dom for the text canvas
const canvasTextC = document.querySelector('.canvasText')
// Sets the canvas to 2D drawing
const ctxText = canvasTextC.getContext('2d')
//Sets the connection to the text input form
const formText = document.querySelector('#textForm')
//Sets the connection to the text button
const textButton = document.querySelector('#textButton')
//Sets the connection to input
const textInput = document.querySelector('#textInput')
//Sets the connection to the text form submit
const textSubmit = document.querySelector('#textSubmit')
//Sets the connection to canvi
const canvi = document.querySelector('.canvi')
//Sets the connection to the print button
const print = document.querySelector('.print')


//Create a texts array to hold text objects
let texts = []
//Holds the index (in the array) of the hit-selected text
let selectedText = -1
let startX
let startY
let mouseX
let mouseY


// Variables

// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')
// Sets the connection to the canvas size menu
const sizePicker = document.querySelector('#sizeForm')
// Connects to all the buttons in the toolbar
const buttons = document.querySelectorAll('.button')
// Sets a connection to all the canvas size options
const sizeOptions = document.querySelectorAll('#sizeForm > option')
// Connects to <main>
const main = document.querySelector('main')
// Sets the connection to the colour picker
const colourPicker = document.querySelector('#colourPicker')
// Sets the connection to the background colour picker
const bgButton = document.querySelector('#bgColour')
// Sets the connection to the clear canvas button
const clearCan = document.querySelector('.clearCan')

canvas.style.background = "white"
// Sets the default mode to brush and painting to false
let painting = false
let eraseMode = false
let colourMode = 'black'
let eraseColour = 'white'

//Sets canvas width and height to small
canvas.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
canvas.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)
canvasTextC.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
canvasTextC.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)
canvi.style.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width) + 'px'
canvi.style.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height) + 'px'
// Disables canvas size options that are bigger than your viewport
sizeOptions.forEach(function(sizeOption){
    if((window.innerWidth - 200) < sizeOption.dataset.width || (window.innerHeight - 100) < sizeOption.dataset.height) {
        sizeOption.disabled = true
    }
})

// Sets the initial background colour to white
canvas.style.background= 'white'

//Event listeners
eraser.addEventListener('click', eraseTrue)
colourPicker.addEventListener('click', eraseFalse)
eraser.addEventListener('click', clickShow)
colourPicker.addEventListener('change', pickColour)
clearCan.addEventListener('click', clearClicked)

//Add event listeners to all the buttons
buttons.forEach(function(button){
    if(button.name === 'eraser'){
        button.addEventListener('click', eraseTrue)
    } else {
        button.addEventListener('click', eraseFalse)
    }
    button.addEventListener('click', textToggle)
    button.addEventListener('click', clickShow)
})

//Adds event listeners to the canvas
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

//when the text button is clicked, it should reveal the text input
textButton.addEventListener('click', e => {
    e.preventDefault()
    textInput.setAttribute('type', 'text')
    textSubmit.setAttribute('type', 'submit')
})
// Adds event listener to the canvas size menu
sizePicker.addEventListener('change', sizeChange)

//Functions

// Functions to stop and start painting, and erasing
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

//story 7
document.querySelector('#textForm').addEventListener('submit', e => {

    e.preventDefault()
    // created a variable to contain the users text input
    let text = document.querySelector('#text').value
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

/**
 * Sets a class to a button so that when it is clicked the button gets a thick black outline
 *
 */
function pickColour() {
    colourMode = colourPicker.value
}

function clickShow(e){
    buttons.forEach(function(button){
        button.classList.remove('clicked')
    })
    e.currentTarget.classList.add('clicked')
}


/**
 * Function to stop adding and moving text
 */
function stopText() {
    selectedText = -1
}

/**
 * Function to move text added to the text canvas around the text canvas
 *
 * @param event
 */
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
    let textSubmitted = document.querySelector('#textInput').value

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
})

print.addEventListener('click', e => {
    e.preventDefault()
    // Create a window object
    let win = window.open('', '', 'height=700,width=700')
    //display the contents of the canvas as an image in the window
    win.document.write("<div style='position:relative'></div><br><img src = '"+canvas.toDataURL()+"'/><img src = '"+canvasTextC.toDataURL()+"' style='position: absolute; left: 0;'/></div>")
    // Print the contents of the window then close it
    win.setTimeout(() => {
        win.print()
        win.close()
    }, 0)
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
        if (!sizePicker.disabled) {
            sizePicker.disabled = true
            bgButton.disabled = true
        }
        if (!bgButton.disabled) {
            bgButton.disabled = true
            bgButton.classList.add('disabled')
        }
        // When painting, draw a line to...
        ctx.lineTo(event.offsetX, event.offsetY)

        if(eraseMode === true){
            ctx.strokeStyle = eraseColour
            ctx.lineWidth = 20
        } else if(colourMode) {
            ctx.strokeStyle = colourMode
            ctx.lineWidth = 5
        }
        ctx.stroke()
    }
}

bgButton.addEventListener('change', bgChange)

/**
 * Changes to colour of the canvas to the colour selected on the background button
 */
function bgChange(){
    canvas.style.background = bgButton.value
    eraseColour = bgButton.value
}

/**
 * Makes an alert pop up when you click the Clear Canvas button, if you select Ok, it clears the canvas
 */
function clearClicked(){
    if (confirm("Are you sure you want to clear the canvas?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctxText.clearRect(0, 0, canvasTextC.width, canvasTextC.height)
        texts = []
        sizePicker.disabled = false
        bgButton.disabled = false
    }
}

function sizeChange(e){
    canvas.width = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.width)
    canvas.height = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.height)
    canvasTextC.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
    canvasTextC.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)
    canvi.style.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width) + 'px'
    canvi.style.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height) + 'px'
}

/**
 * Function to toggle between text and paint mouse events
 *
 * @param e
 */
function textToggle(e) {
    if (e.currentTarget.name === 'text') {
        canvasTextC.style.pointerEvents = 'auto'
        canvas.style.pointerEvents = 'none'
    } else {
        canvasTextC.style.pointerEvents = 'none'
        canvas.style.pointerEvents = 'auto'
    }
}

