import { popupImage, popupTextPicture, cardsContainer, popupCard, popupNameCard, popupAddresCard, popupPicture } from './index.js'
import { openPopup, closePopup } from './modal.js';


//переменная содержащая массив для добавления карточек с помощью Js 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция создания карточки
function createCard(name, link) {
  const templateElement = document.querySelector('.template-card').content;
  const cardItem = templateElement.querySelector('.elements__item').cloneNode(true);
  const elementImage = cardItem.querySelector('.elements__image');
  const elementText = cardItem.querySelector('.elements__text');
  elementImage.src = link;
  elementImage.alt = name;
  elementText.textContent = name;  
 //добавляем работу кнопки "лайков"
  cardItem.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
//кнопка корзины 
  cardItem.querySelector('.elements__trash-button').addEventListener('click', function() {
    cardItem.remove();
  });
//слушатель вызвающий открытие картинки при нажатии на картинку карточки
  elementImage.addEventListener('click', function(){
    openPopup(popupPicture);
    popupImage.src = link;
    popupImage.alt = name;
    popupTextPicture.textContent = name;
  });
  
  return cardItem;
}

//функция добавления карточки
function addCard(nameValue, linkValue){
  const cardItem = createCard(nameValue, linkValue);
  cardsContainer.prepend(cardItem);
}

//обход массива для создания 6 стандартных карточек
initialCards.forEach(function(item) {
  return addCard(item.name, item.link);
});

//слушатель для добавления своих карточек с помощью попапа
popupCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addCard(popupNameCard.value, popupAddresCard.value);
  evt.target.reset();
});