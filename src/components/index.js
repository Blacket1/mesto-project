import '../pages/index.css';
import { enableValidation, disableButton } from "./validate.js";
import { createCard } from './card.js';
import { openPopup,closePopup } from './modal';
import { clearError } from './utils.js';
import { getProfileInfo, getCardData, profileEditData, createCardData, profileEditAvatar } from './api';


//необходимые переменные
const profileAvatar = document.querySelector('.profile__avatar');
const submit = document.querySelector('.popup__submit');
const profileAvatarBtn = document.querySelector('.profile__avatar-container');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name-form');
const profileAbout = document.querySelector('.profile__about-form');
const formProfile = document.querySelector('.popup__input-container');
const formCard = document.querySelector('.popup__input-container_card');
const formAvatar = document.querySelector('.popup__input-container_avatar');
const popupName = document.querySelector('.popup__text_name');
const popupAbout = document.querySelector('.popup__text_about');
const popupNameCard = document.querySelector('.popup__text_namecard');
const popupAddresCard = document.querySelector('.popup__text_adress-card');
const popupAvatar = document.querySelector('.popup__text_avatar');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_add-card');
const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const cardsContainer = document.querySelector('.elements');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
export const popupImage = document.querySelector('.popup__image');
export const popupTextPicture = document.querySelector('.popup__text-picture');
export const popupPicture = document.querySelector('.popup_picture');
export const body = document.querySelector('.body');
export const profile = document.querySelector('.profile');

//обьект конфигурации валидации форм 
export const settingsOfValidation = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type-error',
  errorClass: 'popup__input-error_active'
};

enableValidation(settingsOfValidation);

//получаем данные профиля с сервера и отображаем на странице
const profileInfo = (userData) => {
  profileName.textContent = userData.name;
  profileAbout.textContent = userData.about;
  profileAvatar.src = userData.avatar;
}

//+устанавливаем id пользователя
getProfileInfo()
  .then((userData) => {
    profileInfo(userData);
    profile.dataset.id = userData._id;
  })
  .catch((err) => {
    console.error(err);
  })

//слушатель вешающий на кнопку открытие модального окна
profileEditButton.addEventListener('click', function () {
  clearError(popupProfile);
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  disableButton(popupProfile, settingsOfValidation);
});

profileAddButton.addEventListener('click', function () {
  clearError(popupCard);
  openPopup(popupCard);
  disableButton(popupCard, settingsOfValidation);
});

profileAvatarBtn.addEventListener('click', function () {
  clearError(popupEditAvatar);
  openPopup(popupEditAvatar);
  disableButton(popupEditAvatar, settingsOfValidation);
})

//обработчик кнопок закрытия попапов
popupCloseButtons.forEach(function (item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', function () {
    closePopup(popup);
  });
});

//функция добавления текста в профиль
const addProfileText = (evt) => {
  evt.preventDefault();
  submit.textContent = 'Сохранение...';
  profileEditData({name: popupName.value, about: popupAbout.value})
    .then((data) => {
      profileName.textContent = data.name;
      profileAbout.textContent = data.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submit.textContent = 'Сохранить';
    })
}

//функция редактирования аватара
const addProfileAvatar = (evt) => {
  evt.preventDefault();
  submit.textContent = 'Сохранение...';
  profileEditAvatar({ avatar: popupAvatar.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submit.textContent = 'Сохранить';
      evt.target.reset();
    })
}

//функция добавления карточки
function addCard(dataCard){
  const cardItem = createCard(dataCard);
  cardsContainer.prepend(cardItem);
}

getCardData()
  .then((data) => {
    const reverseData = data.reverse();
    reverseData.forEach((item) => {
      addCard(item);
    })
  })
  .catch((err) => {
    console.error(err);
  })


//функция сохранения моей карточки на сервере
const addMyCard = (evt) => {
  evt.preventDefault();
  submit.textContent = 'Сохранение...';
  createCardData({ name: popupNameCard.value, link: popupAddresCard.value })
    .then((data) => {
      addCard(data);
      closePopup(popupCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submit.textContent = 'Сохранить';
      evt.target.reset();
    })
}

//слушатель вызывающий функцию добавления текста в профиле
formProfile.addEventListener('submit', addProfileText);

//слушатель вызывающий функцию обновления аватара на сервере
formAvatar.addEventListener('submit', addProfileAvatar);

//слушатель вызывающий функцию добавления своих карточек
formCard.addEventListener('submit', addMyCard);

