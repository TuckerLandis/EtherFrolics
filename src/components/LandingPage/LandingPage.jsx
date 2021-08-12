import React, { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './LandingPage.css';
import EFLOGOSvg from '../../images/ether-logo-off.svg';


import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

// CUSTOM COMPONENTS
import InfoCard from './InfoCard/InfoCard';


function LandingPage() {

  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  const activeStep = useSelector(store => store.homeStepper.activeStep);

  const params = useSelector(store => store.homeStepper.pageViewParams);


  useEffect(() => {
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

  return (
    <div className="grid">

      <div className="titleViewHeading" >

        <div className="subhead">
          <Typography align="center" variant="h6" color="textPrimary" ><strong>Spreading euphoria and relieving pain across the globe</strong></Typography>
        </div>

        <div className="welcome">
          <img src={EFLOGOSvg} alt="Global Medicine Vector Image" height="40" width="65" />
          <Typography variant="h3" >EtherFrolics</Typography> <br />
        </div>

      </div>

      <div className="organizationPillars">

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

        <div className="userLink">
          <Typography variant="body1">New User?</Typography>
          <Button 
          size="small"
          color="primary" 
          variant="contained" 
          onClick={onRegister}
          >
            Register
          </Button>
        </div>

        <div className="userLink login">
          <Typography variant="body1" style={{color: '#fff'}}>Already a Member?</Typography>
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
