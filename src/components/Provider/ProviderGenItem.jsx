import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditGenInfo from './ProviderEditGenInfo';

function ProviderGenItem({ provider }) {

    const [editState, setEditState] = useState(false);

    return (
        <div>
            {editState ? (
                <EditGenInfo provider={provider} editState={editState}/>
            ) : (
            <div> 
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider?.firstName} {provider?.lastName}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Provider Role</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider?.providerRole}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Phone Number</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider?.phoneNumber}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Email</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider?.emailAddress}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Valid Passport</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider?.validPassport ? "Yes" : "No"}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            </div>
            )}

            {!editState ?
                <Button 
                variant="contained"
                color="primary"
                onClick={ () => {setEditState(!editState)}}>Edit General Info</Button>
            :
                <Button 
                variant="contained"
                color="secondary"
                onClick={ () => {setEditState(!editState)}}>Cancel Edit</Button>
            }
        
        </div>
    )
}





export default ProviderGenItem;