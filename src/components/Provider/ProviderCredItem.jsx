import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ProviderCredItem({ provider }) {

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Credential Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.credentialName}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Licensing Board</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.licensingBoard}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>License Number</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.licenseNumber}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Issued Date</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.dateInitial}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Date Renewed</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.dateRenewed}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Expiration Date</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {provider[0]?.dateExpiring}
                    </Typography>
                </AccordionDetails>
            </Accordion>






        </div>
    )
}

export default ProviderCredItem;