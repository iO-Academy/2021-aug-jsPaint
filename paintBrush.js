const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

function onMouseMove(event){
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
}

canvas.addEventListener('mousemove', onMouseMove)

