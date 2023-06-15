import { body } from './index.js';

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

//функция открытия попапов
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  body.addEventListener('keydown', keydownClosePopup);
  body.addEventListener('click', mouseClickClosePopup);
}

//функция закрытия попапов
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  body.removeEventListener('keydown', keydownClosePopup);
  body.removeEventListener('click', mouseClickClosePopup);
}





