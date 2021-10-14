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
        <label for="sizeForm">Select size:
            <p class="toolTipText">Please enlarge your page for the larger options!</p>
        </label>
        <select class="sizeForm" id="sizeForm">
            <option data-width="400" data-height="300">Small</option>
            <option data-width="800" data-height="500">Medium</option>
            <option data-width="1200" data-height="700">Large</option>
        </select>
        <button class="button black painter clicked" data-colour="#000000" name="black"></button>
        <button class="button red painter" data-colour="#ff0000" name="red"></button>
        <button class="button blue painter" data-colour="#0000ff" name="blue"></button>
        <button class="button green painter" data-colour="#008000" name="green"></button>
        <button class="button yellow painter" data-colour="#ffff00" name="yellow"></button>
        <button class="button orange painter" data-colour="#ffa500" name="orange"></button>
        <button class="button eraser" name="eraser"><p class="toolTipText">Erase stuff from the canvas!</p></button>
        <button class="button text" id="textButton" name="text">
            <p class="toolTipText">Type in text and submit it to add it to the canvas!</p>
        </button>
        <form id="textForm" class="textForm">
            <input type="hidden" id="textInput" />
            <input type="hidden" id="textSubmit" />
        </form>
    </div>
</div>
    <main>
        <h1>Capybara Canvas</h1>
        <canvas class="canvas"></canvas>
    </main>
</body>
</html>
