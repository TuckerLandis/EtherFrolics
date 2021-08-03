import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListItem, ListItemText } from '@material-ui/core';

function ProviderCredItem({ provider }) {

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Credential Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider?.credential_array.map( (credential, i) => {
                            return (<ListItem key={i}><ListItemText>{credential.credentialName}</ListItemText></ListItem>)
                        })}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Licensing Board</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {provider?.credential_array.map( (credential, i) => {
                            return (<ListItem key={i}><ListItemText>{credential.licensingBoard}</ListItemText></ListItem>)
                    })}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">License Number</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {provider?.credential_array.map( (credential, i) => {
                            return (<ListItem key={i}><ListItemText>{credential.licenseNumber}</ListItemText></ListItem>)
                    })}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Issued Date</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {provider?.credential_array.map( (credential, i) => {
                            return (<ListItem key={i}><ListItemText>{credential.dateInitial}</ListItemText></ListItem>)
                    })}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Date Renewed</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {provider?.credential_array.map( (credential, i) => {
                            return (<ListItem key={i}><ListItemText>{credential.dateRenewed}</ListItemText></ListItem>)
                    })}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Expiration Date</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {provider?.credential_array.map( (credential, i) => {
                            return (<ListItem key={i}><ListItemText>{credential.dateExpiring}</ListItemText></ListItem>)
                    })}
                    </Typography>
                </AccordionDetails>
            </Accordion>






        </div>
    )
}

export default ProviderCredItem;