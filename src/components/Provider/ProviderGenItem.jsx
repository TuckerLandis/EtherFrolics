import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditGenInfo from './ProviderEditGenInfo';

import ImageViewer from '../ImageComponents/ImageViewer';

import './ProviderLanding.css';
import { useSelector } from 'react-redux';

function ProviderGenItem({ provider }) {

    const [editState, setEditState] = useState(false); 
    const user = useSelector(store => store.user)

    // path to s3 for image rendering
    // const resumePath = `/api/image/prov/${provider?.resumeKey}`
    const resumePath = `/api/image/prov/${user.id}/${provider?.resumeKey}`
        
    return ( 
        <div className="genSection">
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
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">Resume</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {provider.resumeKey && <ImageViewer imagePath={resumePath} />}
                </AccordionDetails>
            </Accordion>
            </div>
            )}

            {!editState ?
                <Button 
                variant="contained"
                color="primary"
                size="large"
                onClick={ () => {setEditState(!editState)}}>Edit General Info</Button>
            :
                <Button 
                variant="contained"
                color="secondary"
                size="large"
                onClick={ () => {setEditState(!editState)}}>Cancel Edit</Button>
            }
        
        </div>
    )
}





export default ProviderGenItem;