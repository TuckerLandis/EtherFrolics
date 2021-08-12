import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';

function CreateMissionPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    //create local states to collect data
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [missionLink, setMissionLink] = useState('');
    const [applyLink, setApplyLink] = useState('');

    // read-only variable for the mission status
    const missionActive = true;

    //create a function that will send the form data to the server
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //need to create an object that will collect the data and dispatch it to the saga
        const missionObj = {
            name: name,
            location: location,
            startDate: startDate,
            endDate: endDate,
            missionLink: missionLink,
            applyLink: applyLink,
            missionActive: missionActive
        }

        dispatch({
            type: 'POST_MISSION_DATA',
            payload: missionObj
        })

        //clear local states
        setName('');
        setLocation('');
        setStartDate('');
        setEndDate('');
        setMissionLink('');
        setApplyLink('');

        
        history.push('/missions');
    }

    return (
        <div>

            <Typography variant="h4" className="registration-title">Create Mission</Typography>
            <hr></hr>

            <div className="general-form-display">

                <form onSubmit={handleSubmit}>
                    <div className="general-form-sub-display">

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Organization"
                                required
                                value={name}
                                onChange={(evt) => setName(evt.target.value)}/>
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Location"
                                required
                                value={location}
                                onChange={(evt) => setLocation(evt.target.value)} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="date"
                                variant="outlined"
                                label="Start Date"
                                required
                                InputLabelProps={{ shrink: true }}
                                value={startDate}
                                onChange={(evt) => setStartDate(evt.target.value)} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="date"
                                variant="outlined"
                                label="End Date"
                                required
                                InputLabelProps={{ shrink: true }}
                                value={endDate}
                                onChange={(evt) => setEndDate(evt.target.value)}
                            />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Link to Mission"
                                value={missionLink}
                                onChange={(evt) => setMissionLink(evt.target.value)} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Link to Apply"
                                value={applyLink}
                                onChange={(evt) => setApplyLink(evt.target.value)} />
                        </div>

                        <div className="text-field-wrapper">
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >Add Mission</Button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateMissionPage;