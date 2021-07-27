import { useState } from "react"
import { TextField } from "@material-ui/core"
import { useDispatch } from "react-redux"

function WorkHistoryMultiRow (props) {

    const dispatch = useDispatch()

    const [workplace, setWorkplace] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [referenceName, setReferenceName] = useState('')
    const [referencePhone, setReferencePhone] = useState('')
    const [referenceEmailAddress, setReferenceEmailAddress] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)


    /**
     * on clicking the add button, flip boolean for this item, send dispatch, call function that lives in WorkHistory to render new item
     */
    function submitWorkHistoryItem () {
        
        setHasBeenSubmitted(true)

        dispatch({
            type: 'ADD_WORK_HISTORY_ITEM',
            payload : {
                workplace : workplace,
                jobTitle : jobTitle,
                referenceName : referenceName,
                referencePhone : referencePhone,
                referenceEmailAddress :referenceEmailAddress,
                startDate : startDate,
                endDate : endDate,
            }
        })

        props.addWorkHistoryItem()

    }
    

    /**
     * Takes in an event from all inputs, conditonally changes the related state variable
     * @param {*} e 
     */
    function handleChange (e) {
        switch(e.target.id){
            case 'workplaceInput' : 
            setWorkplace(e.target.value)
            break
            case 'jobTitleInput' : 
            setJobTitle(e.target.value)
            break
            case 'referenceNameInput' : 
            setReferenceName(e.target.value)
            break
            case 'referencePhoneInput' : 
            setReferencePhone(e.target.value)
            break
            case 'referenceEmailInput' : 
            setReferenceEmailAddress(e.target.value)
            break
            case 'startDateInput' : 
            setStartDate(e.target.value)
            break
            case 'endDateInput' : 
            setEndDate(e.target.value)
            break
        }
    }


    return(
        <div>
            <label htmlFor="workPlaceInput">Work Place</label>
            <TextField type="text" name="workplace" id="workplaceInput" value={workplace} onChange={handleChange}/>

            <label htmlFor="jobTitleInput">Job Title</label>
            <TextField type="text" name="city" id="jobTitleInput" value={jobTitle} onChange={handleChange} />

            <label htmlFor="referenceNameInput">Reference Name</label>
            <TextField type="text" name="referenceName" id="referenceNameInput" value={referenceName} onChange={handleChange}/>

            <label htmlFor="referencePhoneInput">Reference Contact #</label>
            <TextField type="text" name="referencePhone" id="referencePhoneInput" value={referencePhone} onChange={handleChange}/>

            <label htmlFor="referenceEmailInput">Reference Email Address</label>
            <TextField type="text" name="referenceEmail" id="referenceEmailInput" value={referenceEmailAddress} onChange={handleChange}/>

            <label htmlFor="startDateInput">Start Date</label>
            <TextField type="date" name="startDate" id="startDateInput" value={startDate} onChange={handleChange}/>

            <label htmlFor="endDateInput">End Date</label>
            <TextField type="date" name="endDate" id="endDateInput" value={endDate} onChange={handleChange}/>

            {hasBeenSubmitted ? (
                <p>submitted</p>
            ) : (
                
                <button onClick={submitWorkHistoryItem}>+</button>
            )}

            

        </div>
    )
}


export default WorkHistoryMultiRow


// - [ x]  multi row work submit
//     - [x ]  workplace
//     - [x ]  job title
//     - [x ]  reference name
//     - [ x]  reference contact #
//      - [x] reference email
//     - [x ]  start date
//     - [x ]  end date
