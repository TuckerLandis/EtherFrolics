const editMission = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_MISSION':
            return action.payload;
        default:
            return state;
    }
}

export default editMission;