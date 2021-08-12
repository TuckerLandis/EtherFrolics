import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EditIcon from '@material-ui/icons/Edit';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ImageViewer from '../ImageComponents/ImageViewer';

const listItemClass = makeStyles(() => ({
    root: {
      width: '100%',
      textAlign: 'center'
    },
    warning: {
        backgroundColor: '#ffff89'
    },
    urgent: {
        backgroundColor: '#e14048',
    }
  }));

  const listTextClass = makeStyles(() => ({
    root: {
        backgroundColor: '#fff',
        padding: 15,
    },
    icon: {
        minWidth: 48,
        maxWidth: 84
    }
  }));

function ProviderCredItem({ provider, threeMonthsFromToday }) {

    const listItemClasses = listItemClass();
    const listTextClasses = listTextClass();
    const history = useHistory();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const [hasBeenClicked, setHasBeenClicked] = useState({});

    const user = useSelector(store => store.user)

    const handleDisplayOptions = (e, credential)  => {
        e.preventDefault();

        dispatch({
            type: 'SET_CREDENTIAL_ENTRY_UPDATE',
            payload: {
                credential_id: credential.credential_id,
                credentialName: credential.credentialName,
                licensingBoard: credential.licensingBoard,
                licenseNumber: credential.licenseNumber,
                dateInitial: credential.dateInitial,
                dateRenewed: credential.dateRenewed,
                dateExpiring: credential.dateExpiring,
                credentialImageKey: credential.credentialImageKey
            }
        })

        setHasBeenClicked({
            [credential.credentialName]: true
        })
    
    }

    const handleCloseOptions = e => {
        e.preventDefault();

        dispatch({
            type: 'RESET_CREDENTIAL_ENTRY',
            payload: {
                credentialName: '',
                licensingBoard: '',
                licenseNumber: '',
                dateInitial: '',
                dateRenewed: '',
                dateExpiring: '',
                credentialImageKey: ''
            }
        })

        setHasBeenClicked({})
    }

    const editCredential = e => {

        e.preventDefault();

        history.push(`${url}/edit`)
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Credentials</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={listItemClasses.root}>
                        <List component="nav">
                            {provider.credential_array.map( (credential, i) => {
                                const credentialImagePath = `/api/image/prov/${user.id}/${credential.credentialImageKey}`
                                return (
                                    hasBeenClicked?.[credential.credentialName] ?
                                        <ListItem  divider key={i} button >  
                                        {credential?.credentialImageKey &&              
                                            <ListItemIcon className={listTextClasses.icon}>                                                    
                                                <ImageViewer imagePath={credentialImagePath} />
                                            </ListItemIcon>
                                        }
                                            <ListItemText className={listTextClasses.root} primary={`${credential.credentialName}`} onClick={handleCloseOptions} secondary={`Expiration: ${credential.dateExpiring}`} />
                                            <ListItemSecondaryAction onClick={editCredential}>
                                                <IconButton edge="end" onClick={editCredential}>
                                                    <EditIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    :

                                        <ListItem divider key={i} button >
                                        {credential?.credentialImageKey && 
                                            <ListItemIcon className={listTextClasses.icon}>
                                                <ImageViewer imagePath={credentialImagePath} />
                                            </ListItemIcon>
                                        }
                                            <ListItemText className={listTextClasses.root} primary={`${credential.credentialName}`} onClick={ e => handleDisplayOptions(e, credential)} secondary={`Expiration: ${credential.dateExpiring}`} />
                                            {new Date(credential.dateExpiring + 'T00:00:00').getTime() - threeMonthsFromToday.getTime() <= 0 &&
                                                <ListItemSecondaryAction>
                                                    <ErrorOutlineIcon fontSize="large" color="error" />
                                                </ListItemSecondaryAction>
                                            }
                                        </ListItem>
                                    
                                )
                            })}
                        </List>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ProviderCredItem;