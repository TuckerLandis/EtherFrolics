function WorkHistory () {
    return(
        <div>
            <label htmlFor="yearsExperienceInput">Years of experience</label>
            <input type="range" name="yearsExperience" id="yearsExperienceInput" 
            min="0" max="100"
            />
            {/* this can and likely will change to be a radio with different year chuncks, 
            but our DB would need to change? maybe it wouldn't. regardless, it's a range slider for now  */}

           {/* work history multi row form component goes here, along with submit button, included in that component */}

           {/* next button goes here */}

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default WorkHistory




// ## Checklist

// - [ ]  Inputs
//     - [ ]  years of experience - divided into 1-2 2-5 5-10 +5 year chunks (range)
// - [ ]  multi row work submit
//     - [ ]  workplace
//     - [ ]  job title
//     - [ ]  reference name
//     - [ ]  reference contact #
//     - [ ]  start date
//     - [ ]  end date
//     - [ ]  button to add another form for work
//     - [ ]  resume upload
// - [ ]  next button → mission experience
// - [ ]  stepper

// ## Components

// - [ ]  work history form component - this contains inputs for work history, gets duplicated by + button
// - [ ]  header, stepper

// - [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

// ## Routes

// - [ ]  put route to provider table
// - [ ]  post route to work history table
// - [ ]  post to amazon s3