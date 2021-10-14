// Variables

// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')
// Sets the connection to the canvas size menu
const sizePicker = document.querySelector('#sizeForm')
// Connects to the text-box form
const textForm = document.querySelector('#textForm')
// Connects to the text button
const textButton = document.querySelector('#textButton')
// Connects to the text form input bar
const textInput = document.querySelector('#textInput')
// Connects to the text form submit button
const textSubmit = document.querySelector('#textSubmit')
// Connects to all the buttons in the toolbar
const buttons = document.querySelectorAll('.button')
// Sets a connection to all the canvas size options
const sizeOptions = document.querySelectorAll('#sizeForm > option')
// Connects to <main>
const main = document.querySelector('main')

// Sets the default mode to brush and painting to false
let painting = false
let eraseMode = false
let colourMode = 'black'

//Sets canvas width and height to small
canvas.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
canvas.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)
// Disables canvas size options that are bigger than your viewport
sizeOptions.forEach(function(sizeOption){
    if(main.scrollWidth < sizeOption.dataset.width || main.scrollHeight < sizeOption.dataset.height) {
        sizeOption.disabled = true
    }
})

//Event listeners
//Add event listeners to all the buttons
buttons.forEach(function(button){
    if(button.name === 'eraser'){
        button.addEventListener('click', eraseTrue)
    }else{
        button.addEventListener('click', eraseFalse)
    }
    if(button.hasAttribute('data-colour')){
        button.addEventListener('click', colourPicker)
        button.innerHTML = "<p class='toolTipText'>" + button.name + ' brush!</p>'
    }
    button.addEventListener('click', clickShow)
})
//Adds event listeners to the canvas
if (canvas) {
    // Add an event listener to draw a line on dragging the mouse
    canvas.addEventListener('mousemove', drawLine);
    // Start painting on click event
    canvas.addEventListener('mousedown', startPainting);
    // Stop painting on stopping clicking/off page
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}
//Adds event listener to the add text button, adds text to the canvas
textForm.addEventListener('submit', e => {
    e.preventDefault()
    // created a variable to contain the users text input
    const text = textInput.value
    ctx.font = '50px "Hiragino Maru Gothic Pro"'
    //create a fill text function that places the users text input at a set
    //place on the canvas
    ctx.fillText(text, 10, 50)
})

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

/**
 * Changes colour mode when a colour button is selected
 *
 * @param e
 */
function colourPicker(e){
    colourMode = e.currentTarget.dataset.colour
}

/**
 * Changes size of canvas
 *
 * @param e
 */
function sizeChange(e){
    canvas.width = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.width)
    canvas.height = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.height)
}

/**
 * Sets a class to a button so that when it is clicked the button gets a thick black outline
 *
 * @param e
 */


function clickShow(e){
    buttons.forEach(function(button){
        button.classList.remove('clicked')
    })
    e.currentTarget.classList.add('clicked')
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
        if (!sizePicker.disabled) {
            sizePicker.disabled = true
        }
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
