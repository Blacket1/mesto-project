import { popupProfile, popupName, popupAbout, profileAbout, profileName } from './index.js';
import { closePopup } from './utils.js';

//функция закрытия попапа нажатием кнопки 'esc'
export const keydownClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция закрытия попапа кликом мыши по оверлею
export const mouseClickClosePopup = (evt) => {
  if (evt.target.classList.contains('popup')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция добавления текста в профиль
export function addProfileText(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popupProfile);
}





