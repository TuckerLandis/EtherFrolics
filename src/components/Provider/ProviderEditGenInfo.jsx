import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, MenuItem, Select, TextField} from '@material-ui/core';


function EditGenInfo ( {provider} ) {

    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const [editObj, setEditObj] = useState({
        firstName: provider.firstName,
        lastName: provider.lastName,
        providerRole: provider.providerRole,
        phoneNumber: provider.phoneNumber,
        emailAddress: provider.emailAddress,
        validPassport: provider.validPassport,
        table: 'credential',
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
            type: 'UPDATE_PROVDER',
            payload: editObj
        })

    }
console.log(editObj);
console.log('provider is', provider);

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <TextField
            type="text"
            name="firstName"
            value={editObj.firstName}
            onChange={handleChange}
            />
            <TextField
            type="text"
            name="lastName"
            value={editObj.lastName}
            onChange={handleChange}
            />
            <TextField
            type="text"
            name="providerRole"
            value={editObj.providerRole}
            onChange={handleChange}
            />
            <TextField
            type="text"
            name="phoneNumber"
            value={editObj.phoneNumber}
            onChange={handleChange}
            />
            <TextField
            type="text"
            name="emailAddress"
            value={editObj.emailAddress}
            onChange={handleChange}
            />
            <Select
            name="validPassport"
            value={editObj.validPassport}
            displayEmpty
            onChange={handleChange}>
                <MenuItem value="" disabled>Valid Passport</MenuItem>
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
            </Select>
            <Button
            variant="contained"
            type="submit"
            >Submit</Button>
            </form>
        </div>
    )
}

export default EditGenInfo; 