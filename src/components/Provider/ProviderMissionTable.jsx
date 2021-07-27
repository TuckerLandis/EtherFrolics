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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const dispatch = useDispatch();
const history = useHistory();

function ProviderMissionTable() {

    // Upon page load, this function dispatches "fetch missions" command to the generator function 
    useEffect(() => {
        dispatch({ type: 'FETCH_MISSIONS' })

    }, []);

    return (
        <p>in Provider Landing Page</p>
    )
}

export default ProviderMissionTable;