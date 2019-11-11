const tempUnit = (state = false, action) => {
    switch (action.type) {
        case 'CHANGE_UNIT':
            return !state
        default:
            return state
    }
}

export default tempUnit;
