import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageViewer from '../ImageComponents/ImageViewer';

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
                                <Typography>Date of birth: {provider?.DOB}</Typography>
                                <Typography
                                    variant="h6">Contact Info</Typography>
                                <Typography>{provider?.emailAddress}</Typography>
                                <Typography>{provider?.streetAddress}</Typography>
                                <Typography>{provider?.city}</Typography>
                                <Typography>{provider?.state}</Typography>
                                <Typography>{provider?.zipCode}</Typography>
                                <Typography variant="h6">Provider Role</Typography>
                                <Typography>{provider?.providerRole}</Typography>
                                <Typography variant="h6">Comfortable Filling a Solo Provider Role?</Typography>
                                {soloProviderStatus()}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

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
                                {/* works! can make this a light box, also only works atm if a provider has a resume image key, will bug otherwise, need to require the resume submission */}
                                {resumePath && <ImageViewer imagePath={resumePath} />}
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

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

                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

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

                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

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

                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={handleClickEd}>
                    <ListItemText primary="Education" />
                    {openEd ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openEd} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>

                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={handleClickIns}>
                    <ListItemText primary="Insurance" />
                    {openIns ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openIns} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>

                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={handleClickVer}>
                    <ListItemText primary="Verification Status" />
                    {openVer ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openVer} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>

                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

            </List>

            <div key={provider?.provider_id}>
                
                <div>
                    <h1>Provider Credentials</h1>
                    {provider?.credential_array?.map(credential => {
                        return <p>{credential?.credentialName}</p> // needs to be flesched out, but gets data back
                    })}
                </div>
                <div>
                    <h1>Provider Work History</h1>
                    {provider?.work_experience_array?.map(workHistory => {
                        return <p>{workHistory?.workplace}</p> // needs to be flesched out, but gets data back
                    })}
                </div>
                <div>
                    <h1>Provider Mission History</h1>
                    {provider?.mission_experience_array?.map(missionExp => {
                        return <p>{missionExp?.location}</p> // needs to be flesched out, but gets data back
                    })}
                </div>
                <div>
                    <h1>Provider Education</h1>
                    {provider?.education_array?.map(education => {
                        return <p>{education?.institution}</p> // needs to be flesched out, but gets data back
                    })}
                </div>
                <div>
                    <h1>Provider Insurance</h1>
                    {provider?.insurance_array?.map(insurance => {
                        return <p>{insurance?.insuranceProvider}</p> // needs to be flesched out, but gets data back
                    })}
                </div>
            </div>

            <div>
                <h1>Verification Status</h1>
                <p>{provider?.firstName} is currently {verificationStatus()}</p>
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