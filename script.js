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
let popupPicture =document.querySelector('.popup-picture');
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

  cardItem.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
  
  cardItem.querySelector('.elements__trash-button').addEventListener('click', function() {
    cardItem.remove();
  });

  cardsContainer.prepend(cardItem);
  
  popupNameCard.value = '';
  popupAddresCard.value = '';
};


initialCards.forEach(function(item) {
  return addCard(item.name, item.link);
});

popupCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  return addCard(popupNameCard.value, popupAddresCard.value);
});


function closePopupPicture(popupElement) {
  popupElement.classList.remove('popup-picture_opened');
};

const popupPictureCloseButton = document.querySelector('.popup-picture__close-button');
const cardImages = document.querySelectorAll('.elements__image');
let popupImage = document.querySelector('.popup-picture__image');
let popupPictureText = document.querySelector('.popup-picture__text');

cardImages.forEach(function(item){
  item.addEventListener('click', function(){
    popupPicture.classList.add('popup-picture_opened');
    popupImage.src = item.src;
    popupPictureText.textContent = item.alt;
  });

  popupPictureCloseButton.addEventListener('click', function(){
    closePopupPicture(popupPicture);
  });
  
});

console.log(popupPictureText);