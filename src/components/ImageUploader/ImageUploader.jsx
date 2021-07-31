import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';


function ImageUploader(props) {
    const dispatch = useDispatch();
    const [file, setFile] = useState('')

    // const imageType = props.imageType

    async function postImage(image) {
        const formData = newFormData()
        formData.append("image", image)

        const result = await axios.post('image', formData, { headers: {'Content-Type': 'multipart/formData'}})

        console.log(result);

        return result.data
    }

    // change handler for file
    const fileSelected = event => {
        console.log(event.target.files[0]);
        const file = event.target.files[0]
            setFile(file)
        }

    const localSubmit = async event => {
        event.preventDefault()
    
        if (file === '') {
          return alert('select an image')
        }
        
        const result = await postImage(file)

        console.log(result);
        
      }





    return (
        <form onSubmit={localSubmit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>

        <button type="submit">Submit</button>
      </form>
    )
}

export default ImageUploader