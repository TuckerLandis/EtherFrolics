import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import {Button, FormLabel, TextField} from '@material-ui/core';

function EditMissionPage () {
    const dispatch = useDispatch();
    const history = useHistory();

    const mission = useSelector(store => store.editMission)
    
    const setDateIfAvailable = (whichDate) => {
        if (mission.startDate && mission.endDate){
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
        mission_id: mission.mission_id
    })

    const handleChange = (evt) => {
        evt.preventDefault();

        setMissionObj({...missionObj, [evt.target.name]: evt.target.value})
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
            <h2>Edit Mission</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                type="text"
                value={missionObj.name}
                name="name"
                onChange={handleChange}/>
                <TextField 
                type="text" 
                value={missionObj.location} 
                name="location" 
                onChange={handleChange}/>

                <TextField
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                name="startDate"
                value={missionObj.startDate}
                onChange={handleChange}/>

                <TextField
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                name="endDate"
                value={missionObj.endDate}
                onChange={handleChange}/>

                 <TextField 
                 type="text"
                 name="missionLink"
                 value={missionObj.missionLink}
                 onChange={handleChange}/>

                 <TextField 
                 type="text"
                 name="applyLink"
                 value={missionObj.applyLink}
                 onChange={handleChange}/>

                <Button
                variant="contained"
                type="submit"
                >Submit</Button>
            </form>
        </div>
    )
}

export default EditMissionPage;