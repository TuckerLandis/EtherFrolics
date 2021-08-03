import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function EditGenInfo ( {provider} ) {

    const [editObj, setEditObj] = useState({
        firstname: provider.firstName,
        lastName: provider.lastName,
        providerRole: provider.providerRole,
        phoneNumber: provider.phoneNumber,
        emailAddress: provider.emailAddress,
        validPassport: provider.validPassport
    })

    const handleChange = (evt) => {
        evt.preventDefault();

        setEditObj({firstName: evt.target.value,
        lastName: evt.target.value})
        console.log(editObj.firstName);
    }

    return (
        <div>
            <form>
            <TextField
            type="text"
            value={editObj.firstName}
            onChange={(evt) => handleChange(evt)}
            />
            <TextField
            type="text"
            value={editObj.lastName}
            onChange={handleChange}
            />
            <TextField
            type="text"
            value={editObj.providerRole}
            onChange={(evt) => handleChange(evt)}
            />
            <TextField
            type="text"
            value={editObj.phoneNumber}
            onChange={(evt) => handleChange(evt)}
            />
            <TextField
            type="text"
            value={editObj.emailAddress}
            onChange={handleChange}
            />
            <TextField
            type="text"
            value={editObj.validPassport}
            onChange={handleChange}
            />
            </form>
        </div>
    )
}

export default EditGenInfo; 