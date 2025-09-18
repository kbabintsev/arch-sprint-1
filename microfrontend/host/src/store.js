import { createStore } from 'redux';

const initialState = {
    currentUser: {},
    userInfo: {},
    showAddPlace: false,
    routeHome: false
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, currentUser: action.payload };
        case 'SET_USER_INFO':
            return { ...state, userInfo: action.payload };
        case 'SET_SHOW_ADD_PLACE':
            return { ...state, showAddPlace: action.payload };
        case 'ROUTE_HOME':
            return { ...state, routeHome: action.payload };
        default:
            return state;
    }
}

const store = createStore(rootReducer);
export default store;