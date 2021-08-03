import { useState } from "react"
import { TextField } from "@material-ui/core"
import { useDispatch } from "react-redux"
import ImageUploader from "../../ImageComponents/ImageUploader";
import { Button } from '@material-ui/core';

function EducationMultiRow(props) {
    const dispatch = useDispatch();

    const [school, setSchool] = useState('')
    const [degree, setDegree] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)


    function submitEducationHistoryItem(event, awsKey) {
        event.preventDefault()
        setHasBeenSubmitted(true)

        dispatch({
            type: 'ADD_EDUCATION_HISTORY_ITEM',
            payload: {
                school: school,
                degree: degree,
                startDate: startDate,
                endDate: endDate,
                degreeImageKey: awsKey
            }
        })

        props.addEducationHistoryItem()
    }

    function handleChange(e) {
        switch (e.target.id) {
            case 'schoolInput':
                setSchool(e.target.value)
                break
            case 'degreeInput':
                setDegree(e.target.value)
                break
            case 'startDateInput':
                setStartDate(e.target.value)
                break
            case 'endDateInput':
                setEndDate(e.target.value)
                break
        }
    }

    const imageType='education'

    return (
        <div className="general-form-display">
            <form onSubmit={submitEducationHistoryItem}>

            <div className="text-field-wrapper">
                {/* <label htmlFor="schoolInput">School</label> */}
                <TextField required label="School" id="schoolInput" value={school} onChange={handleChange} variant="outlined" />
            </div>

            <div className="text-field-wrapper">
                {/* <label htmlFor="degreeInput">Job Title</label> */}
                <TextField required label="Degree" id="degreeInput" value={degree} onChange={handleChange} variant="outlined" />
            </div>

            <div className="text-field-wrapper">
                {/* <label htmlFor="startDateInput">Start Date</label> */}
                    <TextField type="date" name="startDate" id="startDateInput"
                        label="Start Date" InputLabelProps={{ shrink: true }}
                        value={startDate} onChange={handleChange} />
            </div>

            <div className="text-field-wrapper">
                {/* <label htmlFor="endDateInput">End Date</label> */}
                    <TextField type="date" name="endDate" id="endDateInput"
                        label="End Date" InputLabelProps={{ shrink: true }}
                        value={endDate} onChange={handleChange} />
            </div>


            <ImageUploader imageType={imageType} submitFunction={submitEducationHistoryItem} />

            {hasBeenSubmitted ? (
                <p>submitted</p>
            ) : (

                <div className="text-field-wrapper">
                    <Button variant="contained" color="secondary" type="submit">Add Education Entry+</Button>
                </div>
            )}


            </form>
            

        </div>
    )
}

export default EducationMultiRow;
