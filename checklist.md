-------------------------ADMIN-------------------------

-- ADMIN LANDING PAGE

welcome justin!
links to provider mgmt
links to create mission

[x] Welcome Statement
    [x] include admin name(username)

[x] Navigation
    [x] link/button to redirect to Mission Display (MissionTable component)
    [x] link/button to redirect to Provider Management General View

[x] Routes
    [x] GET '/api/admin'
        [x] query for admin id and username info




-- CREATE MISSION PAGE

[ ]  Create Mission (Add Mission) Form
    [ ]  Organization
    [ ]  Location
    [ ]  Start date
    [ ]  End date
    [ ]  Link to the mission page (application)
    [ ]  Checkbox for if mission requires a solo-practitioner
    [ ]  Post route to the missions table




-- EDIT MISSION PAGE

[ ]  Mission Edit Form (will navigate back to this upon edit button being clicked)
    [ ]  Will be able to change the:
    [ ]  Organization name
    [ ]  Location name
    [ ]  Date boxes
    [ ]  Check box or un-check solo practitioner
    [ ]  Check box to enable or disable if it is still a mission
    [ ]  Submit Changes button (PUT route with all info to update the missions table)

[ ]Component(s)
    [ ]  Mission Detail component
    [ ]  Can re-use Mission Detail component (stretch)

[ ] Route(s)
    [ ]  PUT route to the Mission Detail view




-- PROVIDER MGMT GENERAL

[ ] Checklist
    [ ]  Search bar
        [ ]  Filter by
            [ ]  verified
            [ ]  unverified
    [ ]  Function to attach flag icon button (stretch)
    [ ]  Provider List
        [ ]  get route to all providers
        [ ]  map over to list them out
        [ ]  Flag icon
            [ ]  for expiring certs
        [ ]  Star icon
            [ ]  for verified providers
    [ ]  On-Click fn
        [ ]  Clicking provider name sends user to 2.4.1b along with provider info

[ ] Component(s)

    [ ]  Provider Management System
        [ ]  List of Providers

[ ] Route(s)

    [ ]  GET - Provider table
        [ ]  SELECT all from user
        [ ]  JOIN all our other tables




-- PROVIDER MGMT INDIVIDUAL

[ ]Checklist
    [ ]  UseEffect to get provider info
    [ ]  Provider info (possible GET route to provider table)
        [ ]  Name
        [ ]  Email
        [ ]  Most recent mission
        [ ]  Credentials (possible separate GET route)
            [ ]  List all creds
        [ ]  Availability date range
    [ ]  Deactivate button
        [ ]  Deactivates provider in db
        [ ]  Put
    [ ]  Approve
        [ ]  Verifies provider in db
        [ ]  Put

[ ] Component(s)
    [ ]  Display all info for specific provider (using id sent from provider management page)
    [ ]  Deactivate Button
        [ ]  deactivate function lives inside
        [ ]  takes id of provider
        [ ]  sends put route to update their verified boolean (false) column in Provider table
    [ ]  Verify Button
        [ ]  handle verify function lives inside
        [ ]  takes id of provider
        [ ]  sends put route to update their verified boolean (true) column in Provider table

[ ] Route(s)
    [ ]  GET - specific provider (using id sent from provider management page)
        [ ]  SELECT all for specific user
    [ ]  PUT - Provider table
        [ ]  deactivate
    [ ]  PUT - Provider table
        [ ]  verify




-----------------PROVIDER REGISTRATION-----------------

-- EDUCATION

-- GENERAL INFO

[ ] Checklist
    [x]  Input fields
        [x]  Name
        [x]  DOB
        [x]  Provider role
        [x]  sole provider checkbox
        [x]  valid passport checkbox
        [x]  opt -in recruiters checkbox
        [x]  next button
        [ ]  steppers specific - separate component - url params
    [ ]  divs - structure
        [ ]  
        [ ]  
    [ ]  write post route

[ ] Components
    [ ]  bringing in stepper
    [ ]  header
    [ ]  form container - structure, div type stuff
        [ ]  inputs

[ ] Routes
    [ ]  post - provider table




-- GENERAL INFO (ADDRESS)

[x] Checklist
    [x]  Input fields
        [x]  street address
        [x]  city
        [x]  state
        [x]  zip
    [x]  next button → work history

[ ] Components
    [ ]  bringing in stepper
    [ ]  bringing in header
    [ ]  form container -

[ ] Routes
    [ ]  put route to provider table




-- INSURANCE

[ ] Checklist
    [ ]  inputs
        [ ]  insurance provider
        [ ]  policy number
        [ ]  state
        [ ]  date issued
        [ ]  date renewed
        [ ]  date expiring
        [ ]  button for adding a policy,
        [ ]  PDF upload for insurance
    [ ]  stepper
    [ ]  submit button !!

