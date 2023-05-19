//необходимые переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseButtonCard = document.querySelector('.popup__close-button_card');
const popupName = document.querySelector('.popup__text_name');
const popupAbout = document.querySelector('.popup__text_about');
const popupNameCard = document.querySelector('.popup__text_namecard');
const popupAddresCard = document.querySelector('.popup__text_adress-card');
const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup_add-card');
const popupPicture = document.querySelector('.popup-picture');
const cardsContainer = document.querySelector('.elements__cards');
const popupPictureCloseButton = document.querySelector('.popup-picture__close-button');
//функция открытия попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};
//слушатель события при нажатии по кнопке открытия
profileEditButton.addEventListener('click', function () {
  openPopup(popup);
});
profileAddButton.addEventListener('click', function () {
  openPopup(popupCard);
});

//фунуция закрытия попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};
//слушатель события при нажатии по кнопке закрытия
popupCloseButton.addEventListener('click', function () {
  closePopup(popup);
});
popupCloseButtonCard.addEventListener('click', function () {
  closePopup(popupCard);
});

//функция добавления текста в профиль
function addProfileText(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name-form').textContent = popupName.value;
  document.querySelector('.profile__about-form').textContent = popupAbout.value;
  closePopup(popup);
  popupName.value = '';
  popupAbout.value = '';
};
//слушатель события вызвающий колбэк функцию добавления текста в профиль
popup.addEventListener('submit', addProfileText);

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

//функция добавления карточек с использованием template элементов 
function addCard(nameValue, linkValue) {
  const templateCard = document.querySelector('.template-card').content;
  const cardItem = templateCard.querySelector('.elements__item').cloneNode(true);
  
  cardItem.querySelector('.elements__image').src = linkValue;
  cardItem.querySelector('.elements__image').alt = nameValue;
  cardItem.querySelector('.elements__text').textContent = nameValue;
  cardsContainer.prepend(cardItem);
  //добавляем работу кнопки "лайков"
  cardItem.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
  //кнопка корзины 
  cardItem.querySelector('.elements__trash-button').addEventListener('click', function() {
    cardItem.remove();
  });
  //очищаем текстовые поля попапов при повторном открытии
  popupNameCard.value = '';
  popupAddresCard.value = '';
  //слушатель вызвающий открытие картинки при нажатиии картинку карточки
  cardItem.querySelector('.elements__image').addEventListener('click', function(){
    popupPicture.classList.add('popup-picture_opened');
    document.querySelector('.popup-picture__image').src = linkValue;
    document.querySelector('.popup-picture__image').alt = nameValue;
    document.querySelector('.popup-picture__text').textContent = nameValue;
  });
};
//обход массива для создания 6 стандартных карточек
initialCards.forEach(function(item) {
  return addCard(item.name, item.link);
});
//слушатель для добавления своих карточек с помощью попапа
popupCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  return addCard(popupNameCard.value, popupAddresCard.value);
});
//слушатель кнопки закрытия попапа с картинкой
popupPictureCloseButton.addEventListener('click', function(){
  popupPicture.classList.remove('popup-picture_opened');
});