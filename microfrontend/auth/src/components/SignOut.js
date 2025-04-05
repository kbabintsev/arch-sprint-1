import React from 'react';
import {useDispatch} from "react-redux";

function SignOut({className, onSignIn}) {

    const dispatch = useDispatch();

    function handleSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        dispatch({
            type: 'SET_USER',
            payload: {isLoggedIn: false}
        });
        onSignIn();
    }

    return (
        <button className={className} onClick={handleSignOut}>Выйти</button>
    );
}

export default SignOut;