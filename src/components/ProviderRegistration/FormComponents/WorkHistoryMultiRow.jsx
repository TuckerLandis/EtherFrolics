function WorkHistoryMultiRow () {
    return(
        <div>
            <label htmlFor="workPlaceInput">Work Place</label>
            <TextField type="text" name="workplace" id="workplace" />

            <label htmlFor="jobTitleInput">Job Title</label>
            <TextField type="text" name="city" id="cityInput" />

            <label htmlFor="referenceNameInput">Reference Name</label>
            <TextField type="text" name="referenceName" id="referenceNameInput" />

            <label htmlFor="referencePhoneInput">Reference Contact #</label>
            <TextField type="text" name="referencePhone" id="referencePhoneInput" />

            <label htmlFor="referenceEmailInput">Reference Email Address</label>
            <TextField type="text" name="referenceEmail" id="referenceEmailInput" />

            <label htmlFor="startDateInput">Start Date</label>
            <TextField type="date" name="startDate" id="startDateInput" value={startDate} onChange={handleChange}/>

            <label htmlFor="endDateInput">End Date</label>
            <TextField type="date" name="endDate" id="endDateInput" value={endDate} onChange={handleChange}/>

        </div>
    )
}


export default WorkHistoryMultiRow


// - [ x]  multi row work submit
//     - [x ]  workplace
//     - [x ]  job title
//     - [x ]  reference name
//     - [ x]  reference contact #
//      - [x] reference email
//     - [x ]  start date
//     - [x ]  end date
