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
                    <Typography>Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.firstName} {provider[0]?.lastName}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Provider Role</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.providerRole}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Phone Number</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.phoneNumber}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Email</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.emailAddress}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Valid Passport</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.validPassport}
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </div>
    )
}





export default ProviderGenItem;