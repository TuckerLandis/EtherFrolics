import React, { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './LandingPage.css';
import GlobalSvg from '../../images/etherfrolics.svg';


import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

// CUSTOM COMPONENTS
import InfoCard from './InfoCard/InfoCard';


function LandingPage({ theme }) {

  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  const activeStep = useSelector(store => store.homeStepper.activeStep);

  const params = useSelector(store => store.homeStepper.pageViewParams);


  useEffect(() => {
    console.log('in useEffect');
    handleNav(params, location.pathname);
  }, [])

  const nextCard = e => {

    e.preventDefault();

    dispatch({
      type: 'NEXT_STEP'
    });

    dispatch({
      type: 'SET_PARAMS',
      payload: `/home/${activeStep}`
    });

    history.push(`/home/${params}`);

  };

  const previousCard = e => {

    e.preventDefault();

    dispatch({
      type: 'PREVIOUS_STEP'
    });

    dispatch({
      type: 'SET_PARAMS'
    });

    history.push(`/home/${params}`);
 
  };

  const handleNav = (page, path) => {

    if (page === path) {
      return;
    } else {
      history.push(page)
    }
  }

  const onLogin = () => {
    history.push('/login');
  };

  const onRegister = () => {
    history.push('/registration');
  };

  console.log(theme);

  return (
    <div className="grid">

      <div className="titleViewHeading" style={{backgroundColor: theme.palette.primary.light}} >
        
        <img src={GlobalSvg} alt="Global Medicine Vector Image" height="300" width="300" />

        <div className="welcome">
          <Typography variant="h3" >EtherFrolics</Typography>
        </div>
        <Typography align="left" variant="h6" color="textSecondary">Spreading euphoria and relieving pain across the globe</Typography>
      </div>

      <div className="organizationPillars" style={{backgroundColor: theme.palette.secondary.dark}}>

        <div className="infoCarousel">

          <Route path="/home/:card">
            <InfoCard activeStep/>
          </Route>

          <div className="infoCardStepper" >

            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={e => nextCard(e)} disabled={activeStep === 2} color="primary">
                  Next
                </Button>
              }
              backButton={
                <Button size="small" onClick={e => previousCard(e)} disabled={activeStep === 0} color="secondary">
                  Back
                </Button>
              }
            />

          </div>
        </div>  
      </div>
      <center className="userNav">

        <div className="userLink" style={{backgroundColor: theme.palette.secondary.light}}>
          <h4>New User?</h4>
          <Button 
          size="small"
          color="primary" 
          variant="contained" 
          onClick={onRegister}
          >
            Register
          </Button>
        </div>

        <div className="userLink" style={{backgroundColor: theme.palette.primary.dark}}>
          <h4 style={{color: '#fff'}}>Already a Member?</h4>
          <Button 
          size="small"
          color="secondary" 
          variant="contained" 
          onClick={onLogin}
          >
            Login
          </Button>
        </div>
      </center>
    </div>
  );
}

export default LandingPage;
