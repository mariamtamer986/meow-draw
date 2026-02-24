const canvasBG = document.getElementById("canvasBG");
const ctxB = canvasBG.getContext("2d");
canvasBG.width = window.innerWidth;
canvasBG.height = window.innerHeight;

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDragging = false;
let brushColor = "#000000";
let backgroundColor = "#FFFFFF";

const brushCInput = document.getElementById("brushC");
const backgroundInput = document.getElementById("background");

const strokes = [];
let currentStroke = null;


brushCInput.addEventListener("input", function (event) {
  brushColor = event.target.value;
});

backgroundInput.addEventListener("input", function (event) {
  backgroundColor = event.target.value;
  fillBackground();
});


window.addEventListener('resize', function() {
    canvasBG.width = window.innerWidth;
    canvasBG.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fillBackground();
    redrawAll();
});

const mouse = {
    x: undefined,
    y: undefined,
}

let prevPoint = {
    x: undefined,
    y: undefined,
}

window.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    ctx.fillStyle = brushColor;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
    ctx.fill();
})

window.addEventListener('mousedown', function(event) {
    isDragging = true;
    prevPoint.x = event.x;
    prevPoint.y = event.y;

    currentStroke = {
    color: brushColor,
    width: 12,
    points: [{ x: event.clientX, y: event.clientY }]
  };
})

window.addEventListener('mousemove', function(event) {
    if(isDragging){
        mouse.x = event.x;
        mouse.y = event.y;
        drawStroke();
        prevPoint.x = mouse.x;
        prevPoint.y = mouse.y;
    }

    if (!currentStroke) return;

    currentStroke.points.push({
        x: event.clientX,
        y: event.clientY
    });

    redrawAll();
})

window.addEventListener('mouseup', function(event) {
    if (isDragging)
        isDragging = false;

    if (currentStroke) {
        strokes.push(currentStroke);
        currentStroke = null;
    }
})

window.addEventListener('mouseleave', function(event) {
    isDragging = false;
    currentStroke = null;
});

function drawStroke() {
    ctx.beginPath();
    ctx.moveTo(prevPoint.x, prevPoint.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();        
}

function fillBackground() {
    ctxB.clearRect(0, 0, canvas.width, canvas.height);
    ctxB.fillStyle = backgroundColor;
    ctxB.fillRect(0, 0, canvas.width, canvas.height);
}

function redrawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const stroke of strokes) {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    stroke.points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  if (currentStroke) {
    ctx.strokeStyle = currentStroke.color;
    ctx.lineWidth = currentStroke.width;
    ctx.beginPath();
    currentStroke.points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }
}


// function animate() {
//     //ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawStroke();
//    // requestAnimationFrame(animate);
// }

//animate();

