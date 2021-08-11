import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './AdminLandingPage.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            // padding: '10px',
        },
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '10px',
        margin: 'auto',
        display: 'inline-block',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.8)',
    },
label: {
    textTransform: 'capitalize',
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

    return (

        <div>

            <div key={admin?.id}>
                <Typography
                    variant='h3'
                    className="adminLandingTitle"
                >
                    Welcome, {admin?.username}!
                </Typography>
                <hr />
            </div>

            <div className="buttonCorral">
                <Button
                    className="adminBtn"
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push('/providermgmt')}
                >
                    Provider Management
                </Button>
                <br />
                <Button
                    className="adminBtn"
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push('/missions')}
                >
                    Mission Management
                </Button>
                <br />
                <Button
                    className="adminBtn"
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push('/createmissionpage')}
                >
                    Create Mission
                </Button>
            </div>

        </div>

    )

}

export default AdminLandingPage;