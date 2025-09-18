    import React from 'react';
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import '../index.css';
import {useDispatch,useSelector} from "react-redux";

function Places() {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const showAddPlace = useSelector(state => state.showAddPlace);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function closeAllPopups() {
        dispatch({
            type: 'SET_SHOW_ADD_PLACE',
            payload: false
        });
        setSelectedCard(null);
    }

    React.useEffect(() => {
        api
            .getCardList()
            .then((cardData) => {
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === userInfo._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    return (
        <section className="places page__section">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                ))}
            </ul>
            <AddPlacePopup
                isOpen={showAddPlace}
                onAddPlace={handleAddPlaceSubmit}
                onClose={closeAllPopups}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </section>
    );
}

export default Places;