import Lightbox from 'react-awesome-lightbox'
import 'react-awesome-lightbox/build/style.css';
import { useState } from 'react';

function LightBoxComponent(props) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>

            {isOpen ? <Lightbox image={props.imagePath} title="image title" onClose={e => setIsOpen(false)} />
                :

                // this could simply be a button so we don't have to worry about image widths, but i'm setting it to 32px manually
                <img width="32px" src={props.imagePath} alt="" onClick={e => setIsOpen(true)} />}




        </div>
    )
}

export default LightBoxComponent

