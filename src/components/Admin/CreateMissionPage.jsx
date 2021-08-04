import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

function CreateMissionPage() {
    const dispatch = useDispatch();

    //create local states to collect data
    const [organization, setOrganization] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [missionLink, setMissionLink] = useState('');
    const [applyLink, setApplyLink] = useState('');

    //create a function that will send the form data to the server
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //need to create an object that will collect the data and dispatch it to the saga
        const missionObj = {
            name: organization,
            location: location,
            startDate: startDate,
            endDate: endDate,
            missionLink: missionLink,
            applyLink: applyLink
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
        setApplyLink('');
    }
    

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
                <FormLabel>Start Date</FormLabel>
                <TextField
                    type="date"
                    value={startDate}
                    onChange={(evt) => setStartDate(evt.target.value)} />
                <FormLabel>End Date</FormLabel>
                <TextField
                    type="date"
                    value={endDate}
                    onChange={(evt) => setEndDate(evt.target.value)}
                />
                <TextField
                    type="text"
                    label="Link to Mission "
                    value={missionLink}
                    onChange={(evt) => setMissionLink(evt.target.value)} />

                <TextField
                    type="text"
                    label="Link to Apply "
                    value={applyLink}
                    onChange={(evt) => setApplyLink(evt.target.value)} />
                                        
                <Button
                    type="submit"
                    variant="contained"
                >Add Mission</Button>


            </form>

        </div>
    )
}

export default CreateMissionPage;