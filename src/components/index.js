import '../pages/index.css';
import { enableValidation, disableButton } from "./validate.js";
import { initialCards, createCard } from './card.js';
import { openPopup,closePopup } from './modal';
import { clearError } from './utils.js';


//необходимые переменные
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name-form');
export const profileAbout = document.querySelector('.profile__about-form');
export const form = document.querySelector('.popup__input-container');
export const popupName = document.querySelector('.popup__text_name');
export const popupAbout = document.querySelector('.popup__text_about');
export const popupNameCard = document.querySelector('.popup__text_namecard');
export const popupAddresCard = document.querySelector('.popup__text_adress-card');
export const popupProfile = document.querySelector('.popup_profile');
export const popupCard = document.querySelector('.popup_add-card');
export const popupPicture = document.querySelector('.popup_picture');
export const cardsContainer = document.querySelector('.elements__cards');
export const popupImage = document.querySelector('.popup__image');
export const popupTextPicture = document.querySelector('.popup__text-picture');
export const popupCloseButtons = document.querySelectorAll('.popup__close-button');
export const body = document.querySelector('.body');


export const settingsOfValidation = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type-error',
  errorClass: 'popup__input-error_active'
};

enableValidation(settingsOfValidation);


//слушатель события при нажатии по кнопке открытия
profileEditButton.addEventListener('click', function (evt) {
  clearError(popupProfile);
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  disableButton(popupProfile);
});

profileAddButton.addEventListener('click', function () {
  clearError(popupCard);
  openPopup(popupCard);
  disableButton(popupCard);
});

//функция добавления текста в профиль
function addProfileText(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popupProfile);
}

//слушатель вызывающий функцию добавления текста в профиль
form.addEventListener('submit', addProfileText);

//обработчик кнопок закрытия попапов
popupCloseButtons.forEach(function (item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', function () {
    closePopup(popup);
  });
});

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
  addCard(popupNameCard.value, popupAddresCard.value);
  closePopup(popupCard);
  evt.target.reset();
});
