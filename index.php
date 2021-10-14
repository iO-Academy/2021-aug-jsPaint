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
        <button class="text" id="textButton"></button>
        <form id="formText">
            <input type="hidden" id="text" />
            <input type="hidden" id="submit" />
        </form>
    </div>
</div>
    <main>
        <h1>Capybara Canvas</h1>
            <div class="canvi">
                <canvas class="canvas" width="1100" height="600"></canvas>
<!--        // make a second Canvas, (we want to position it over the first canvas with a transparent background. make sure-->
<!--        // in JS the paint canvas selection only picks the painting (lower) canvas.-->
                <canvas class="canvasText" width="1100" height="600"></canvas>
            </div>
    </main>
</body>
</html>
