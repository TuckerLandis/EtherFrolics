import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './ProviderManagementGeneral.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import { TextField } from '@material-ui/core';

import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        height: 1,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
      },
}));

function ProviderManagementGeneral() {

    const dispatch = useDispatch();
    const history = useHistory();

    const providers = useSelector(store => store.providers);

    const [searchQuery, setSearchQuery] = useState('');

    // material-ui
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    useEffect(() => {
        dispatch({ type: 'GET_PROVIDERS' });
    }, []);

    console.log('Provider Mgmt Gen providers:', providers);

    const handleSelect = (id) => {

        console.log(`Provider Mgmt Gen provider's user_id: `, id);

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
                <StarIcon />
            )
        } else {
            return;
        }
    }

    return (

        <div className="admin-prov-gen">

            <h1 className="providerMgmtListTitle">PROVIDERS</h1>

            <div className={classes.root}>
                    <div className="search-wrapper">
                            <TextField
                                label="Search..."
                                type="texts"
                                variant="outlined"
                                onChange={event => setSearchQuery(event.target.value)}
                            />
                            <TextField />
                    </div>
                    <Paper style={{maxHeight: 300, overflow: 'auto'}}>
                    {providers?.filter(provider => {
                        if (searchQuery == '') {
                            return provider
                        } else if (provider?.firstName.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return provider
                        }
                    }).map(provider => {
                        return (
                            <div key={provider?.provider_id}>
                                <Grid item xs={12} md={6}>
                                    <div className={classes.demo}>
                                        <List dense={dense}>
                                            <div>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        {starIcon(provider)}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={provider?.firstName}
                                                        onClick={() => handleSelect(provider?.user_id)}
                                                        className="mouse"
                                                    >
                                                    </ListItemText>
                                                </ListItem>
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