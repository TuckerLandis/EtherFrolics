import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './ProviderManagementGeneral.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

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

        console.log('prvdrmgmtgen provider id (item id): ', providerId);

        dispatch({
            type: 'SELECT_PROVIDER',
            payload: providerId
        })
        history.push(`/providermgmt/${providerId}`);
    } // end handleSelect

    return (

        <List className={classes.root} subheader={<li />}>
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>Verified</ListSubheader>
                        {providers?.map((provider) => (
                            <ListItem key={provider?.provider_id}>
                                <ListItemText onClick={() => handleSelect(provider?.user_id)}>{provider?.firstName}</ListItemText>
                            </ListItem>
                        ))}
                    </ul>
                </li>

                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>Unverified</ListSubheader>
                        {[0, 1, 2].map((item) => (
                            <ListItem key={`item-${item}`}>
                                <ListItemText>Ouch</ListItemText>
                            </ListItem>
                        ))}
                    </ul>
                </li>
        </List>

    )

} // end ProviderManagementGeneral

export default ProviderManagementGeneral