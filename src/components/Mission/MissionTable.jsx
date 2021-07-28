// ## Checklist

// - [x]  Mission Table
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

// Style with Material UI 
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(Date, Location, Organization, Apply ) {
    return { Date, Location, Organization, Apply };
}

const rows = [
    createData( '9/4', 'Sangolqui,Ecuador', 'Medical Ministry International', 'Apply'),
    createData( '9/11', 'Rio San Juan, Dominican Republic', 'Medical Ministry International', 'Apply'),
    createData( '9/11', 'Quevado, Ecuador', 'Medical Ministry International', 'Apply'),
]


function MissionTable() {

    // Material UI classes 
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    // Get the Missions information from the reducer so we can render it
    // const mission = useSelector(store => store.missions);

    // Upon page load, this function dispatches "fetch missions" command to the generator function 
    useEffect(() => {
        dispatch({ type: 'FETCH_MISSIONS' })

    }, []);


    // This function handles the apply button
    const handleApplyButton = () => {
        console.log('apply button clicked')
        // Sends the user to Apply on MMI
        window.location.assign('https://www.mmi.org/projects-usd');

    }

    return (
        <div>
            <h2>Upcoming Missions</h2>

        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell align="right">Organization</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.Date}
                            </TableCell>
                            <TableCell align="right">{row.Location}</TableCell>
                            <TableCell align="right">{row.Organization}</TableCell>
                            <TableCell align="right"><Button onClick={handleApplyButton} color="primary" variant="outlined">Apply</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableBody>
                    
                </TableBody> */}
            </Table>
        </TableContainer>
        </div>
    )
} // end Mission Table

export default MissionTable;


