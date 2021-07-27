import {useState} from 'react';

// ## Checklist

// - [ ]  Create Mission (Add Mission) Form
//     - [ ]  Organization
//     - [ ]  Location
//     - [ ]  Start date
//     - [ ]  End date
//     - [ ]  Link to the mission page (application)
//     - [ ]  Checkbox for if mission requires a solo-practitioner
// - [ ]  Post route to the missions table

function CreateMissionPage() {

    //create local states to collect data
    const [organization, setOrganization] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [missionLink, setMissionLink] = useState('');
    const [soloPractitioner, setSoloPractitioner] = useState(false);

    //create a function that will send the form data to the server

    const handleSubmit = (evt) => {
        //need to create an object that will collect the data and dispatch it to the saga
        const missionObj = {
            name: organization,
            location: location,
            soloProvider: soloPractitioner,
            startDate: startDate,
            endDate: endDate,
            missionLink: missionLink
        }

        console.log(missionObj);
    }

    return (
        <div>

            <h2>Create Mission</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="organization" 
                value={organization} 
                onChange={(evt) => setOrganization(evt.target.value)} />
                <input
                type="text"
                placeholder="location"
                value={location}
                onChange={(evt) => setLocation(evt.target.value)}/>
                <input 
                type="date"
                placeholder="start date"
                value={startDate}
                onChange={(evt) => setStartDate(evt.target.value)} />
                <input 
                type="date"
                placeholder="end date"
                value={endDate}
                onChange={(evt) => setEndDate(evt.target.value)}
                />
                <input 
                type="text"
                placeholder="link to mission application"
                value={missionLink}
                onChange={(evt) => setMissionLink(evt.target.value)} />
                <input 
                type="checkbox"
                value={soloPractitioner}
                onChange={(evt) => setSoloPractitioner(evt.target.checked) } />
                <button type="submit">Add Mission</button>


            </form>

        </div>
    )
}

export default CreateMissionPage;