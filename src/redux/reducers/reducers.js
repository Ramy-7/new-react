import {
    combineReducers
} from 'redux';

function aaa(prevState = {}, action) {
    switch (action.type) {
        default:
            return prevState;
    }
}

export default combineReducers({
    aaa
})