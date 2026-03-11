🎨 Browser Drawing App <br>
<br>
A lightweight browser-based drawing application built with HTML, CSS, and JavaScript using the HTML5 Canvas API.
Users can draw freely on the canvas, customize colors, add stickers, erase strokes, and export their artwork.

This project was built as a hands-on exploration of interactive UI, canvas manipulation, and DOM event handling.

✨ Features <br>
- Freehand drawing using the mouse
- Custom brush color picker
- Background color customization
- Sticker system that allows users to place decorative elements on the canvas
- Right-click eraser tool
- Export artwork as an image
- Custom SVG mouse cursors for drawing and UI interaction
- Grid-based sticker selector UI

<br>
🖥 Controls <br>
<br>
Left Click + Drag	-> Draw on the canvas <br>
Right Click -> Erase strokes <br>
Color Picker -> Change brush or background color <br>
Sticker Button -> Open the sticker selection panel <br>
Save Button -> Export the canvas as an image <br>

<br>
💾 Saving Artwork (Important Note) <br>
<br>
The application allows users to export their artwork as an image. <br>
However, there is a small technical caveat when stickers are present on the canvas. <br>
Drawing strokes are rendered directly on the HTML5 Canvas, but stickers are implemented as separate image assets layered on top of the canvas. <br>
When exporting the artwork, these assets must be processed together with the canvas.<br>
Because of browser security restrictions, loading local image assets can behave differently when opening the project directly through the file system (file://). In this case, the browser may block certain operations required to combine the canvas and sticker images during export.<br>
For this reason:<br>
The Save feature works reliably when the project is run through a local development server (such as VS Code Live Server).<br>
When the project is opened directly as a file, the export functionality may fail if stickers are present.<br>
Running the project through a local server ensures that the browser correctly loads the sticker assets and allows the canvas to be exported as expected.<br>
<br>
🛠 Technologies Used<br>
<br>
HTML5 <br>
CSS3 <br>
JavaScript (Vanilla JS) <br>
Canvas API <br>
CSS Grid <br>
SVG assets <br>
<br>
▶ Running the Project (Recommended)<br>
<br>
1. Clone the repository<br>
2. Open the project in VS Code<br>
3. Run using Live Server<br>
4. Open the generated localhost URL in your browser<br>
<br>
📜 License <br>
This project is open source and available under the MIT License.
