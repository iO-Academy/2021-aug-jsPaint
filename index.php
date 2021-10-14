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
        <button class="mode black painter clicked" data-colour="#000000" name="black"></button>
        <button class="mode red painter" data-colour="#ff0000" name="red"></button>
        <button class="mode blue painter" data-colour="#0000ff" name="blue"></button>
        <button class="mode green painter" data-colour="#008000" name="green"></button>
        <button class="mode yellow painter" data-colour="#ffff00" name="yellow"></button>
        <button class="mode orange painter" data-colour="#ffa500" name="orange"></button>
        <button class="mode eraser" name="eraser"><p class="toolTipText">Erase stuff from the canvas!</p></button>
        <button class="mode text" id='textButton' name="text">
            <p class="toolTipText">Type in text and submit it to add it to the canvas!</p>
        </button>
        <form id="textForm" class="textForm">
            <input type="hidden" id="text" />
            <input type="hidden" id="submit" />
        </form>
    </div>
</div>
    <main>
        <h1>Capybara Canvas</h1>
        <div class="canvasWrap" id="canvasWrap">
            <div class="toAddText" id="toAddText">
            </div>
            <canvas class="canvas" width="1100" height="600"></canvas>
        </div>
    </main>
</body>
</html>
