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

// //story 7
// document.querySelector('form').addEventListener('submit', e => {
//
//     e.preventDefault()
//     // created a variable to contain the users text input
//     let text = document.querySelector('input').value
//     ctxText.font = '50px "Hiragino Maru Gothic Pro"'
//     //create a fill text function that places the users text input at a set
//     //place on the canvas
//     ctxText.fillText(text, 10, 50)
// })

//when the text button is clicked, it should reveal the text input
document.querySelector('.text').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('#text').setAttribute('type', 'text')
    document.querySelector('#submit').setAttribute('type', 'submit')
    document.querySelector(".canvasText").style.pointerEvents =  "auto"
})


// variables used to get mouse position on the canvas
const $canvasTextC = document.querySelector('.canvasText');
const canvasTextCOffset = $canvasTextC.offset();
const offsetX = canvasTextCOffset.left;
const offsetY = canvasTextCOffset.top;
const scrollX = $canvasTextC.scrollLeft();
const scrollY = $canvasTextC.scrollTop();

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
let startX;
let startY;

// an array to hold text objects
const texts = [];

// this var will hold the index of the hit-selected text
let selectedText = -1;

// clear the canvas & redraw all texts
function draw() {
    ctxText.clearRect(0, 0, canvasTextC.width, canvasTextC.height);
    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        ctxText.fillText(text.text, text.x, text.y);
    }
}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, textIndex) {
    const text = texts[textIndex];
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    // Put your mousedown stuff here
    for (let i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
        }
    }
}

// done dragging
function handleMouseUp(e) {
    e.preventDefault();
    selectedText = -1;
}

// also done dragging
function handleMouseOut(e) {
    e.preventDefault();
    selectedText = -1;
}

// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function handleMouseMove(e) {
    if (selectedText < 0) {
        return;
    }
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    const text = texts[selectedText];
    text.x += dx;
    text.y += dy;
    draw();
}

// listen for mouse events
document.querySelector('.canvasText').addEventListener('mousedown', handleMouseDown)

document.querySelector('.canvasText').addEventListener('mousemove', handleMouseMove)

document.querySelector('.canvasText').addEventListener('mouseup', handleMouseUp)

document.querySelector('.canvasText').addEventListener('mouseleave', handleMouseOut)


document.querySelector('form').addEventListener('submit', function() {

    // calc the y coordinate for this text on the canvas
    const y = texts.length * 20 + 20;

    // get the text from the input element
    const text = {
        text: document.querySelector('input').value,
        x: 20,
        y: y
    };

    // calc the size of this text for hit-testing purposes
    ctxText.font = "16px verdana";
    text.width = ctxText.measureText(text.text).width;
    text.height = 16;

    // put this new text in the texts array
    texts.push(text);

    // redraw everything
    draw();

})