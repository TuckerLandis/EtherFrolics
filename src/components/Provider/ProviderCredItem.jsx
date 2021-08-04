import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';

function ProviderCredItem({ provider }) {

    const history = useHistory();
    const { url } = useRouteMatch();

    const handleClick = (e, credential)  => {
        console.log(e.target.parentNode.parentNode.id)
        console.log(credential);
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
                    <List component="nav">
                        {provider.credential_array.map( (credential, i) => {
                            console.log(credential);
                            return (
                                <ListItem key={i} id={credential.credential_id} button >
                                    <ListItemText primary={`${credential.credentialName}`} onClick={ e => handleClick(e, credential)} secondary={`Expiration: ${credential.dateExpiring}`} />
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