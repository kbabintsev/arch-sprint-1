import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import logoPath from '../images/logo.svg';
import '../blocks/header/header.css';
import SignOut from "auth/SignOut";
import {useSelector} from 'react-redux';

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header({onSignIn}) {

    const currentUser = useSelector(state => state.currentUser);

    return (
        <header className="header page__section">
            <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo"/>
            <Switch>
                <Route exact path="/">
                    <div className="header__wrapper">
                        <p className="header__user">{currentUser.email}</p>
                        <SignOut className="header__logout" onSignIn={onSignIn}/>
                    </div>
                </Route>
                <Route path="/signup">
                    <Link className="header__auth-link" to="signin">Войти</Link>
                </Route>
                <Route path="/signin">
                    <Link className="header__auth-link" to="signup">Регистрация</Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;
