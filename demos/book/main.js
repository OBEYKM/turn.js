//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Pdf js Below

// Add the link to your PDF FILE.
const pdfUrl = "test.pdf";

// Get the container element
const container = document.getElementById("book");
// console.log(container);

// Load PDF document
pdfjsLib.getDocument(pdfUrl).promise.then((pdfDoc) => {
  // This for loop, loops through all of the pages and loads the doc
  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    pdfDoc.getPage(pageNum).then((page) => {
      // Create a viewport to render the PDF page. The higher number you add to the scale, the bigger the pdf file will look.
      const viewport = page.getViewport({ scale: 1 });

      // Set the dimensions of the container to match the PDF page
      container.style.width = "100%";
      // container.style.width = viewport.width + "px";
      container.style.height = "100%";
      // container.style.height = viewport.height + "px";

      // Prepare the canvas element to re`nder the PDF page
      const canvas = document.createElement("canvas");
      container.appendChild(canvas);

      // Set the canvas dimensions
      //   canvas.width = "wrap-content";
      canvas.width = viewport.width;
      //   canvas.height = "wrap-content";
      canvas.height = viewport.height;

      // Render the PDF page on the canvas
      const renderContext = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      page.render(renderContext);
    });
  }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Turn js Below

$(window).ready(function () {
  $("#book").turn({
    width: 500,
    height: 300,
    autoCenter: true,
    // display: "double",
    acceleration: true,
    // gradients: !$.isTouch,
    // elevation: 50,
    when: {
      turned: function (e, page) {
        /*console.log('Current view: ', $(this).turn('view'));*/
      },
    },
  });
});

$(window).bind("keydown", function (e) {
  if (e.keyCode == 37) $("#book").turn("previous");
  else if (e.keyCode == 39) $("#book").turn("next");
});
