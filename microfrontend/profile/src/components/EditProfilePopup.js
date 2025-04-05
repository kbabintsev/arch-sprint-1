import React from 'react';
import PopupWithForm from "components/PopupWithForm";
import {useSelector} from "react-redux";

function EditProfilePopup({isOpen, onUpdateUser, onClose}) {

    const userInfo = useSelector(state => state.userInfo);
    const [name, setName] = React.useState(userInfo.name);
    const [description, setDescription] = React.useState(userInfo.about);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Редактировать профиль" name="edit"
        >
            <label className="popup__label">
                <input type="text" name="userName" id="owner-name"
                       className="popup__input popup__input_type_name" placeholder="Имя"
                       required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
                       value={name || userInfo.name || ''} onChange={handleNameChange}/>
                <span className="popup__error" id="owner-name-error"></span>
            </label>
            <label className="popup__label">
                <input type="text" name="userDescription" id="owner-description"
                       className="popup__input popup__input_type_description" placeholder="Занятие"
                       required minLength="2" maxLength="200"
                       value={description || userInfo.about || ''} onChange={handleDescriptionChange}/>
                <span className="popup__error" id="owner-description-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
