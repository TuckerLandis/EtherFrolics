import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './ProviderManagementGeneral.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        height: 1,
        '& > *': {
            margin: theme.spacing(1),
            width: '75%',
        },
        alignItems: 'center',
        margin: 'auto',
    },
    demo: {
        // backgroundColor: '#2E8B57',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function ProviderManagementGeneral() {

    const dispatch = useDispatch();
    const history = useHistory();

    const providers = useSelector(store => store.providers);

    const [searchQuery, setSearchQuery] = useState('');

    // material-ui
    const classes = useStyles();

    useEffect(() => {
        dispatch({ type: 'GET_PROVIDERS' });
    }, []);

    const handleSelect = (id) => {

        dispatch({
            type: 'SELECT_PROVIDER',
            payload: id
        })
        history.push(`/providermgmt/${id}`);
    } // end handleSelect

    // const verifiedProviders = providers.filter(provider => provider.verified === true)
    // const unVerifiedProviders = providers.filter(provider => provider.verified === false)

    const starIcon = (provider) => {
        if (provider.verified == true) {
            return (
                <StarIcon color="primary" />
            )
        } else {
            return;
        }
    }

    return (

        <div className="admin-prov-gen">

            <Typography variant="h4" className="providerMgmtListTitle">PROVIDERS</Typography>
            <hr />

            <div className={classes.root}>
                    <div className="search-wrapper">
                            <TextField
                                label="Search..."
                                type="texts"
                                variant="outlined"
                                onChange={event => setSearchQuery(event.target.value)}
                                className="search-wrapper"
                            />
                            <TextField />
                    </div>
                    <Paper style={{maxHeight: 300, overflow: 'auto', maxWidth: '100%'}} className="admin-prov-gen-paper">
                    {providers?.filter(provider => {
                        if (searchQuery == '') {
                            return provider
                        } else if (provider?.firstName?.toLowerCase().includes(searchQuery?.toLowerCase())) {
                            return provider
                        }
                    }).map(provider => {
                        return (
                            <div key={provider?.provider_id} className="listOfProviders">
                                <Grid item xs={12} md={6}>
                                    <div className={classes.demo}>
                                        <List dense={false}>
                                            <div>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        {starIcon(provider)}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        onClick={() => handleSelect(provider?.user_id)}
                                                        className="mouse"
                                                    >
                                                        <Typography>{provider?.firstName} {provider?.lastName} - {provider?.providerRole}</Typography>
                                                    </ListItemText>
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        </List>
                                    </div>
                                </Grid>
                            </div>
                        )
                    })}
                    </Paper>
               

            </div>

        </div >

    )

} // end ProviderManagementGeneral

export default ProviderManagementGeneral;