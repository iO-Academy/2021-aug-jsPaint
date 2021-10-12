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
        <select class="sizeForm" id="sizeForm">
            <option data-width="400" data-height="300">Small</option>
            <option data-width="800" data-height="500">Medium</option>
            <option data-width="1200" data-height="700">Large</option>
        </select>
       <button class="painter"></button>
       <button class="eraser"></button>
    </div>
    </div>
    <main>
        <h1>Capybara Canvas</h1>
        <canvas class="canvas"></canvas>
    </main>
</body>
</html>
