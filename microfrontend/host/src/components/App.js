import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Auth from "auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import {useSelector} from "react-redux";

function App() {

    const history = useHistory();
    const currentUser = useSelector(state => state.currentUser);

    function routeSignIn() {
        routeHandler("/signin");
    }

    function routeHandler(path) {
        history.push(path);
    }

    return (
        <div className="page__content">
            <Header onSignIn={routeSignIn}/>
            <Switch>
                {["/signin", "/signup"].map((path, index) =>
                    <Route path={path} key={index}>
                        <Auth onRoute={routeHandler} path={path}/>
                    </Route>
                )}
                <ProtectedRoute
                    path="/"
                    exact
                    component={Main}
                    loggedIn={currentUser.isLoggedIn}
                />
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
