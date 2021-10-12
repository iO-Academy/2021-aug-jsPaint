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
        <button class="mode painter clicked" name="painter"></button>
        <button class="mode red" name="red"></button>
        <button class="mode blue" name="blue"></button>
        <button class="mode green" name="green"></button>
        <button class="mode yellow" name="yellow"></button>
        <button class="mode orange" name="orange"></button>
        <button class="mode eraser" name="eraser"></button>
    </div>
    </div>
    <main>
        <h1>Capybara Canvas</h1>
        <canvas class="canvas" width="1100" height="600"></canvas>
    </main>
</body>
</html>