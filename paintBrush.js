// Select the canvas in the dom
const canvas = document.querySelector('canvas')
// Sets the canvas to 2D drawing
const ctx = canvas.getContext('2d')
// Sets the connection to the eraser button
const eraser = document.querySelector('.eraser')
const textButtonSubmit = document.querySelector('#submit')
const textInput = document.querySelector('#text')
const formSubmit = document.querySelector('form')
const toAddText = document.querySelector("#toAddText")
const canvasWrap = document.querySelector("#canvasWrap")
const sizePicker = document.querySelector('#sizeForm')
const buttons = document.querySelectorAll('.mode')

// Sets the default mode to brush and painting to false
let painting = false
let eraseMode = false
let colourMode = 'black'
let textBoxCount = 0

sizePicker.addEventListener('change', sizeChange)
canvas.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width)
canvas.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height)


textButtonSubmit.addEventListener('click', function () {
    textInput.type = 'text'
    textButtonSubmit.type = 'submit'
})

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
    button.addEventListener('click', textToggle)
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
    output += "<div class='textBox box" + textBoxCount + "' style='position: absolute; left: 10; top: 50;'>"
    output += textInput.value
    output += '</div>'
    textBoxCount += 1
    return output
}

function sizeChange(e){
    canvas.width = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.width)
    canvas.height = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].dataset.height)
    toAddText.style.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width) + 'px'
    toAddText.style.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height) + 'px'
    canvasWrap.style.width = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.width) + 'px'
    canvasWrap.style.height = parseInt(sizePicker.options[sizePicker.selectedIndex].dataset.height) + 'px'
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

function textToggle(e) {
    if (e.currentTarget.name === 'text') {
        toAddText.style.pointerEvents = 'auto'
    } else {
        toAddText.style.pointerEvents = 'none'
    }
}

// Container: toAddText
// Text-boxes: textBoxes
let activeItem = null
let active = false

toAddText.addEventListener('touchstart', dragStart, false)
toAddText.addEventListener("touchend", dragEnd, false)
toAddText.addEventListener("touchmove", drag, false)

toAddText.addEventListener("mousedown", dragStart, false)
toAddText.addEventListener("mouseup", dragEnd, false)
toAddText.addEventListener("mousemove", drag, false)

function dragStart(e) {

    if (e.target !== e.currentTarget) {
        active = true;

        // this is the item we are interacting with
        activeItem = e.target;

        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }

            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }

            if (e.type === "touchstart") {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                console.log("doing something!");
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
        }
    }
}

function dragEnd() {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }

    active = false;
    activeItem = null;
}

function drag(e) {
    if (active) {
        if (e.type === "touchmove") {
            e.preventDefault();

            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}