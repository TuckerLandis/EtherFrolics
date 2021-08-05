import LightBoxComponent from "./LightBox"


function ImageViewer(props) {



  return (
    <div>

      {/* {props.imagePath.includes('PDF') ? <embed src={props.imagePath} width="800px" height="2100px" /> : <img width="32px" src={props.imagePath} alt="" /> } */}

      {props.imagePath.includes('PDF') ? <object src={props.imagePath} type="application/pdf" width="300" height="200">
        alt : <a href="data/test.pdf">test.pdf</a>
      </object> : <img width="32px" src={props.imagePath} alt="" />}




    </div>
  )
}

export default ImageViewer

// {isOpen ? <Lightbox image={props.imagePath} title="image title" onClose={e => setIsOpen(false)} /> 
// :

// // this could simply be a button so we don't have to worry about image widths, but i'm setting it to 32px manually
// <img width="32px" src={props.imagePath} alt="" onClick={e => setIsOpen(true)}/> }


