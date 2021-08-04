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

    const admin = useSelector(store => store.administrators);

    // material-ui
    const classes = useStyles();

    useEffect(() => {
        dispatch({ type: 'GET_ADMIN' });
    }, []);

    console.log('Admin Landing Page administrator:', admin);

    return (

        <div className={classes.root}>

                    <div key={admin?.id}>
                        <h1>Welcome, {admin?.username}!</h1>
                    </div>

            <Button variant="contained" onClick={() => history.push('/providermgmt')}>Provider Management</Button>
            <Button variant="contained" onClick={() => history.push('/missions')}>Mission Management</Button>

        </div>

    )

}

export default AdminLandingPage;