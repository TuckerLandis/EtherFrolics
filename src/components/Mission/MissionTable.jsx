
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Style with Material UI 
const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});



function MissionTable() {

    // Material UI classes 
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    // Get the Missions information from the reducer so we can render it
    const missions = useSelector(store => store.mission);

    const provider = useSelector(store => store.providerLandingReducer);

    // Get user data 
    const user = useSelector(store => store.user);

    // Upon page load, this function dispatches "fetch missions" command to the generator function 
    useEffect(() => {
        getData()
    }, []);

    const editMission = (mission) => {
        dispatch({
            type: 'EDIT_MISSION',
            payload: mission
        })
        
        history.push('/editmission')
    }

    const getData = () => {
        dispatch({
            type: 'FETCH_MISSIONS'
        });
        dispatch({
            type: 'GET_PROVIDER_LANDING'
        })
    }
    console.log(provider);

    return (
        <div>
            <h2>Upcoming Missions</h2>
        {provider.verified || user.authorization === 100 ? (<div>
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Organization</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
             
                {/*Takes the Mission Data from the Reducer */}
                <TableBody>
                    {missions.map((mission) => (
                        <TableRow key={mission.mission_id}>
                            <TableCell><a href={mission.missionLink} target="_blank">{mission.location}</a></TableCell>
                            <TableCell>{mission.startDate.slice(0, 10)}</TableCell>
                            <TableCell>{mission.endDate.slice(0, 10)}</TableCell>
                            <TableCell>{mission.name}</TableCell>
                            <TableCell>
                                <a href={mission.applyLink}
                                    target="_blank"
                                    >
                                    Apply</a></TableCell>
                            {user.authorization === 100 ? 
                            (
                            <TableCell><Button
                            onClick={() => {editMission(mission)}}
                            >Edit</Button></TableCell>
                            ) :
                            (<TableCell></TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>) : (
            <h2>Once you are approved, you will be able to view upcoming missions!</h2>
        )}
        
        </div>
    )
} 

export default MissionTable;
  
