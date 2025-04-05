import React from 'react';
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import '../index.css';
import * as auth from "../utils/auth.js";
import {useDispatch} from 'react-redux';

function Auth({onRoute, path}) {
    const dispatch = useDispatch();

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            email: res.data.email,
                            isLoggedIn: true
                        }
                    });
                    onRoute("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, []);

    function closeAllPopups() {
        setIsInfoToolTipOpen(false);
    }

    function onRegister({email, password}) {
        auth
            .register(email, password)
            .then((res) => {
                setTooltipStatus("success");
                setIsInfoToolTipOpen(true);
                onRoute("/signin");
            })
            .catch((err) => {
                console.log(err);
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function onLogin({email, password}) {
        auth
            .login(email, password)
            .then((res) => {
                dispatch({
                    type: 'SET_USER',
                    payload: {
                        email: email,
                        isLoggedIn: true
                    }
                });
                onRoute("/");
            })
            .catch((err) => {
                console.log(err);
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function onAlreadyRegistered() {
        onRoute("/signin");
    }

    return (
        <div>
            {(() => {
                switch (path) {
                    case "/signup":
                        return <Register onRegister={onRegister} onAlreadyRegistered={onAlreadyRegistered}/>
                    case "/signin":
                        return <Login onLogin={onLogin}/>
                    default:
                }
            })()}
            <InfoTooltip
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                status={tooltipStatus}
            />
        </div>
    );
}

export default Auth;