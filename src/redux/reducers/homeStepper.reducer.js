const homeStepper = (state = { activeStep: 0, pageViewParams: '/home/0' }, action) => {
    switch (action.type) {
        case 'NEXT_STEP':
            return {...state, activeStep: state.activeStep + 1};

        case 'PREVIOUS_STEP':
            return {...state, activeStep: state.activeStep - 1};

        case 'SET_PARAMS':

            return {...state, pageViewParams: `/home/${state.activeStep}`}
    
        default:
            return state;
    };
};

export default homeStepper;