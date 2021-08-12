import Lightbox from 'react-awesome-lightbox'
import 'react-awesome-lightbox/build/style.css';

// ^ used react-awesome-lightbox for rendering images (not pdfs) documentation here https://www.npmjs.com/package/react-awesome-lightbox
import { useState } from 'react';

function LightBoxComponent(props) {

    const modifiedImagePath = props.imagePath.replace("IMG", "")

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>

            {isOpen ? <Lightbox image={modifiedImagePath} title="image title" onClose={e => setIsOpen(false)} />
                :

                // this could simply be a button so we don't have to worry about image widths, but i'm setting it to 32px manually
                <img width="32px" height="32px" src={modifiedImagePath} alt="" onClick={e => setIsOpen(true)} />}




        </div>
    )
}

export default LightBoxComponent

