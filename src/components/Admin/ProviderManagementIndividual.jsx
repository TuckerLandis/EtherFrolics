import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageViewer from '../ImageComponents/ImageViewer';

// css
import './ProviderManagementIndividual.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

// sweetalert
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function ProviderManagementIndividual() {

    const dispatch = useDispatch();
    const history = useHistory();

    const provider = useSelector(store => store.selectedProvider);

    const params = useParams();

    const selectProvider = () => {
        dispatch({
            type: 'SELECT_PROVIDER',
            payload: params.id
        })
    } // end selectProvider

    useEffect(() => {
        console.log('individual provider params.id: ', params.id);
        selectProvider();
    }, [params.id])
    // params.id in this array so that when it changes, the page refreshes^

    console.log('Selected provider: ', provider);

    const soloProviderStatus = () => {

        // don't need ?
        if (provider?.soloProvider == true) {
            return (
                <Typography>Yes</Typography>
            )
        } else {
            return (
                <Typography>No</Typography>
            )
        }
    } // end soloProviderStatus

    // test concat for image path
    const resumePath = provider.resumeKey && `/api/image/prov/${provider.resumeKey}`

    // verifies provider using provider.provider_id
    const verify = (provider_id) => {
        console.log('invidiual provider to verify: ', provider_id);
        dispatch({
            type: 'VERIFY_PROVIDER',
            payload: provider_id
        })
        selectProvider();
    } // end verify

    const disable = (provider_id) => {
        console.log('individual provider to disable: ', provider_id);
        dispatch({
            type: 'DISABLE_PROVIDER',
            payload: provider_id
        })
        selectProvider();
    } // end disable

    // displays whether a user has been verified or not by admin
    const verificationStatus = () => {
        if (provider.verified == true) {
            return (
                'verified'
            )
        } else {
            return (
                'disabled'
            )
        }
    } // end verificationStatus

    // material-ui
    const classes = useStyles();
    const [openGen, setOpenGen] = React.useState(false);
    const [openRes, setOpenRes] = React.useState(false);
    const [openCred, setOpenCred] = React.useState(false);
    const [openWork, setOpenWork] = React.useState(false);
    const [openMis, setOpenMis] = React.useState(false);
    const [openEd, setOpenEd] = React.useState(false);
    const [openIns, setOpenIns] = React.useState(false);
    const [openVer, setOpenVer] = React.useState(false);

    const handleClickGen = () => {
        setOpenGen(!openGen);
    };

    const handleClickRes = () => {
        setOpenRes(!openRes);
    };

    const handleClickCred = () => {
        setOpenCred(!openCred);
    };

    const handleClickWork = () => {
        setOpenWork(!openWork);
    };

    const handleClickMis = () => {
        setOpenMis(!openMis);
    };

    const handleClickEd = () => {
        setOpenEd(!openEd);
    };

    const handleClickIns = () => {
        setOpenIns(!openIns);
    };

    const handleClickVer = () => {
        setOpenVer(!openVer);
    };

    return (

        <div>
            <div key={provider?.provider_id}></div>

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Typography variant="h4">Provider: {provider.firstName} {provider.lastName}</Typography>
                    </ListSubheader>
                }
                className={classes.root}
            >
                <Divider />
                <ListItem button onClick={handleClickGen}>
                    <ListItemText>
                        <Typography variant="h6">General Information</Typography>
                    </ListItemText>
                    {openGen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openGen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                <Divider component="li" variant="middle" />
                                <br />
                                <Typography variant="h6">Date of Birth</Typography>
                                <Typography>{provider?.DOB}</Typography>
                                <br />
                                <Divider component="li" variant="middle" />
                                <br />
                                <Typography
                                    variant="h6">Contact Info</Typography>
                                <Typography variant="subitle2">{provider?.emailAddress}</Typography>
                                <Typography>{provider?.streetAddress}</Typography>
                                <Typography>{provider?.city}</Typography>
                                <Typography>{provider?.state}</Typography>
                                <Typography>{provider?.zipCode}</Typography>
                                <br />
                                <Divider component="li" variant="middle" />
                                <br />
                                <Typography variant="h6">Provider Role</Typography>
                                <Typography>{provider?.providerRole}</Typography>
                                <br />
                                <Divider component="li" variant="middle" />
                                <br />
                                <Typography variant="h6">Comfortable Filling a Solo Provider Role?</Typography>
                                <Typography>{soloProviderStatus()}</Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickRes}>
                    <ListItemText>
                        <Typography variant="h6">Resume</Typography>
                    </ListItemText>
                    {openRes ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openRes} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            {/* test of image get from s3 */}
                            <ListItemText>
                                <Divider component="li" variant="middle" />
                                <br />
                                {/* works! can make this a light box, also only works atm if a provider has a resume image key, will bug otherwise, need to require the resume submission */}
                                {resumePath && <ImageViewer imagePath={resumePath} />}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickCred}>
                    <ListItemText>
                        <Typography variant="h6">Credentials</Typography>
                    </ListItemText>
                    {openCred ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCred} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                <Divider component="li" variant="middle" />
                                <br />
                                {provider?.credential_array?.map(credential => {
                                    return <p>{credential?.credentialName}</p> // needs to be flesched out, but gets data back
                                })}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickWork}>
                    <ListItemText>
                        <Typography variant="h6">Work History</Typography>
                    </ListItemText>
                    {openWork ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openWork} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                <Divider component="li" variant="middle" />
                                <br />
                                {provider?.work_experience_array?.map(workHistory => {
                                    return(
                                        <div>
                                            <Typography>{workHistory?.workplace}</Typography>
                                        </div>
                                        ) // needs to be flesched out, but gets data back
                                })}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickMis}>
                    <ListItemText>
                        <Typography variant="h6">Mission History</Typography>
                    </ListItemText>
                    {openMis ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMis} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                {provider?.mission_experience_array?.map(missionExp => {
                                    return (
                                        <div>
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography>{missionExp?.location}</Typography>
                                        </div>
                                    ) // needs to be flesched out, but gets data back
                                })}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickEd}>
                    <ListItemText>
                        <Typography variant="h6">Education</Typography>
                    </ListItemText>
                    {openEd ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openEd} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                {provider?.education_array?.map(education => {
                                    return (
                                        <div>
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">Institution</Typography>
                                            <Typography>{education?.institution}</Typography>
                                            <br />
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">Degree</Typography>
                                            <Typography>{education?.degree}</Typography>
                                        </div>
                                    ) // needs to be flesched out, but gets data back
                                })}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickIns}>
                    <ListItemText>
                        <Typography variant="h6">Insurance Policies</Typography>
                    </ListItemText>
                    {openIns ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openIns} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                {provider?.insurance_array?.map(insurance => {
                                    return (
                                        <div>
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">Type</Typography>
                                            <Typography>{insurance?.insuranceType}</Typography>
                                            <br />
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">Provider</Typography>
                                            <Typography>{insurance?.insuranceProvider}</Typography>
                                            <br />
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">State</Typography>
                                            <Typography>{insurance?.state}</Typography>
                                            <br />
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">Initial Date</Typography>
                                            <Typography>{insurance?.dateInitial}</Typography>
                                            <br />
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">Renewal Date</Typography>
                                            <Typography>{insurance?.dateRenewed}</Typography>
                                            <br />
                                            <Divider component="li" variant="middle" />
                                            <br />
                                            <Typography variant="h6">Expiration Date</Typography>
                                            <Typography>{insurance?.dateExpiring}</Typography>
                                        </div>
                                    ) // needs to be flesched out, but gets data back
                                })}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickVer}>
                    <ListItemText>
                        <Typography variant="h6">Verification Status</Typography>
                    </ListItemText>
                    {openVer ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openVer} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                <Divider component="li" variant="middle" />
                                <br />
                                <Typography>{provider?.firstName} is currently {verificationStatus()}</Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

            </List>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => verify(provider?.id)}
                >
                    Verify
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => disable(provider?.id)}
                >
                    Disable
                </Button>
            </div>

        </div>

    )

}

export default ProviderManagementIndividual;