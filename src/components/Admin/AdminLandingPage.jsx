// welcome justin!
// links to provider mgmt
// links to create mission

/* 

CHECKLIST 

    [] Welcome Statement

    [] Navigation
        [] link/button to redirects to Mission Display (MissionTable component)
        [] 
    []
*/

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './AdminLandingPage.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function AdminLandingPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const administrators = useSelector(store => store.administrators);

    // material-ui
    const classes = useStyles();

    useEffect(() => {
        dispatch({ type: 'GET_ADMIN' });
    }, []);

    console.log(administrators);

    return (

        <div classname={classes.root}>

            {administrators?.map(admin => {
                return (
                    <div key={admin?.id}>
                        <h1>Welcome, {admin?.username}!</h1>
                    </div>
                )
            })}

            <Button variant="contained" onClick={() => history.push('/providermgmt')}>Provider Management</Button>
            <Button variant="contained" onClick={() => history.push('/missions')}>Mission Management</Button>

        </div>

    )

}

export default AdminLandingPage;