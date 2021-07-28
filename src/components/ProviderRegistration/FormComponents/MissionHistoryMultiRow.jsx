import { useState } from "react"
import { TextField } from "@material-ui/core"
import { useDispatch } from "react-redux"

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


    function submitMissionHistoryItem() {
        
        setHasBeenSubmitted(true)

        dispatch({
            type: 'ADD_MISSION_HISTORY_ITEM',
            payload: {
                organization : organization,
                location: location,
                referenceName : referenceName,
                referencePhone : referencePhone,
                startDate: startDate,
                endDate: endDate,
            }
        })

        props.addMissionHistoryItem()
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

    return (
        <div>

            <form onSubmit={submitMissionHistoryItem}>

            {/* <label htmlFor="organtizationInput">Organization</label> */}
            <TextField required label="Organization" variant="outlined" id="organizationInput" value={organization} onChange={handleChange} />

            {/* <label htmlFor="locationInput">Location</label> */}
            <TextField required label="Location" variant="outlined" id="locationInput" value={location} onChange={handleChange} />

            {/* <label htmlFor="referenceNameInput">Reference Name</label> */}
            <TextField required label="Reference Name" variant="outlined" id="referenceNameInput" value={referenceName} onChange={handleChange} />

            {/* <label htmlFor="referencePhoneInput">Reference Phone #</label> */}
            <TextField required label="Reference's Phone #" variant="outlined" id="referencePhoneInput" value={referencePhone} onChange={handleChange} />

            {/* <label htmlFor="referenceEmailInput">Reference Email Address</label> */}
            <TextField required label="Reference's Email" variant="outlined" id="referenceEmailInput" value={referenceEmail} onChange={handleChange} />

            <label htmlFor="startDateInput">Start Date</label>
            <TextField required variant="outlined" type="date" id="startDateInput" value={startDate} onChange={handleChange} />

            <label htmlFor="endDateInput">End Date</label>
            <TextField required variant="outlined" type="date" id="endDateInput" value={startDate} onChange={handleChange} />

            {hasBeenSubmitted ? (
                <p>submitted</p>
            ) : (
                <button type="submit">+</button>
            )}

            </form>
            

        </div>
    )
}

export default MissionHistoryMultiRow
