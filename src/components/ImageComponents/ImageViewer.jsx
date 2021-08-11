import LightBoxComponent from "./LightBox"
import PDFBox from "./PDFBox"

function ImageViewer(props) {

  return (
    <div>

      {/* a couple attempts at embedding a pdf. cause a weird bug where "document" is what is embedded, effectively showing a second copy of the webpage inside the embed tag. leaving these if a future dev wants
      to simply use an embed tag, and can figure out the bug */}

      {/* {props.imagePath.includes('PDF') ? <embed src={props.imagePath} width="800px" height="2100px" /> : <LightBoxComponent imagePath={props.imagePath} /> } */}

      {/* {props.imagePath.includes('PDF') ? <object data={props.imagePath} type="application/pdf" width="300" height="200">
        alt : <a href="data/test.pdf">test.pdf</a>
      </object> : <LightBoxComponent imagePath={props.imagePath} />} */}

      {/* if the aws key contains PDF, render a PDFbox component, if not, render a lightbox component */}

      {props.imagePath.includes('PDF') ? <PDFBox imagePath={props.imagePath} /> : <LightBoxComponent imagePath={props.imagePath} /> }

    </div>
  )
}

export default ImageViewer



