import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import DatePicker from '@material-ui/lab/DatePicker';

// ## Checklist

// - [ ]  Create Mission (Add Mission) Form
//     - [ ]  Organization
//     - [ ]  Location
//     - [ ]  Start date
//     - [ ]  End date
//     - [ ]  Link to the mission page (application)
//     - [ ]  Checkbox for if mission requires a solo-practitioner
// - [ ]  Post route to the missions table

function CreateMissionPage() {
    const dispatch = useDispatch();

    //create local states to collect data
    const [organization, setOrganization] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [missionLink, setMissionLink] = useState('');
    const [solePractitioner, setSolePractitioner] = useState(false);

    //create a function that will send the form data to the server
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //need to create an object that will collect the data and dispatch it to the saga
        const missionObj = {
            name: organization,
            location: location,
            soleProvider: solePractitioner,
            startDate: startDate,
            endDate: endDate,
            missionLink: missionLink
        }
        console.log(missionObj);

        dispatch({
            type: 'POST_MISSION_DATA',
            payload: missionObj
        })

        //clear local states
        setOrganization('');
        setLocation('');
        setStartDate('');
        setEndDate('');
        setMissionLink('');
        // setSoloPractitioner('');
        //need to find a way to clear the check box upon posting
    }
    
        const handleChange = (event) => {
          setSolePractitioner(event.target.checked);
        };
    

    return (
        <div>

            <h2>Create Mission</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    label="Organization"
                    value={organization}
                    onChange={(evt) => setOrganization(evt.target.value)} />
                <TextField
                    type="text"
                    label="Location"
                    value={location}
                    onChange={(evt) => setLocation(evt.target.value)} />
                <input
                    type="date"
                    placeholder="start date"
                    value={startDate}
                    onChange={(evt) => setStartDate(evt.target.value)} />
                <input
                    type="date"
                    placeholder="end date"
                    value={endDate}
                    onChange={(evt) => setEndDate(evt.target.value)}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                <TextField
                    type="text"
                    label="Link to Apply "
                    value={missionLink}
                    onChange={(evt) => setMissionLink(evt.target.value)} />
                
                <FormLabel>Solo Practitioner?</FormLabel>
                <Checkbox
                    value={solePractitioner}
                    onChange={handleChange} 
                    />
                                        
                <Button
                    type="submit"
                    variant="contained"
                >Add Mission</Button>


            </form>

        </div>
    )
}

export default CreateMissionPage;