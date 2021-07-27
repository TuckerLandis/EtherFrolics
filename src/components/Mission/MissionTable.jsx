// ## Checklist

// - [ ]  Mission Table
//     - [ ]  Missions are organized by date with the most current mission at the top (use-effect that sorts by date GET route)
//     - [ ]  Sort-by feature to organize table data (stretch)
// - [ ]  Table Columns
//     - [ ]  Date
//     - [ ]  Location
//         - [ ]  Location links to information on the location (travel info, possible wikipedia link? maybe something else that looks cleaner)
//     - [ ]  Organization
//     - [ ]  Pseudo column that will have the apply button

//     # Component(s)

//     - [ ]  Missions Table
//     - [ ]  I'm Interested Button
//         - [ ]  Will link to [mmi.org/projects-usd](http://mmi.org/projects-usd) for the provider to be able to apply to selected mission

//         # Route(s)

//         - [ ]  GET
//             - [ ]  Missions Table


import React, { useEffect } from 'react';
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

// Table Data styled with Material UI


function MissionTable() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    // Get the Missions information from the reducer so we can render it
    // const trails = useSelector(store => store.trails);

    // Upon page load, this function dispatches "fetch missions" command to the generator function 
    useEffect(() => {
        dispatch({ type: 'FETCH_MISSIONS' })

    }, []);

    return (
        <div>
            <h2>Upcoming Missions</h2>

            <p>in Mission Table </p>

        </div>

    )
} // end Mission Table

export default MissionTable;


