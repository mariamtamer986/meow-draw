const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDragging = false;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}


// canvas.addEventListener('click', function(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// })

canvas.addEventListener('mousedown', function(event) {
    isDragging = true;
})

canvas.addEventListener('mousemove', function(event) {
    if(isDragging){
        mouse.x = event.x;
        mouse.y = event.y;
    }
})

canvas.addEventListener('mouseup', function(event) {
    if (isDragging)
        isDragging = false;
})

function drawStroke() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

function animate() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStroke();
    requestAnimationFrame(animate);
}

animate();

