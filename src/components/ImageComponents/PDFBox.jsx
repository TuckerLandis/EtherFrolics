import { useState } from "react";

function PDFBox(props) {

  const [PDFcanvasClass, setPDFCanvasClass] = useState('PDF-closed')

  function openOrClosePDF() {
    if (PDFcanvasClass === 'PDF-closed') {
      setPDFCanvasClass('PDF-open')
    } else if (PDFcanvasClass === 'PDF-open') {
      setPDFCanvasClass('PDF-closed')
    }
  }


  const modifiedImagePath = props.imagePath.replace("PDF", "")

  // ----
  // the below code is from pdfjs by mozilla, it's their hello world example effectively. there are many better ways to do this. 
  // at this time, only the first page is rendered. this could change by setting pageNumber var below to be passed in via props or just simply the count of pages
  // this was a proof of concept in rendering PDFs without downloading them or using the adobe library, not a final implementation in any way


  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url = modifiedImagePath

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window['pdfjs-dist/build/pdf'];

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);



  loadingTask.promise.then(function (pdf) {
    console.log('PDF loaded');

    // Fetch the first page -- can loop over page numbers here somehow?

    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function (page) {
      console.log('Page loaded');

      var scale = 1.5;
      var viewport = page.getViewport({ scale: scale });

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById(modifiedImagePath);

      if (canvas) {
        var context = canvas?.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });

      }



    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });



  return (
    <div>


      {loadingTask.promise && <canvas width="32px" className={PDFcanvasClass} id={modifiedImagePath} alt="" onClick={openOrClosePDF}></canvas>}

      {/* <canvas id="the-canvas"></canvas> */}




    </div>
  )
}




export default PDFBox