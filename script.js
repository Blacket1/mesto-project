const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseButtonCard = document.querySelector('.popup__close-button_card');
const popupName = document.querySelector('.popup__text_name');
const popupAbout = document.querySelector('.popup__text_about');
const popupNameCard = document.querySelector('.popup__text_namecard');
const popupAddresCard = document.querySelector('.popup__text_adress-card');
let popup = document.querySelector('.popup');
let popupCard = document.querySelector('.popup_add-card');
const cardsContainer = document.querySelector('.elements__cards');


function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

profileEditButton.addEventListener('click', function () {
  openPopup(popup);
});
profileAddButton.addEventListener('click', function () {
  openPopup(popupCard);
});


function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

popupCloseButton.addEventListener('click', function () {
  closePopup(popup);
});
popupCloseButtonCard.addEventListener('click', function () {
  closePopup(popupCard);
});


function addProfileText(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name-form').textContent = popupName.value;
  document.querySelector('.profile__about-form').textContent = popupAbout.value;
  closePopup(popup);
  popupName.value = '';
  popupAbout.value = '';
};

popup.addEventListener('submit', addProfileText);


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

function addCard(nameValue, linkValue) {
  const templateCard = document.querySelector('.template-card').content;
  const cardItem = templateCard.querySelector('.elements__item').cloneNode(true);
  cardItem.querySelector('.elements__image').src = linkValue;
  cardItem.querySelector('.elements__image').alt = nameValue;
  cardItem.querySelector('.elements__text').textContent = nameValue;
  cardsContainer.prepend(cardItem);
};

initialCards.forEach(function(item) {
  return addCard(item.name, item.link);
});

popupCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  popupNameCard.value = '';
  popupAddresCard.value = '';
  return addCard(popupNameCard.value, popupAddresCard.value);
});