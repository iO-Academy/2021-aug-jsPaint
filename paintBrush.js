// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')

const textButton = document.querySelector('#submit')
const textInput = document.querySelector('#text')
const formSubmit = document.querySelector('form')
const textBoxes = document.querySelectorAll('.textBox')
const toAddText = document.querySelector("#toAddText")
const canvasWrap = document.querySelector("#canvasWrap")


const sizePicker = document.querySelector('#sizeForm')

// Sets the default mode to brush and painting to false
let painting = false
let eraseMode = false
let colourMode = 'black'
let moving = false
let textBoxCount = 0



textButton.addEventListener('click', function (event) {
    textInput.type = 'text'
    textButton.type = 'submit'
})


// If there is a canvas
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


function startMoving() {
    moving = true
}

function stopMoving() {
    moving = false
}

//story 7
// document.querySelector('form').addEventListener('submit', e => {
//     e.preventDefault()
//     // created a variable to contain the users text input
//     let text = document.querySelector('input').value
//     ctx.font = '50px "Hiragino Maru Gothic Pro"'
//     //create a fill text function that places the users text input at a set
//     //place on the canvas
//     ctx.fillText(text, 10, 50)
// })

//when the text button is clicked, it should reveal the text input
document.querySelector('.text').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('#text').setAttribute('type', 'text')
    document.querySelector('#submit').setAttribute('type', 'submit')
})


formSubmit.addEventListener('submit', e => {
    e.preventDefault()
    toAddText.innerHTML += makeText()
})

function makeText() {
    let output = ''
    output += "<span class='textBox box" + textBoxCount + "' style='position: absolute; left: 10; top: 50;'>"
    output += textInput.value
    output += '</span>'
    textBoxCount += 1
    return output
}



toAddText.style.width = canvas.width + 'px'
toAddText.style.height = canvas.height + 'px'
canvasWrap.style.width = canvas.width + 'px'
canvasWrap.style.height = canvas.height + 'px'


toAddText.addEventListener('mouseup', stopMoving)
toAddText.addEventListener('mousemove', moveText);

textBoxes.forEach(function (textBox){
    textBox.addEventListener('mousedown', startMoving)
})

function moveText(e){
    if(moving){
        e.currentTarget.style.left = e.offsetX + 'px'
        e.currentTarget.style.top = e.offsetY + 'px'
    }else{

    }
}


sizePicker.addEventListener('change', sizeChange)
canvas.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
canvas.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)

function sizeChange(e){
    canvas.width = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.width)
    canvas.height = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.height)
}

const sizeOptions = document.querySelectorAll('#sizeForm > option')
const main = document.querySelector('main')
sizeOptions.forEach(function(sizeOption){
    if(main.scrollWidth < sizeOption.dataset.width || main.scrollHeight < sizeOption.dataset.height) {
        sizeOption.disabled = true
    }
})

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


