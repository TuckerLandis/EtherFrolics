
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

// Style with Material UI 
const useStyles = makeStyles({
    centerText: {
        textAlign: 'center',
    },
    tableContainer: {
        borderRadius: 32,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 32,
    },
    table: {
        minWidth: 400,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#7fbf7f',
    }
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

    return (
        <div>
            <Typography variant="h4" className="registration-title">Upcoming Missions</Typography>
        {provider.verified || user.authorization === 100 ? (<div>
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHeaderCell}>
                    <TableRow>
                        <TableCell className={classes.centerText}><Typography>Location</Typography></TableCell>
                        <TableCell className={classes.centerText}><Typography>Start Date</Typography></TableCell>
                        <TableCell className={classes.centerText}><Typography>End Date</Typography></TableCell>
                        <TableCell className={classes.centerText}><Typography>Organization</Typography></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
             
                {/*Takes the Mission Data from the Reducer */}
                <TableBody>
                    {missions.map((mission) => (
                        <TableRow key={mission.mission_id}>
                            <TableCell style={{textAlign: "center"}}><Typography><Link 
                            href={mission.missionLink} 
                            target="_blank" 
                            style={{ color: "#4f8f8f", fontWeight: "bold"}}>
                            {mission.location}</Link></Typography><TableCell>
                                <Link href={mission.applyLink}
                                    target="_blank"
                                    style={{ color: "#508e52", fontWeight: "bold"}}
                                    >
                                    Apply</Link></TableCell></TableCell>

                            <TableCell className={classes.centerText}><Typography>{mission.startDate.slice(0, 10)}</Typography></TableCell>
                            <TableCell className={classes.centerText}><Typography>{mission.endDate.slice(0, 10)}</Typography></TableCell>
                            <TableCell className={classes.centerText}><Typography>{mission.name}</Typography></TableCell>
                            {user.authorization === 100 ? 
                            (
                            <TableCell><Button
                            onClick={() => {editMission(mission)}}
                            variant="contained"
                            color="primary"
                            >Edit</Button></TableCell>
                            ) :
                            (<TableCell></TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>) : (
            <Typography variant="h4" className="registration-title">Once you are approved, you will be able to view upcoming missions!</Typography>
        )}
        
        </div>
    )
} 

export default MissionTable;
  
