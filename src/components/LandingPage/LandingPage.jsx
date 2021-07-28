import React, { useState, useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import './LandingPage.css';


import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import InfoCard from './InfoCard/InfoCard';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

function LandingPage() {

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

  console.log(activeStep);

  return (
    <div className="container">
      <div className="welcome">
        <Typography variant="h3" >Welcome to EtherFrolics</Typography>
      </div>

      <div className="grid">

        <div className="infoCarousel">
          <div className="missionStatement">

          <Route path="/home/:card">
            <InfoCard activeStep/>
          </Route>

          </div>

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
        <h4>New User?</h4>
        <Button 
        size="small"
        color="primary" 
        variant="contained" 
        onClick={onRegister}
        >
          Register
        </Button>

        <h4>Already a Member?</h4>
        <Button 
        size="small"
        color="secondary" 
        variant="contained" 
        onClick={onLogin}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default LandingPage;