[ ] Components
    [ ]  insurance form component - this contains inputs for insurance, gets duplicated by + button
    [ ]  header, stepper
    [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

[ ] Routes
    [ ]  put route to provider table  ?
    [ ]  post route to insurance table
    [ ]  post to amazon s3 type: insurance




-- MED CRED

[ ] Checklist
    [ ]  Inputs
        [ ]  licensing board
        [ ]  date inital
        [ ]  date renewed
        [ ]  date expiring
        [ ]  cert name / taxonomy
        [ ]  license number
        [ ]  button to add new license
        [ ]  PDF upload
    [ ]  Stepper
    [ ]  Next button → insurance

[ ] Components
    [ ]  credential form component - this contains inputs for credentials, gets duplicated by + button
    [ ]  header, stepper
    [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

[ ] Routes
    [ ]  put route to provider table
    [ ]  post route to education history table
    [ ]  post to amazon s3 type: credential pdf




-- MISSION HISTORY

[ ] Checklist
    [ ]  inputs
        [ ]  last mission - dropdown
        [ ]  organization
        [ ]  location
        [ ]  reference
        [ ]  reference contact
        [ ]  start date
        [ ]  end date
        [ ]  button to add mission form
    [ ]  PDF upload
    [ ]  Next button → education

[ ] Components
    [ ]  mission history form component - this contains inputs for mission history, gets duplicated by + button
    [ ]  header, stepper
    [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

[ ] Routes
    [ ]  put route to provider table
    [ ]  post route to mission history table
    [ ]  post to amazon s3 type: missionHistory




-- STEPPER

-- WORK HISTORY

[ ] Checklist
    [ ]  Inputs
        [ ]  years of experience - divided into 1-2 2-5 5-10 +5 year chunks (range)
    [ ]  multi row work submit
        [ ]  workplace
        [ ]  job title
        [ ]  reference name
        [ ]  reference contact #
        [ ]  start date
        [ ]  end date
        [ ]  button to add another form for work
        [ ]  resume upload
    [ ]  next button → mission experience
    [ ]  stepper

[ ] Components
    [ ]  work history form component - this contains inputs for work history, gets duplicated by + button
    [ ]  header, stepper
    [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

[ ] Routes
    [ ]  put route to provider table
    [ ]  post route to work history table
    [ ]  post to amazon s3




------------------------PROVIDER-----------------------

-- PROVIDER LANDING PAGE

[ ]CHECKLIST

    [ ] UseEffect
        [ ] GET route for relevant info to provider 
            [ ] Route: /api/provider/:id (where id === req.user.id)
            [ ] ^^ This will set the provider profile info from DB to the Provider profile reducer state

    [ ] Page Navigation
        [ ] REGISTER button
            [ ] Navigates to Provider Registration form -- path: /providerregistration
        [ ] View Missions button (Conditionally rendered AFTER a provider has gone through registration)
            [ ] Navigates to the Provider Mission Table -- path: /mission
            
    [ ] Provider Profile info display
        [ ] Conditional rendering
            If a provider has finished the provider registration form:
                [ ] display provider info obtained from GET route in the UseEffect
            If a provider has not finished provider registration
                [ ] display a message to indicate registration must be completed by navigating to registration page via Register button
    
    [ ] EDIT button (Makes all fields on the profile editable)
        [ ] SAVE button (Rendered after EDIT is clicked)    
            [ ] Upon clicking save:
                [ ] dispatch updated info to Provider profile Saga
                [ ] PUT route will update entire Provider object




------------------------MISSION------------------------

-- MISSION TABLE

[ ] Checklist
    [ ]  Mission Table
        [ ]  Missions are organized by date with the most current mission at the top (use-effect that sorts by date GET route)
        [ ]  Sort-by feature to organize table data (stretch)
        [ ]  Table Columns
        [ ]  Date
        [ ]  Location
            [ ]  Location links to information on the location (travel info, possible wikipedia link? maybe something else that looks cleaner)
        [ ]  Organization
        [ ]  Pseudo column that will have the apply button

[ ]Component(s)
    [ ]  Missions Table
    [ ]  I'm Interested Button
        [ ]  Will link to [mmi.org/projects-usd](http://mmi.org/projects-usd) for the provider to be able to apply to selected mission

[ ] Route(s)
    [ ]  GET
        [ ]  Missions Table

----------------------IMAGE UPLOAD---------------------

-- IMAGE UPLOAD


--------------------Reg Flow---------------------

Generalinfo > 
generalinfoaddress >
workhistory > - image - resume [x]
missionhistory > - image per row - mssion completion PDF []
education > transcripts, required? []
medCred > image per row - cred PDF[]
insurance > image per row - insurance PDF


  "streetAddress",
	    "city",
	    "state",
	    "zipCode",
	    "soloProvider",
	    "verified",
	    "recruiterOpt",
	    "lastMission",
	    "yearsExperience",
	    "validPassport",
	    "availability",
	    "peerReviews",
	    "missionReviews",
	    "publications"