import React from 'react';
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import api from "../utils/api";
import '../blocks/profile/profile.css';
import {useDispatch, useSelector} from 'react-redux';

function Profile() {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);

    React.useEffect(() => {
        api
            .getUserInfo()
            .then((userData) => {
                setUserInfo(userData);
            })
            .catch((err) => console.log(err));
    }, []);

    function setUserInfo(userData) {
        dispatch({
            type: 'SET_USER_INFO',
            payload: userData
        });
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        dispatch({
            type: 'SET_SHOW_ADD_PLACE',
            payload: true
        });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setUserInfo(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setUserInfo(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }

    return (
        <div>
            <section className="profile page__section">
                <div className="profile__image" onClick={handleEditAvatarClick}
                     style={{backgroundImage: `url(${userInfo.avatar})`}}></div>
                <div className="profile__info">
                    <h1 className="profile__title">{userInfo.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                    <p className="profile__description">{userInfo.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
            </section>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
            />
        </div>
    );
}

export default Profile;