import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ProviderGenItem({ provider }) {


    return (
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
    )
}





export default ProviderGenItem;