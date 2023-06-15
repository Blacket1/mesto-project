import { form, popupProfile, popupCard, body, profileEditButton, profileAddButton, popupName, popupAbout, profileAbout, profileName, popupCloseButtons, popupNameCard, popupAddresCard } from './index.js';
import { disableButton, clearError } from './utils.js';


//функция закрытия попапа нажатием кнопки 'esc'
const keydownClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция закрытия попапа кликом мыши по оверлею
const mouseClickClosePopup = (evt) => {
  if (evt.target.classList.contains('popup')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция открытия попапов
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  body.addEventListener('keydown', keydownClosePopup);
  body.addEventListener('click', mouseClickClosePopup);
}

//слушатель события при нажатии по кнопке открытия
profileEditButton.addEventListener('click', function (evt) {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  disableButton(popupName, popupAbout, popupProfile);
});

profileAddButton.addEventListener('click', function () {
  openPopup(popupCard);
  disableButton(popupNameCard, popupAddresCard, popupCard);
});

//функция закрытия попапов
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  body.removeEventListener('keydown', keydownClosePopup);
  body.removeEventListener('click', mouseClickClosePopup);
  clearError(popupElement);
}

//обработчик кнопок закрытия попапов
popupCloseButtons.forEach(function (item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', function () {
    closePopup(popup);
  });
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
