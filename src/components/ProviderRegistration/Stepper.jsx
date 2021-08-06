import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = {
  root: {
    minWidth: 300,
    maxWidth: 400,
    flexGrow: 1,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
  },
};

class ProgressMobileStepper extends React.Component {
  state = {
    activeStep: this.props.activeStep,
  };

  handleNext = () => {
    // this.setState(state => ({
    //   activeStep: state.activeStep + 1,
    // }));

    if (this.props.submitFunction) {
        this.props.submitFunction(event)
        window.scrollTo(0, 0)
    }
   
  };

  handleBack = () => {
    // this.setState(state => ({
    //   activeStep: state.activeStep - 1,
    // }));
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <MobileStepper
      
        variant="progress"
        steps={9}
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" type="submit" onClick={this.handleNext} disabled={this.state.activeStep === 5}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    );
  }
}

ProgressMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProgressMobileStepper);