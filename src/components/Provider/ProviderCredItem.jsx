import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton} from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function ProviderCredItem({ provider, credentialEntry, ImageViewer }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const [hasBeenClicked, setHasBeenClicked] = useState({});

    const handleDisplayOptions = (e, credential)  => {
        e.preventDefault();

        console.log(credential);
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

    console.log(credentialEntry);
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Credentials</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav">
                        {provider.credential_array.map( (credential, i) => {
                            const credentialImagePath = `/api/image/prov/${credential.credentialImageKey}`
                            console.log(credential);
                            return (
                                hasBeenClicked?.[credential.credentialName] ?
                                    <ListItem key={i} button >
                                        <ListItemIcon>
                                            <IconButton edge="start" >
                                                {/* <ImageViewer imagePath={credentialImagePath} /> */}
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText primary={`${credential.credentialName}`} onClick={handleCloseOptions} secondary={`Expiration: ${credential.dateExpiring}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" onClick={editCredential}>
                                                <EditIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                :

                                <ListItem key={i} button >
                                    <ListItemText primary={`${credential.credentialName}`} onClick={ e => handleDisplayOptions(e, credential)} secondary={`Expiration: ${credential.dateExpiring}`} />
                                </ListItem>
                                
                            )
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ProviderCredItem;