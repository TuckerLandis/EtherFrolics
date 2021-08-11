import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, MenuItem, Select, TextField} from '@material-ui/core';


function EditGenInfo ( {provider} ) {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(store => store.user);

    const [editObj, setEditObj] = useState({
        firstName: provider.firstName,
        lastName: provider.lastName,
        providerRole: provider.providerRole,
        phoneNumber: provider.phoneNumber,
        emailAddress: provider.emailAddress,
        validPassport: provider.validPassport,
        userId: user.id,
        providerId: provider.provider_id
    })

    const handleChange = (evt) => {
        evt.preventDefault();

        setEditObj({...editObj, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: 'UPDATE_PROVIDER',
            payload: editObj
        });
        history.push('/providerlandingpage')
    }

    return (
        <div className="general-form-display">
            <form onSubmit={handleSubmit}>
                
                <div className="text-field-wrapper">
                    <TextField
                    type="text"
                    variant="outlined"
                    name="firstName"
                    value={editObj.firstName}
                    onChange={handleChange}
                    />
                </div>

                <div className="text-field-wrapper">
                    <TextField
                    type="text"
                    variant="outlined"
                    name="lastName"
                    value={editObj.lastName}
                    onChange={handleChange}
                    />
                </div>

                <div className="text-field-wrapper">
                    <Select
                    name="providerRole"
                    variant="outlined"
                    value={editObj.providerRole}
                    displayEmpty
                    onChange={handleChange}>
                        <MenuItem value="" disabled>Provider Role</MenuItem>
                        <MenuItem value="CRNA">CRNA</MenuItem>
                        <MenuItem value="RN">RN</MenuItem>
                        <MenuItem value="CNP">CNP</MenuItem>
                        <MenuItem value="CNS">CNS</MenuItem>
                        <MenuItem value="PA-C">PA-C</MenuItem>
                        <MenuItem value="MD">MD</MenuItem>
                        <MenuItem value="DO">DO</MenuItem>
                        <MenuItem value="OTHER">OTHER</MenuItem>
                    </Select>
                </div>

                <div className="text-field-wrapper">
                    <TextField
                    type="text"
                    variant="outlined"
                    name="phoneNumber"
                    value={editObj.phoneNumber}
                    onChange={handleChange}
                    />
                </div>

                <div className="text-field-wrapper">
                    <TextField
                    type="text"
                    variant="outlined"
                    name="emailAddress"
                    value={editObj.emailAddress}
                    onChange={handleChange}
                    />
                </div>

                <div className="text-field-wrapper">
                    <Select
                    name="validPassport"
                    variant="outlined"
                    value={editObj.validPassport}
                    displayEmpty
                    onChange={handleChange}>
                        <MenuItem value="" disabled>Valid Passport</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </div>

                <div className="text-field-wrapper">
                    <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    >Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default EditGenInfo; 