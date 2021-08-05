import LightBoxComponent from "./LightBox"


function ImageViewer(props) {



  return (
    <div>

      {props.imagePath.includes('PDF') ? <embed src={props.imagePath} width="800px" height="2100px" /> : <LightBoxComponent imagePath={props.imagePath} /> }

      {/* {props.imagePath.includes('PDF') ? <object data={props.imagePath} type="application/pdf" width="300" height="200">
        alt : <a href="data/test.pdf">test.pdf</a>
      </object> : <LightBoxComponent imagePath={props.imagePath} />} */}




    </div>
  )
}

export default ImageViewer

// {isOpen ? <Lightbox image={props.imagePath} title="image title" onClose={e => setIsOpen(false)} /> 
// :

// // this could simply be a button so we don't have to worry about image widths, but i'm setting it to 32px manually
// <img width="32px" src={props.imagePath} alt="" onClick={e => setIsOpen(true)}/> }


