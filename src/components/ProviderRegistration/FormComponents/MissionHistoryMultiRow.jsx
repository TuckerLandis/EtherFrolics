import { useState } from "react"
import { TextField, Typography } from "@material-ui/core"
import { useDispatch } from "react-redux"
import ImageUploader from '../../ImageComponents/ImageUploader'
import { Button } from '@material-ui/core'

function MissionHistoryMultiRow(props) {
    const dispatch = useDispatch();

    const [organization, setOrganization] = useState('')
    const [location, setLocation] = useState('')
    const [referenceName, setReferenceName] = useState('')
    const [referencePhone, setReferencePhone] = useState('')
    const [referenceEmail, setReferenceEmail] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)
    const [missionImageKey, setMissionImageKey] = useState('')


    // submit function for a mission history item, validates forms, sends dispatch
    function submitMissionHistoryItem(event) {

        event.preventDefault();

        if (organization === '' || location === '' || referenceName === '' || referencePhone === '' ||
            referenceEmail === '' || startDate === '' || endDate === '') {
            return alert('Please complete all required fields')
        }

        setHasBeenSubmitted(true)

        dispatch({
            type: 'ADD_MISSION_HISTORY_ITEM',
            payload: {
                organization: organization,
                location: location,
                referenceName: referenceName,
                referencePhone: referencePhone,
                startDate: startDate,
                endDate: endDate,
                missionExperienceImageKey: missionImageKey
            }
        })
        // adds a mission history item to the array in parent component, rendering a new copy of this component
        props.addMissionHistoryItem()
    }

    // attaches aws image key to form row
    function handleImageAttach(awsKey) {
        setMissionImageKey(awsKey)
    }


    function handleChange(e) {
        switch (e.target.id) {
            case 'organizationInput':
                setOrganization(e.target.value)
                break
            case 'locationInput':
                setLocation(e.target.value)
                break
            case 'referenceNameInput':
                setReferenceName(e.target.value)
                break
            case 'referencePhoneInput':
                setReferencePhone(e.target.value)
                break
            case 'referenceEmailInput':
                setReferenceEmail(e.target.value)
                break
            case 'startDateInput':
                setStartDate(e.target.value)
                break
            case 'endDateInput':
                setEndDate(e.target.value)
                break

        }
    }
    // passed to image uploader, not used at this time
    const imageType = 'mission'

    return (
        <div className="general-form-display">

            {hasBeenSubmitted ? (
                <Typography variant="body1">Submitted!</Typography>
            ) : (

                <form onSubmit={submitMissionHistoryItem}>

                    <div className="text-field-wrapper">
                        {/* <label htmlFor="organtizationInput">Organization</label> */}
                        <TextField required label="Organization" variant="outlined" id="organizationInput" value={organization} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="locationInput">Location</label> */}
                        <TextField required label="Location" variant="outlined" id="locationInput" value={location} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="referenceNameInput">Reference Name</label> */}
                        <TextField required label="Reference Name" variant="outlined" id="referenceNameInput" value={referenceName} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="referencePhoneInput">Reference Phone #</label> */}
                        <TextField required label="Reference's Phone #" variant="outlined" id="referencePhoneInput" value={referencePhone} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="referenceEmailInput">Reference Email Address</label> */}
                        <TextField required label="Reference's Email" variant="outlined" id="referenceEmailInput" value={referenceEmail} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="startDateInput">Start Date</label> */}
                        <TextField required variant="outlined" type="date"
                            label="Start Date" InputLabelProps={{ shrink: true }}
                            id="startDateInput" value={startDate} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="endDateInput">End Date</label> */}
                        <TextField required variant="outlined" type="date"
                            label="End Date" InputLabelProps={{ shrink: true }}
                            id="endDateInput" value={endDate} onChange={handleChange} />
                    </div>
                    <br></br>
                    <br></br>

                    <Typography className="registration-title" variant="body1">Mission Completion Certificate</Typography>
                    <br></br>

                    <ImageUploader imageType={imageType} attachImageFunction={handleImageAttach} />

                    <div className="text-field-wrapper">

                        <Button variant="contained" color="secondary" type="submit">Add Mission History Entry+</Button>
                    

                    </div>


                </form>
        )}

        </div>
    )
}

export default MissionHistoryMultiRow
