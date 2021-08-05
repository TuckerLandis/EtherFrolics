import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Button, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

function EditMissionPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const mission = useSelector(store => store.editMission)

    const setDateIfAvailable = (whichDate) => {
        if (mission.startDate && mission.endDate) {
            const justDate = mission[whichDate].split('T');
            return justDate[0];
        } else {
            return '';
        }
    }

    const [missionObj, setMissionObj] = useState({
        startDate: setDateIfAvailable('startDate'),
        endDate: setDateIfAvailable('endDate'),
        location: mission.location,
        name: mission.name,
        missionLink: mission.missionLink,
        applyLink: mission.applyLink,
        missionActive: mission.missionActive,
        mission_id: mission.mission_id
    })

    const handleChange = (evt) => {
        evt.preventDefault();

        setMissionObj({ ...missionObj, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        dispatch({
            type: 'UPDATE_MISSION',
            payload: missionObj
        })
        history.push('/missions')
    }
    console.log(mission);

    return (
        <div>

            <Typography variant="h4" className="registration-title">Edit Mission</Typography>
            <div className="general-form-display">

                <form onSubmit={handleSubmit}>
                    <div className="general-form-sub-display">

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                value={missionObj.name}
                                name="name"
                                onChange={handleChange} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                value={missionObj.location}
                                name="location"
                                onChange={handleChange} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="date"
                                label="Start Date"
                                InputLabelProps={{ shrink: true }}
                                name="startDate"
                                value={missionObj.startDate}
                                onChange={handleChange} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="date"
                                label="End Date"
                                InputLabelProps={{ shrink: true }}
                                name="endDate"
                                value={missionObj.endDate}
                                onChange={handleChange} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                name="missionLink"
                                value={missionObj.missionLink}
                                onChange={handleChange} />
                        </div>

                        <div className="text-field-wrapper">
                            <TextField
                                type="text"
                                name="applyLink"
                                value={missionObj.applyLink}
                                onChange={handleChange} />
                        </div>

                    </div>

                    <div className="text-field-wrapper">
                        <Typography variant="h6">Disable Mission?</Typography>
                    </div>

                    <div className="provider-role-wrapper">
                        <Select
                            name="missionActive"
                            value={missionObj.missionActive}
                            onChange={handleChange}>
                            <MenuItem value={true}>No</MenuItem>
                            <MenuItem value={false}>Yes</MenuItem>
                        </Select>
                    </div>

                    <div className="text-field-wrapper">
                        <Typography>Note: This will remove the entry from the table and cannot be undone</Typography>
                    </div>

                    <div className="provider-role-wrapper">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >Submit</Button>
                    </div>

                    <div className="provider-role-wrapper">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => { history.push('/missions') }}
                        >Back</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditMissionPage;