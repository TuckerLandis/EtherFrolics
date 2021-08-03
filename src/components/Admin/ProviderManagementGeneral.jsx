import React, { useEffect } from 'react';
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
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         maxWidth: 360,
//         backgroundColor: theme.palette.background.paper,
//         position: 'relative',
//         overflow: 'auto',
//         maxHeight: 300,
//     },
//     listSection: {
//         backgroundColor: 'inherit',
//     },
//     ul: {
//         backgroundColor: 'inherit',
//         padding: 0,
//     },
// }));

function ProviderManagementGeneral() {

    const dispatch = useDispatch();
    const history = useHistory();

    const providers = useSelector(store => store.providers);

    // material-ui
    const classes = useStyles();

    useEffect(() => {
        dispatch({ type: 'GET_PROVIDERS' });
    }, []);

    console.log('Provider Mgmt Gen providers:', providers);

    const handleSelect = (providerId) => {

        console.log('Provider Mgmt Gen provider id: ', providerId);

        dispatch({
            type: 'SELECT_PROVIDER',
            payload: providerId
        })
        history.push(`/providermgmt/${providerId}`);
    } // end handleSelect

    // dispatch to get all provider info, line 43
    // bring it back with useSelector, save to variable providers, line 39
    // map over array of provider objects to append them to material-ui list, line 80
    // handleSelect fn takes in clicked provider's user_id, line 82
    // dispatches with user_id as payload to get all info for selected provider, line 54
    // handleSelect fn pushes user to individual provider's page, line 58
    // copied and pasted another <li below line 86 to get second subheader 'Unverified'
    // ^ honestly probably don't need this. i forgot we're doing the icon thing (wireframe 2.4.1a), line 88
    // possibly conditionally render providers in either verified or unverified list based on provider.verified boolean value?
    // need to integrate icons into list for verified/unverified and flag icon for expiring credentials warning
    // need to add functionality to icons

    const verifiedProviders = providers.filter(provider => provider.verified === true)
    const unVerifiedProviders = providers.filter(provider => provider.verified === false)

    //    onClick={() => handleSelect(provider?.user_id)}
    //    onClick={() => handleSelect(provider?.user_id)}

    return (

        <div>

            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        {providers?.map(provider)}
                        <ListItemText primary={provider?.firstName} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
            </div>

        </div>

    )

} // end ProviderManagementGeneral

export default ProviderManagementGeneral;