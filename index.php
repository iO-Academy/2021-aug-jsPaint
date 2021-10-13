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
<div>
    <div class="toolbar">
        <button class="painter"></button>
        <button class="eraser"></button>
        <button class="text"></button>
        <form>
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
