import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageViewer from '../ImageComponents/ImageViewer';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from 

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function ProviderManagementIndividual() {

    const dispatch = useDispatch();
    const history = useHistory();

    const provider = useSelector(store => store.selectedProvider);

    const params = useParams();

    useEffect(() => {
        dispatch({
            type: 'SELECT_PROVIDER',
            payload: params.id
        })
    }, [params.id])
    // params.id in this array so that when it changes, the page refreshes^

    // material-ui
    const classes = useStyles();

    console.log('Selected provider: ', provider);

    const soloProviderStatus = () => {

        // don't need ?
        if (provider?.soloProvider == true) {
            return (
                <p>Yes</p>
            )
        } else {
            return (
                <p>No</p>
            )
        }
    } // end soloProviderStatus

    // test concat for image path
    const resumePath = `/api/image/ind/${provider?.resumeKey}`

    const verify = (provider) => {
        console.log('invidiual provider to verify: ', provider);
    }

    return (

        <div>

            <div key={provider?.provider_id}>
                <div>
                    <h1>Provider General Information</h1>
                    <h2>Name: {provider?.firstName} {provider?.lastName}</h2>
                    <p>{provider?.DOB}</p>
                    <h3>Contact Info</h3>
                    <p>{provider?.emailAddress}</p>
                    <p>{provider?.streetAddress}</p>
                    <p>{provider?.city}</p>
                    <p>{provider?.state}</p>
                    <p>{provider?.zipCode}</p>
                    <h3>Provider Role</h3>
                    <p>{provider?.providerRole}</p>
                    <h3>Comfortable Filling a Solo Provider Role?</h3>
                    {soloProviderStatus()}

                </div>

                {/* test of image get from s3 */}
                <h1>Provider Resume</h1>
                {/* works! can make this a light box, also only works atm if a provider has a resume image key, will bug otherwise, need to require the resume submission */}
                <ImageViewer imagePath={resumePath} />

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
                <TextField>
                    This user is currently verified
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => verify(provider)}
                >
                    Verify
                </Button>
            </div>

        </div>

    )

}

export default ProviderManagementIndividual;