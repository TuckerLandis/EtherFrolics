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
        },
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '5px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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

    console.log('Admin Landing Page administrator:', admin);

    return (

        <div>

            <div key={admin?.id}>
                <Typography
                    variant='h3'
                    className="adminLandingTitle"
                >
                    Welcome, {admin?.username}!
                </Typography>
            </div>

            <div className="buttonCorral">
                <Button
                    className="adminBtn"
                    variant="contained"
                    classes={{
                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }}
                    onClick={() => history.push('/providermgmt')}
                >
                    Provider Management
                </Button>
                <Button
                    className="adminBtn"
                    variant="contained"
                    classes={{
                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }}
                    onClick={() => history.push('/missions')}
                >
                    Mission Management
                </Button>
                <Button
                    className="adminBtn"
                    variant="contained"
                    classes={{
                        root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }}
                    onClick={() => history.push('/createmissionpage')}
                >
                    Create Mission
                </Button>
            </div>

        </div>

    )

}

export default AdminLandingPage;