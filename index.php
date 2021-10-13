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
        <button class="mode black clicked" data-colour="#000000" name="black"></button>
        <button class="mode red" data-colour="#ff0000" name="red"></button>
        <button class="mode blue" data-colour="#0000ff" name="blue"></button>
        <button class="mode green" data-colour="#008000" name="green"></button>
        <button class="mode yellow" data-colour="#ffff00" name="yellow"></button>
        <button class="mode orange" data-colour="#ffa500" name="orange"></button>
        <button class="mode eraser" name="eraser"></button>
    </div>
    </div>
    <main>
        <h1>Capybara Canvas</h1>
        <canvas class="canvas" width="1100" height="600"></canvas>
    </main>
</body>
</html>
