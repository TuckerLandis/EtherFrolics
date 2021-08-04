import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core'
import AttachmentIcon from '@material-ui/icons/Attachment';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ImageViewer from './ImageViewer'


function ImageUploader(props) {
  const dispatch = useDispatch();
  //state variable for the file being uploaded
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Select a file')

  // this comes down from where the imageUploader is called, see workhistory for example
  const imageType = props.imageType


  /**
   * This function creates new form data and appends it to the file being uploaded, for interpretation by multer
   * @param {*} image 
   * @returns 
   */
  async function postImage(image) {
    const formData = new FormData()
    formData.append("image", image)

    // actually posts the image to s3, and returns the post information object, that includes the key, for usage below
    const result = await axios.post('/api/image/s3', formData, { headers: { 'Content-Type': 'multipart/formData' } })

    console.log(result);

    // this return becomes result on line 51, for posting to pg
    return result.data
  }

  // change handler for file
  const fileSelected = event => {
    console.log(event.target.files[0]);
    const file = event.target.files[0]
    setFile(file)
    setFileName(file.name)
  }

  // awaits the post image function above, validates an image has been selected
  const handleSubmitImage = async event => {
    event.preventDefault()

    // if no file, alert
    if (file === '') {
      return alert('select an image')
    }

    // triggers postImage function with the file state variable
    const result = await postImage(file)

    // logs the s3 info to show a succesful post, possible render somewhere if we pass down a callback
    console.log(result);

    // sends the s3 information and image "type" to the endpoint that posts the key to the database, the imageType is interpreted by the switch statement there.
    // this whole action is sent as req.body to that endpoint, see the providerRegistration saga

    if (props.imageType === 'resume') {
      dispatch({
        type: 'POST_IMAGE_TO_DB',
        payload: result,
        imageType: imageType
      })
    }


    // attaches the image key from s3 to the row to be submitted to the db
    props.attachImageFunction(result.Key)
  }





  return (
    
    <div>
      <div className="button-div">
        <div>
        <label htmlFor="file" className="inputfile-label"><Typography variant="button"><FileCopyIcon/>{fileName}</Typography></label>
      <input name="file" id="file" className="inputfile" onChange={fileSelected} type="file" accept="image/*"></input>
        </div>
    

      
      
      
      <div>
      <Button variant="contained" color="primary" onClick={handleSubmitImage}><AttachmentIcon/>Attach</Button>
      </div>
      </div>
      {/* can conditionally render this button based on props.imageSubmitted if we want */}
      
    </div>

 
  )
}

export default ImageUploader