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
let stkrs = [];

let eraser = false;
canvas.addEventListener("contextmenu", e => e.preventDefault());

const brushCInput = document.getElementById("brushC");
const backgroundInput = document.getElementById("background");

const strokes = [];
let currentStroke = null;
let selectedSticker = null;

let saveMenuOpen = false;




brushCInput.addEventListener("input", function (event) {
  brushColor = event.target.value;
});

backgroundInput.addEventListener("input", function (event) {
  backgroundColor = event.target.value;
  fillBackground();
});

const s = document.querySelectorAll(".sticker");
s.forEach(st => {
  const src = (st.style.backgroundImage).slice(5, -2);
  st.addEventListener("click", () => {
    selectedSticker = src;
  });
})


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

canvas.addEventListener('click', function(event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;

    if (selectedSticker) {
        placeSticker(selectedSticker);
        selectedSticker = null; // place once
        redrawAll();
        return;
    }

    ctx.fillStyle = brushColor;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
    ctx.fill();
})

canvas.addEventListener('mousedown', function(event) {
    isDragging = true;
    prevPoint.x = event.offsetX;
    prevPoint.y = event.offsetY;

    const isRightClick = event.button === 2;

    currentStroke = {
        color: isRightClick ? "eraser" : brushColor,
        width: isRightClick ? 30 : 12,
        points: [{ x: event.offsetX, y: event.offsetY }]
    };
})

canvas.addEventListener('mousemove', function(event) {
    if (!isDragging || !currentStroke) return;

    const x = event.offsetX;
    const y = event.offsetY;

    currentStroke.points.push({ x, y });

    redrawAll();
})

window.addEventListener('mouseup', function() {

    if (isDragging) isDragging = false;

    if (currentStroke) {
        strokes.push(currentStroke);
        currentStroke = null;
        redrawAll();
    }
});


window.addEventListener('mouseleave', function(event) {
    isDragging = false;
    currentStroke = null;
});

function placeSticker(src) {
  const stkr = new Image();

  stkr.onload = function() {
    stkrs.push({
      img: stkr,
      x: mouse.x - 30,
      y: mouse.y - 30
    });

    redrawAll();
  };

  stkr.src = src;
}


// function drawStroke() {
//     if (!currentStroke) return;

//     ctx.beginPath();
//     ctx.moveTo(prevPoint.x, prevPoint.y);
//     ctx.lineTo(mouse.x, mouse.y);

//     ctx.lineWidth = currentStroke.width;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";

//     if (currentStroke.color === "eraser") {
//         ctx.globalCompositeOperation = "destination-out";
//     } else {
//         ctx.globalCompositeOperation = "source-over";
//         ctx.strokeStyle = currentStroke.color;
//     }

//     ctx.stroke();
//     ctx.globalCompositeOperation = "source-over";
// }

function fillBackground() {
    ctxB.clearRect(0, 0, canvas.width, canvas.height);
    ctxB.fillStyle = backgroundColor;
    ctxB.fillRect(0, 0, canvas.width, canvas.height);
}

function redrawAll() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const allStrokes = [...strokes];
  if (currentStroke) allStrokes.push(currentStroke);

  for (const stroke of allStrokes) {

    ctx.beginPath();

    stroke.points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });

    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (stroke.color === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = stroke.color;
    }

    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";

  for (const s of stkrs) {
    ctx.drawImage(s.img, s.x, s.y, 60, 60);
  }
}

function getSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

window.addEventListener("resize", () => {
  const { width, height } = getSize();
  console.log(width, height);
});

function saveCanvas() {

  const exportCanvas = document.createElement("canvas");
  const exportCtx = exportCanvas.getContext("2d");

  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;

  //combine both background and content into one canvas to save/import
  exportCtx.drawImage(canvasBG, 0, 0);
  exportCtx.drawImage(canvas, 0, 0);

  const link = document.createElement("a");
  link.download = "meow-drawing.png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
}



////////////////////////////////////////////////// UI LOGIC //////////////////////////////////////////////////


const colorBtn = document.querySelector(".color-btn");
const colorPkr = document.querySelector("#color-picker");

colorBtn.addEventListener("click", () => {
    colorBtn.classList.toggle("active");
    colorPkr.classList.toggle("hide");
});

const saveBtn = document.querySelector(".save-btn");

saveBtn.addEventListener("click", () => {
        if (!saveMenuOpen) {
        saveMenuOpen = true;
        saveBtn.classList.add("active");
        return;
    }

    saveCanvas();

    saveMenuOpen = false;
    saveBtn.classList.remove("active");
});

const stickerBtn = document.querySelector(".sticker-btn");
const stickers = document.getElementById("stickers-container");

stickerBtn.addEventListener("click", () => {
    stickerBtn.classList.toggle("active");
    stickers.classList.toggle("hide");
});


// function animate() {
//     //ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawStroke();
//    // requestAnimationFrame(animate);
// }

//animate();

