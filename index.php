<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Capybara Canvas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="normalize.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="paintBrush.js" defer></script>
</head>
<body>
<div class="toolbarWrap">
    <div class="toolbar">
        <label for="sizeForm" id="sfLabel">Select size:
            <p class="toolTipText">Please enlarge your page for the larger options!</p>
        </label>
        <select class="sizeForm" id="sizeForm">
            <option data-width="400" data-height="300">Small</option>
            <option data-width="800" data-height="500">Medium</option>
            <option data-width="1200" data-height="700">Large</option>
        </select>
        <button class="button eraser" name="eraser"><p class="toolTipText">Erase stuff from the canvas!</p></button>
        <label for="colourPicker"> Pick your brush!
            <input type="color" id="colourPicker" value="#000000" />
        </label>
        <label for="bgColour"> Pick your background colour!
            <input type="color" id="bgColour" value="#FFFFFF" />
        </label>
        <button class="text button" name="text" id="textButton">
            <p class="toolTipText">Type in text and submit it to add it to the canvas!</p>
        </button>
        <form id="textForm" class="textForm">
            <input type="hidden" id="textInput" />
            <input type="hidden" id="textSubmit" />
        </form>
        <button class="print"></button>
    </div>
</div>
    <main>
        <h1>Capybara Canvas</h1>
            <div class="canvi">
                <canvas class="canvas"></canvas>
                <canvas class="canvasText"></canvas>
            </div>
    </main>
</body>
</html>
